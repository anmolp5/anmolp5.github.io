import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APPS } from '../data/apps';

export default function Hub() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="hub-page">
      {/* Background ambient lighting */}
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />
      <div className="ambient-grid-overlay" />

      {/* Top Header Bar */}
      <header className="hub-topbar">
        <Link to="/" className="topbar-brand">
          <span className="brand-dot" />
          <span className="brand-text">ANMOL PRABHAKAR</span>
          <span className="brand-separator">/</span>
          <span className="brand-label">LAUNCHPAD</span>
        </Link>
        <div className="topbar-actions">
          <Link to="/" className="portfolio-link-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Portfolio
          </Link>
          <a
            href="https://github.com/anmolp5"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link-btn"
            aria-label="GitHub Profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="hub-container">
        {/* Hero Section */}
        <section className="hub-hero">
          <div className="hero-pill">
            <span className="hero-pill-indicator" />
            <span>PORTAL & ECOSYSTEM</span>
          </div>
          <h1 className="hero-title">Web Applications & Tools</h1>
          <p className="hero-description">
            A unified launchpad for all live applications, IoT interfaces, and productivity tools built by Anmol Prabhakar.
          </p>
        </section>

        {/* Apps Grid */}
        <section className="apps-grid" aria-label="Web Applications">
          {APPS.map((app) => {
            const isHovered = hoveredCard === app.id;
            const linkProps = app.external
              ? { href: app.url, target: '_blank', rel: 'noopener noreferrer' }
              : { href: app.url };

            return (
              <a
                key={app.id}
                {...linkProps}
                className="app-card"
                onMouseEnter={() => setHoveredCard(app.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  '--accent': app.accent || '#8b5cf6',
                  borderColor: isHovered ? app.accent : 'rgba(255, 255, 255, 0.08)',
                  boxShadow: isHovered
                    ? `0 14px 40px -8px ${app.accent}33, 0 0 0 1px ${app.accent}55`
                    : '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Ambient glow inside card on hover */}
                <div
                  className="card-glow"
                  style={{
                    opacity: isHovered ? 0.16 : 0,
                    background: `radial-gradient(circle at 50% 0%, ${app.accent}, transparent 70%)`
                  }}
                />

                {/* Card Header (Logo & Badge) */}
                <div className="card-header">
                  <div
                    className="card-logo-box"
                    style={{
                      boxShadow: isHovered ? `0 6px 20px -2px ${app.accent}40` : '0 2px 10px rgba(0,0,0,0.3)'
                    }}
                  >
                    <img
                      src={app.logo}
                      alt={`${app.title} logo`}
                      className="card-logo-img"
                      loading="lazy"
                    />
                  </div>
                  {app.badge && (
                    <span
                      className="card-badge"
                      style={{
                        background: `${app.accent}14`,
                        color: app.accent,
                        borderColor: `${app.accent}33`
                      }}
                    >
                      <span
                        className="badge-dot"
                        style={{ background: app.accent }}
                      />
                      {app.badge}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="card-body">
                  <h2 className="card-title">{app.title}</h2>
                  {app.subtitle && <p className="card-subtitle" style={{ color: app.accent }}>{app.subtitle}</p>}
                  <p className="card-description">{app.description}</p>
                </div>

                {/* Card Footer / Action */}
                <div className="card-action">
                  <span className="action-text">Launch App</span>
                  <svg
                    className="action-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: isHovered ? 'translate(2px, -2px)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </a>
            );
          })}

          {/* New Project / Building Placeholder Card */}
          <div className="app-card placeholder-card">
            <div className="card-header">
              <div className="card-logo-box placeholder-logo-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <span className="card-badge placeholder-badge">
                Next Up
              </span>
            </div>
            <div className="card-body">
              <h2 className="card-title placeholder-title">More in Development</h2>
              <p className="card-subtitle" style={{ color: '#71717a' }}>Hardware & Web Tools</p>
              <p className="card-description">
                Currently building new robotic interfaces, embedded controllers, and generative tools. Check back for new deployments!
              </p>
            </div>
            <div className="card-action placeholder-action">
              <span className="action-text">Stay Tuned</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="hub-footer">
        <p>Designed & Developed by <strong>Anmol Prabhakar</strong></p>
        <p className="footer-subtext">Hosted on <code>anmolprabhakar.com</code></p>
      </footer>

      {/* Modern Scoped Styles */}
      <style>{`
        .hub-page {
          min-height: 100vh;
          background: #090a0f;
          color: #f4f4f5;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          position: relative;
          overflow-x: hidden;
          padding-bottom: 60px;
        }

        /* Ambient Glow Effects */
        .ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }

        .glow-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%);
          top: -100px;
          left: 10%;
        }

        .glow-2 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.12), transparent 70%);
          top: 300px;
          right: 5%;
        }

        .ambient-grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        /* Topbar */
        .hub-topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 40px;
          background: rgba(9, 10, 15, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .topbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #f4f4f5;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.8px;
        }

        .brand-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #8b5cf6;
          box-shadow: 0 0 10px #8b5cf6;
        }

        .brand-text {
          font-weight: 700;
        }

        .brand-separator {
          color: #52525b;
        }

        .brand-label {
          color: #a1a1aa;
          font-weight: 500;
        }

        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .portfolio-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e4e4e7;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .portfolio-link-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.2);
        }

        .github-link-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #a1a1aa;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .github-link-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Container */
        .hub-container {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 32px 40px;
        }

        /* Hero */
        .hub-hero {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 56px;
        }

        .hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.25);
          color: #c4b5fd;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .hero-pill-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .hero-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1.15;
          margin: 0 0 16px;
          background: linear-gradient(180deg, #ffffff 30%, #a1a1aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 16px;
          line-height: 1.6;
          color: #a1a1aa;
          margin: 0;
        }

        /* Apps Grid */
        .apps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        /* App Card */
        .app-card {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.025);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 28px;
          text-decoration: none;
          color: inherit;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease;
          overflow: hidden;
        }

        .app-card:hover {
          transform: translateY(-5px);
        }

        .card-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
        }

        /* Logo Box */
        .card-logo-box {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          flex-shrink: 0;
        }

        .app-card:hover .card-logo-box {
          transform: scale(1.06);
        }

        .card-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .card-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          border: 1px solid;
          text-transform: uppercase;
        }

        .badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }

        .card-body {
          flex: 1;
          margin-bottom: 24px;
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.3px;
          color: #ffffff;
          margin: 0 0 4px;
        }

        .card-subtitle {
          font-size: 13px;
          font-weight: 600;
          margin: 0 0 12px;
          letter-spacing: 0.2px;
        }

        .card-description {
          font-size: 14px;
          line-height: 1.55;
          color: #a1a1aa;
          margin: 0;
        }

        /* Action */
        .card-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          color: #e4e4e7;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        .app-card:hover .card-action {
          color: #ffffff;
        }

        /* Placeholder Card */
        .placeholder-card {
          border-style: dashed;
          background: rgba(255, 255, 255, 0.015);
          cursor: default;
        }

        .placeholder-card:hover {
          transform: none;
          box-shadow: none;
          border-color: rgba(255, 255, 255, 0.12);
        }

        .placeholder-logo-box {
          border: 1px dashed rgba(255, 255, 255, 0.12);
        }

        .placeholder-badge {
          background: rgba(255, 255, 255, 0.03);
          color: #71717a;
          border-color: rgba(255, 255, 255, 0.08);
        }

        .placeholder-title {
          color: #d4d4d8;
        }

        .placeholder-action {
          color: #71717a;
        }

        /* Footer */
        .hub-footer {
          text-align: center;
          margin-top: 60px;
          padding: 24px 20px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: #71717a;
          font-size: 13px;
        }

        .hub-footer p {
          margin: 4px 0;
        }

        .hub-footer strong {
          color: #d4d4d8;
        }

        .hub-footer code {
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
          color: #a1a1aa;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hub-topbar {
            padding: 14px 20px;
          }

          .brand-text, .brand-separator {
            display: none;
          }

          .hub-container {
            padding: 36px 18px 24px;
          }

          .hero-title {
            font-size: 30px;
          }

          .apps-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .app-card {
            padding: 22px;
          }

          .card-logo-box {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </div>
  );
}
