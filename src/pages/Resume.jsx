import React from 'react';

const Resume = () => {
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
            border: '1px solid #ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#888',
            fontSize: '1rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            marginBottom: '20px',
            borderRadius: '4px'
          }}>
            [Resume PDF Preview]
          </div>
          <button
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#0a0a0a',
              color: 'white',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderRadius: '4px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#8B5CF6';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#0a0a0a';
              e.target.style.color = 'white';
            }}
          >
            Download Resume
          </button>
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
            Life at Illinois
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#888',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Photo Placeholder {i}
              </div>
            ))}
          </div>
          <p style={{
            marginTop: '30px',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#444'
          }}>
            Beyond the coursework and projects, my time at UIUC has been defined by the hands-on experiences in the labs, the collaborative sessions in the maker spaces, and the community of engineers I've had the privilege to work with. These photos capture some of those moments in the shop, at competitions, and during late-night build sessions.
          </p>
        </div>
      </section>

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