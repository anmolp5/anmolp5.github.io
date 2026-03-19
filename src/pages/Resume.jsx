import React, { useState, useEffect, useCallback } from 'react';

const images = [
  { src: '/images/resume/1.jpg', caption: 'Me at a robot showcase for FLL in 2016' },
  { src: '/images/resume/2.jpg', caption: 'My FLL Team and I after we won prizes at our qualifier in 2018' },
  { src: '/images/resume/3.jpg', caption: 'Me holding our FTC robot at a competition in 2021' },
  { src: '/images/resume/4.jpg', caption: 'Me acting as a driver coach at the FTC regional championship in 2024' },
  { src: '/images/resume/5.jpg', caption: 'Me modifying our Mechathon robot during our trial run' },
  { src: '/images/resume/6.jpg', caption: 'Me working on my Mechathon robot with my team' }
];

const Resume = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleKeyDown = useCallback((e) => {
    if (!lightboxOpen || !images.length) return;
    if (e.key === 'Escape') setLightboxOpen(false);
    if (e.key === 'ArrowRight') setCurrentImageIndex((prev) => (prev + 1) % images.length);
    if (e.key === 'ArrowLeft') setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [lightboxOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (lightboxOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [lightboxOpen]);

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Hero Section */}
      <section style={{
        padding: '80px 20px 60px',
        textAlign: 'center',
        background: '#f5f5f5'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#0a0a0a',
          margin: 0,
          letterSpacing: '-1px'
        }}>
          Resume
        </h1>
      </section>

      {/* Content Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '60px',
        alignItems: 'start'
      }}>
        {/* Left Column - Resume PDF */}
        <div style={{
          position: 'sticky',
          top: '100px'
        }}>
          <div style={{
            width: '100%',
            aspectRatio: '1/1.414',
            background: 'white',
            border: '1px solid #e2e8f0',
            marginBottom: '20px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1), 0 10px 15px -5px rgba(0,0,0,0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.15), 0 15px 20px -5px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.1), 0 10px 15px -5px rgba(0,0,0,0.05)';
          }}>
            <a href="/images/resume/Anmol_Prabhakar_Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
              <img 
                src="/images/resume/resume-preview.jpg" 
                alt="Resume Preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} 
              />
            </a>
          </div>
          <a
            href="/images/resume/Anmol_Prabhakar_Resume.pdf"
            download="Anmol_Prabhakar_Resume.pdf"
            style={{
              display: 'block',
              width: '100%',
              padding: '16px',
              backgroundColor: '#0a0a0a',
              color: 'white',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: '8px',
              textTransform: 'none',
              textAlign: 'center',
              textDecoration: 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#8B5CF6';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 15px -3px rgba(139, 92, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#0a0a0a';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }}
          >
            Download Resume
          </a>
        </div>

        {/* Right Column - Photo Grid */}
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '30px',
            color: '#0a0a0a',
            borderLeft: '4px solid #8B5CF6',
            paddingLeft: '15px'
          }}>
            Life In Engineering
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {images.map((imgObj, i) => (
              <div
                key={i}
                onClick={() => {
                  setCurrentImageIndex(i);
                  setLightboxOpen(true);
                }}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#888',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
              >
                <img
                  src={imgObj.src}
                  alt={`Life in Engineering ${i + 1}`}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    objectPosition: i === 4 ? '70% 30%' : i === 5 ? '20% center' : 'center'
                  }}
                />
              </div>
            ))}
          </div>
          <p style={{
            marginTop: '30px',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#444'
          }}>
            Pictures of me engineering throughout the years.
          </p>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {lightboxOpen && images.length > 0 && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(10px)',
            zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            style={{
              position: 'fixed', top: '30px', right: '40px', background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '50%', width: '50px', height: '50px',
              color: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000, transition: 'all 0.2s', backdropFilter: 'blur(5px)', mixBlendMode: 'difference'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#1a1a1a'; e.currentTarget.style.mixBlendMode = 'normal'; e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.mixBlendMode = 'difference'; e.currentTarget.style.transform = 'scale(1)'; }}
          >✕</button>

          <button
            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length); }}
            style={{
              position: 'absolute', left: '40px', background: 'transparent', border: 'none', color: 'white', fontSize: '3rem', cursor: 'pointer', zIndex: 100000, transition: 'transform 0.2s, opacity 0.2s', opacity: 0.8, mixBlendMode: 'difference'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1) translateX(-5px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'scale(1) translateX(0)'; }}
          >‹</button>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '85vw', zIndex: 10000 }}>
            <img
              src={images[currentImageIndex].src}
              alt="Expanded Gallery Image"
              style={{ maxWidth: '100%', maxHeight: 'calc(85vh - 50px)', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', userSelect: 'none' }}
              onClick={(e) => e.stopPropagation()}
            />
            {images[currentImageIndex].caption && (
              <div
                style={{
                  marginTop: '15px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1.05rem',
                  fontWeight: '400',
                  textAlign: 'center',
                  maxWidth: '100%',
                  lineHeight: '1.4',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  userSelect: 'none',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                {images[currentImageIndex].caption}
              </div>
            )}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev + 1) % images.length); }}
            style={{
              position: 'absolute', right: '40px', background: 'transparent', border: 'none', color: 'white', fontSize: '3rem', cursor: 'pointer', zIndex: 100000, transition: 'transform 0.2s, opacity 0.2s', opacity: 0.8, mixBlendMode: 'difference'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1) translateX(5px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'scale(1) translateX(0)'; }}
          >›</button>

          <div style={{ position: 'absolute', bottom: '20px', color: 'white', fontSize: '1.2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          section {
            grid-template-columns: 1fr !important;
          }
          div[style*="position: sticky"] {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;