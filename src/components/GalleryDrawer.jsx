import React, { useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { isMediaVideo } from '../utils/media';

const GalleryDrawer = ({ projectId, images = [], onInsertAsset }) => {
  const { uploadImage, deleteImage, updateCoverPhoto, updateImageCaption, projectsData } = useAdmin();
  const [isOpen, setIsOpen] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [editingCaptionIdx, setEditingCaptionIdx] = useState(null);
  const fileInputRef = useRef(null);

  const currentHero = projectsData?.projectsDetail?.[projectId]?.hero;

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    setUploadError('');
    try {
      for (const file of files) {
        const isImg = file.type.startsWith('image/');
        const isVid = file.type.startsWith('video/') || /\.(mp4|mov|webm|m4v|ogv)$/i.test(file.name);
        if (isImg || isVid) {
          await uploadImage(projectId, file);
        }
      }
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)',
        maxWidth: '1100px',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        zIndex: 9998,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Header / Collapse Bar */}
      <div
        style={{
          padding: '12px 20px',
          background: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.1rem' }}>🖼️ 🎬</span>
          <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>
            Media Drawer: Photos &amp; Videos ({images.length} assets)
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#c4b5fd',
              background: 'rgba(139, 92, 246, 0.25)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              padding: '2px 8px',
              borderRadius: '12px'
            }}
          >
            Drag to page or click "+ Add"
          </span>
        </div>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            fontSize: '1rem',
            padding: '4px'
          }}
        >
          {isOpen ? '▼ Hide' : '▲ Open'}
        </button>
      </div>

      {/* Drawer Content */}
      {isOpen && (
        <div style={{ padding: '16px 20px', maxHeight: '250px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', overflowX: 'auto', paddingBottom: '8px' }}>
            {/* Direct Upload Dropzone for Photos & Videos */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              style={{
                flexShrink: 0,
                width: '160px',
                height: '115px',
                border: '2px dashed #8B5CF6',
                borderRadius: '10px',
                background: '#faf5ff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                textAlign: 'center',
                padding: '10px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f3e8ff')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#faf5ff')}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*,.mp4,.mov,.webm,.m4v"
                style={{ display: 'none' }}
                onChange={(e) => handleFiles(e.target.files)}
              />
              <span style={{ fontSize: '1.4rem', marginBottom: '4px' }}>
                {isUploading ? '⏳' : '📁 🎥'}
              </span>
              <span style={{ fontSize: '0.78rem', fontWeight: '600', color: '#7c3aed' }}>
                {isUploading ? 'Uploading Media...' : 'Upload Photo / Video'}
              </span>
              <span style={{ fontSize: '0.68rem', color: '#6b7280', marginTop: '2px' }}>
                MP4, MOV, PNG, JPG...
              </span>
            </div>

            {/* Gallery Media List (Photos & Videos) */}
            {images.map((img, idx) => {
              const src = typeof img === 'string' ? img : (img?.src || '');
              const caption = typeof img === 'string' ? '' : (img?.caption || '');
              const isVid = isMediaVideo(src);
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={idx}
                  draggable
                  onDragStart={(e) => {
                    const payload = {
                      type: 'new-image',
                      src: src,
                      caption: caption,
                      isVideo: isVid
                    };
                    window.__portfolioActiveDrag = payload;
                    try {
                      e.dataTransfer.setData('application/json', JSON.stringify(payload));
                      e.dataTransfer.setData('text/plain', JSON.stringify(payload));
                      e.dataTransfer.setData('text', JSON.stringify(payload));
                    } catch (err) {}
                    e.dataTransfer.effectAllowed = 'copy';
                  }}
                  onDragEnd={() => {
                    setTimeout(() => {
                      window.__portfolioActiveDrag = null;
                    }, 2000);
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    flexShrink: 0,
                    width: '145px',
                    height: '118px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'grab',
                    background: '#f8fafc',
                    boxShadow: isHovered
                      ? '0 6px 16px rgba(139, 92, 246, 0.25)'
                      : '0 2px 4px rgba(0,0,0,0.05)',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  {/* Media Preview (Video or Image) */}
                  <div style={{ width: '100%', height: '78px', position: 'relative', background: '#0a0a0a' }}>
                    {isVid ? (
                      <>
                        <video
                          ref={(el) => {
                            if (el) {
                              el.defaultMuted = true;
                              el.muted = true;
                            }
                          }}
                          src={src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            pointerEvents: 'none'
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '4px',
                            left: '4px',
                            background: 'rgba(15, 23, 42, 0.85)',
                            color: '#38bdf8',
                            fontSize: '0.62rem',
                            fontWeight: 'bold',
                            padding: '1px 5px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            pointerEvents: 'none'
                          }}
                        >
                          ▶ VIDEO
                        </div>
                      </>
                    ) : (
                      <img
                        src={src}
                        alt={caption || `Asset ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                      />
                    )}

                    {/* Delete / Remove from Media Drawer */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Delete "${caption || (isVid ? 'this video' : 'this photo')}" from media drawer?`)) {
                          deleteImage(projectId, src);
                        }
                      }}
                      title="Remove from media drawer"
                      style={{
                        position: 'absolute',
                        top: '4px',
                        left: '4px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(239, 68, 68, 0.9)',
                        color: '#ffffff',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        zIndex: 10
                      }}
                    >
                      &times;
                    </button>

                    {/* Cover Photo Badge or Set Cover Button */}
                    {!isVid && (
                      currentHero === src ? (
                        <div
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                            color: '#ffffff',
                            fontSize: '0.58rem',
                            fontWeight: '700',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            zIndex: 10,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px'
                          }}
                          title="Current project cover photo"
                        >
                          ★ Cover
                        </div>
                      ) : isHovered ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateCoverPhoto(projectId, src);
                          }}
                          title="Set as project cover photo"
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            background: 'rgba(15, 23, 42, 0.85)',
                            color: '#f8fafc',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '4px',
                            padding: '2px 5px',
                            fontSize: '0.58rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            zIndex: 10
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = '#8B5CF6')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(15, 23, 42, 0.85)')}
                        >
                          ★ Set Cover
                        </button>
                      ) : null
                    )}
                  </div>

                  {/* Caption & Always-Visible "+ Add" Action */}
                  <div
                    style={{
                      padding: '4px 6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '4px',
                      background: '#ffffff',
                      borderTop: '1px solid #f1f5f9',
                      minHeight: '26px'
                    }}
                  >
                    {editingCaptionIdx === idx ? (
                      <input
                        type="text"
                        autoFocus
                        defaultValue={caption}
                        onClick={(e) => e.stopPropagation()}
                        onBlur={(e) => {
                          const val = e.target.value.trim();
                          if (val !== caption) {
                            updateImageCaption(projectId, idx, val);
                          }
                          setEditingCaptionIdx(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.currentTarget.blur();
                          } else if (e.key === 'Escape') {
                            setEditingCaptionIdx(null);
                          }
                        }}
                        style={{
                          fontSize: '0.68rem',
                          color: '#1e293b',
                          border: '1px solid #8B5CF6',
                          borderRadius: '3px',
                          padding: '2px 4px',
                          width: '100%',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    ) : (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCaptionIdx(idx);
                        }}
                        title="Click to edit caption"
                        style={{
                          fontSize: '0.68rem',
                          color: '#475569',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          flex: 1,
                          cursor: 'text',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {caption || (isVid ? `Video ${idx + 1}` : `Photo ${idx + 1}`)}
                        </span>
                        <span style={{ fontSize: '0.62rem', opacity: 0.45, flexShrink: 0 }}>✏️</span>
                      </div>
                    )}

                    {onInsertAsset && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInsertAsset({ src, caption, isVideo: isVid });
                        }}
                        title="Add to narrative canvas"
                        style={{
                          background: '#8B5CF6',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '2px 7px',
                          fontSize: '0.65rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          flexShrink: 0,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                        }}
                      >
                        + Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {uploadError && (
            <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '8px' }}>
              ⚠️ Upload failed: {uploadError}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryDrawer;
