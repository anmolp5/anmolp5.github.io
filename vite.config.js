import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function portfolioAdminPlugin() {
  return {
    name: 'portfolio-admin-plugin',
    configureServer(server) {
      let isSavingFromApi = false;

      // Watch src/data for external disk changes (e.g. from editor/scripts) and broadcast to client
      const dataDir = path.resolve(__dirname, 'src/data');
      if (fs.existsSync(dataDir)) {
        try {
          fs.watch(dataDir, (eventType, filename) => {
            if (isSavingFromApi || !filename) return;
            if (filename === 'projects.json' || filename === 'home.json') {
              const type = filename === 'projects.json' ? 'projects' : 'home';
              const filePath = path.join(dataDir, filename);
              try {
                const content = fs.readFileSync(filePath, 'utf-8');
                const parsed = JSON.parse(content);
                server.ws.send({
                  type: 'custom',
                  event: 'portfolio-data-updated',
                  data: { type, data: parsed }
                });
              } catch (e) {
                // Incomplete write or invalid JSON, ignore
              }
            }
          });
        } catch (e) {
          console.warn('Could not watch src/data:', e);
        }
      }

      server.middlewares.use((req, res, next) => {
        // Read fresh JSON directly from disk (bypasses any module cache)
        if (req.url && req.url.startsWith('/api/get-data') && req.method === 'GET') {
          try {
            const url = new URL(req.url, 'http://localhost');
            const type = url.searchParams.get('type') || 'projects';
            const filename = type === 'home' ? 'home.json' : 'projects.json';
            const filePath = path.resolve(__dirname, 'src/data', filename);
            if (fs.existsSync(filePath)) {
              const content = fs.readFileSync(filePath, 'utf-8');
              res.writeHead(200, {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate'
              });
              res.end(content);
              return;
            }
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'File not found' }));
            return;
          } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
        }

        // Save JSON data to src/data/*.json
        if (req.url === '/api/save-data' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { type, data } = JSON.parse(body);
              isSavingFromApi = true;
              if (type === 'projects') {
                const filePath = path.resolve(__dirname, 'src/data/projects.json');
                // Safeguard: Ensure newly added paragraphs on disk are not accidentally wiped by stale browser payloads
                if (fs.existsSync(filePath)) {
                  try {
                    const diskData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                    const diskLighting = diskData?.projectsDetail?.['smart-lighting'];
                    const incomingLighting = data?.projectsDetail?.['smart-lighting'];
                    if (diskLighting && incomingLighting) {
                      const hasEnclosureOnDisk = diskLighting.story?.paragraphs?.some(p => p.includes('Custom Enclosure'));
                      const hasEnclosureIncoming = incomingLighting.story?.paragraphs?.some(p => p.includes('Custom Enclosure'));
                      if (hasEnclosureOnDisk && !hasEnclosureIncoming) {
                        const encHeading = diskLighting.story.paragraphs.find(p => p.includes('Custom Enclosure'));
                        const encIdx = diskLighting.story.paragraphs.indexOf(encHeading);
                        const encBody = diskLighting.story.paragraphs[encIdx + 1];
                        if (encHeading && encBody) {
                          incomingLighting.story.paragraphs.push(encHeading, encBody);
                        }
                        const diskBlock = (diskLighting.contentBlocks || []).find(b => b.content?.includes('Custom Enclosure'));
                        if (diskBlock && !incomingLighting.contentBlocks?.some(b => b.content?.includes('Custom Enclosure'))) {
                          incomingLighting.contentBlocks.push(diskBlock);
                        }
                      }
                    }
                  } catch (e) {
                    console.warn('Safeguard merge notice:', e);
                  }
                }
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
                setTimeout(() => { isSavingFromApi = false; }, 600);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Projects saved successfully' }));
                return;
              } else if (type === 'home') {
                const filePath = path.resolve(__dirname, 'src/data/home.json');
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
                setTimeout(() => { isSavingFromApi = false; }, 600);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Home data saved successfully' }));
                return;
              }
              isSavingFromApi = false;
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Unknown data type' }));
            } catch (err) {
              isSavingFromApi = false;
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // Upload image directly to public/images/projects/<projectId>/<filename>
        if (req.url === '/api/upload-image' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { projectId, filename, base64Data } = JSON.parse(body);
              if (!projectId || !filename || !base64Data) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Missing required parameters' }));
                return;
              }

              let cleanFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
              const targetDir = path.resolve(__dirname, 'public/images/projects', projectId);
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }

              let targetPath = path.join(targetDir, cleanFilename);
              const buffer = Buffer.from(base64Data.replace(/^data:[^;]+;base64,/, ''), 'base64');
              fs.writeFileSync(targetPath, buffer);

              // If video is .mov / QuickTime, convert to universal web-standard .mp4 using avconvert
              if (/\.(mov|quicktime)$/i.test(cleanFilename)) {
                const mp4Filename = cleanFilename.replace(/\.(mov|quicktime)$/i, '.mp4');
                const mp4Path = path.join(targetDir, mp4Filename);
                try {
                  execSync(`/usr/bin/avconvert -s "${targetPath}" -p Preset1280x720 -o "${mp4Path}" --replace`);
                  if (fs.existsSync(mp4Path) && fs.statSync(mp4Path).size > 0) {
                    cleanFilename = mp4Filename;
                    try { fs.unlinkSync(targetPath); } catch (e) {}
                  }
                } catch (convErr) {
                  console.warn('avconvert auto-conversion warning:', convErr.message);
                }
              }

              const publicUrl = `/images/projects/${projectId}/${cleanFilename}`;
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, url: publicUrl }));
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // Toggle lock switch in src/adminConfig.js
        if (req.url === '/api/toggle-lock' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { locked } = JSON.parse(body);
              const configPath = path.resolve(__dirname, 'src/adminConfig.js');
              const configContent = `// Master configuration for Portfolio Admin & Visual Layout Editor\nexport const ADMIN_CONFIG = {\n  // Set to true to completely lock down and disable all editing tools and admin UI\n  locked: ${Boolean(locked)},\n  // Only allow admin mode when running on localhost\n  localOnly: true,\n};\n`;
              fs.writeFileSync(configPath, configContent, 'utf-8');
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, locked: Boolean(locked) }));
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // Delete media directly from public/images/projects/<projectId>/<filename>
        if (req.url === '/api/delete-image' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { url } = JSON.parse(body);
              if (url && url.startsWith('/images/projects/')) {
                const filePath = path.resolve(__dirname, 'public', url.replace(/^\//, ''));
                if (fs.existsSync(filePath)) {
                  fs.unlinkSync(filePath);
                }
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // Direct static media streamer with HTTP 206 Partial Content (Range) support for videos & images
        if (req.url && req.url.startsWith('/images/') && req.method === 'GET') {
          const cleanUrl = req.url.split('?')[0];
          const filePath = path.resolve(__dirname, 'public', cleanUrl.replace(/^\//, ''));
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const stat = fs.statSync(filePath);
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
              '.mp4': 'video/mp4',
              '.webm': 'video/webm',
              '.mov': 'video/quicktime',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.svg': 'image/svg+xml',
              '.gif': 'image/gif',
              '.webp': 'image/webp'
            };
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            const range = req.headers.range;

            if (range) {
              const parts = range.replace(/bytes=/, '').split('-');
              const start = parseInt(parts[0], 10);
              const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
              const chunksize = end - start + 1;
              const fileStream = fs.createReadStream(filePath, { start, end });
              res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${stat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': contentType
              });
              fileStream.pipe(res);
              return;
            } else {
              res.writeHead(200, {
                'Content-Length': stat.size,
                'Content-Type': contentType,
                'Accept-Ranges': 'bytes'
              });
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          }
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), portfolioAdminPlugin()],
  base: '/', // This is the correct base for username.github.io repos
  server: {
    host: '0.0.0.0', // Allow access from network
    port: 5173,
    watch: {
      ignored: ['**/src/data/**', '**/src/adminConfig.js', '**/public/images/**']
    }
  }
});