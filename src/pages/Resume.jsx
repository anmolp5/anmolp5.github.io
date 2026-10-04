import React, { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../context/AdminContext';

const images = [
  { src: '/images/resume/1.jpg', caption: 'Me at a robot showcase for FLL in 2016' },
  { src: '/images/resume/2.jpg', caption: 'My FLL Team and I after we won prizes at our qualifier in 2018' },
  { src: '/images/resume/3.jpg', caption: 'Me holding our FTC robot at a competition in 2021' },
  { src: '/images/resume/4.jpg', caption: 'Me acting as a driver coach at the FTC regional championship in 2024' },
  { src: '/images/resume/5.jpg', caption: 'Me modifying our Mechathon robot during our trial run' },
  { src: '/images/resume/6.jpg', caption: 'Me working on my Mechathon robot with my team' }
];

const Resume = () => {
  const { homeData } = useAdmin();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const aboutBio = homeData?.aboutBio || {};
  const experiences = homeData?.experiences || [];
  const profileImg = homeData?.about?.image || '/images/home/profile.jpg';

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
    return () => { document.body.style.overflow = 'unset'; };
  }, [lightboxOpen]);

  return (
    <div className="about-page" style={{ paddingBottom: '100px' }}>
      {/* Hero Banner */}
      <section
        className="about-hero"
        style={{
          padding: '64px 20px 48px',
          textAlign: 'center',
          background: '#f5f5f5'
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
            fontWeight: '800',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#0a0a0a',
            margin: '0 0 12px',
            letterSpacing: '-1px'
          }}
        >
          About Me
        </h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            color: '#6b7280',
            maxWidth: '640px',
            margin: '0 auto'
          }}
        >
          Background, engineering experience, and resume.
        </p>
      </section>

      {/* Section 1: Split Intro Card (Photo + Education on Left, Bio + Interests on Right) */}
      <section
        className="about-container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto 80px',
          padding: '0 40px'
        }}
      >
        <div
          className="about-intro-card"
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e5e7eb',
            padding: '44px',
            boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.06)',
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: '48px',
            alignItems: 'start'
          }}
        >
          {/* Left: Portrait Photo & Education Badge */}
          <div className="about-intro-photo-col" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '4 / 5',
                borderRadius: '14px',
                overflow: 'hidden',
                background: '#e5e7eb',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.12)'
              }}
            >
              <img
                src={profileImg}
                alt="Anmol Prabhakar"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 15%'
                }}
              />
            </div>

            <div
              style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px 18px'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#7c3aed', marginBottom: '4px' }}>
                Education
              </div>
              <div style={{ fontSize: '0.98rem', fontWeight: '700', color: '#0a0a0a', marginBottom: '2px' }}>
                {aboutBio.school || 'University of Illinois Urbana-Champaign'}
              </div>
              <div style={{ fontSize: '0.88rem', color: '#374151', fontWeight: '500', marginBottom: '4px' }}>
                {aboutBio.degree || 'B.S. in Bioengineering | Minor in Electrical Engineering'}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#6b7280' }}>
                {aboutBio.graduation || 'Expected Graduation: May 2028'}
              </div>
            </div>
          </div>

          {/* Right: Bio Narrative, Core Engineering Interests, and Relevant Coursework */}
          <div>
            {(aboutBio.paragraphs || []).map((para, idx) => (
              <p
                key={idx}
                className="about-bio-para"
                style={{
                  fontSize: '1.06rem',
                  lineHeight: '1.78',
                  color: '#374151',
                  marginBottom: '16px',
                  marginTop: 0
                }}
              >
                {para}
              </p>
            ))}

            {/* Interests Pills */}
            {aboutBio.interests && aboutBio.interests.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h3
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    color: '#6b7280',
                    marginBottom: '10px'
                  }}
                >
                  Core Engineering Interests
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {aboutBio.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="about-interest-pill"
                      style={{
                        fontSize: '0.84rem',
                        fontWeight: '600',
                        padding: '6px 14px',
                        borderRadius: '999px',
                        background: '#f3e8ff',
                        color: '#6d28d9',
                        border: '1px solid #e9d5ff'
                      }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Relevant Coursework */}
            {aboutBio.coursework && aboutBio.coursework.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h3
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    color: '#6b7280',
                    marginBottom: '10px'
                  }}
                >
                  Relevant Coursework
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {aboutBio.coursework.map((course, i) => (
                    <span
                      key={i}
                      className="about-course-pill"
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: '500',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        background: '#f9fafb',
                        color: '#374151',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 2: Sticky Resume Sidebar + Detailed Experience Timeline */}
      <section
        className="about-container about-resume-exp-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto 90px',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          gap: '56px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Sticky Resume Card */}
        <div
          className="sticky-resume-col"
          style={{
            position: 'sticky',
            top: '96px'
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              marginBottom: '20px',
              color: '#0a0a0a',
              borderLeft: '4px solid #8B5CF6',
              paddingLeft: '15px'
            }}
          >
            Resume
          </h2>

          <div
            style={{
              width: '100%',
              aspectRatio: '1 / 1.414',
              background: 'white',
              border: '1px solid #e2e8f0',
              marginBottom: '16px',
              borderRadius: '14px',
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
            }}
          >
            <a
              href="/images/resume/Anmol_Prabhakar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', height: '100%' }}
              title="Click to open full PDF in new tab"
            >
              <img
                src="/images/resume/resume-preview.jpg"
                alt="Anmol Prabhakar Resume Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a
              href="/images/resume/Anmol_Prabhakar_Resume.pdf"
              download="Anmol_Prabhakar_Resume.pdf"
              style={{
                display: 'block',
                width: '100%',
                padding: '15px',
                backgroundColor: '#0a0a0a',
                color: 'white',
                border: 'none',
                fontSize: '0.98rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                borderRadius: '10px',
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8B5CF6';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0a0a0a';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Download Resume (PDF)
            </a>

            <a
              href="/images/resume/Anmol_Prabhakar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                padding: '12px',
                backgroundColor: '#ffffff',
                color: '#374151',
                border: '1px solid #d1d5db',
                fontSize: '0.9rem',
                fontWeight: '600',
                borderRadius: '10px',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#8B5CF6';
                e.currentTarget.style.color = '#7c3aed';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.color = '#374151';
              }}
            >
              Open Fullscreen PDF ↗
            </a>
          </div>
        </div>

        {/* Right Column: Experience Timeline */}
        <div>
          <h2
            style={{
              fontSize: '1.5rem',
              marginBottom: '24px',
              color: '#0a0a0a',
              borderLeft: '4px solid #8B5CF6',
              paddingLeft: '15px'
            }}
          >
            Experience
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {experiences.map((exp, expIdx) => (
              <div
                key={exp.id || expIdx}
                className="exp-card"
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  padding: '28px 30px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '6px',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}
                >
                  <h3 className="exp-company" style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0a0a0a', margin: 0 }}>
                    {exp.company}
                  </h3>
                  <span
                    className="exp-period"
                    style={{
                      fontSize: '0.88rem',
                      color: '#6b7280',
                      fontWeight: '600',
                      background: '#f3f4f6',
                      padding: '4px 10px',
                      borderRadius: '999px'
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                <p
                  className="exp-role"
                  style={{
                    fontSize: '1rem',
                    color: '#7c3aed',
                    fontWeight: '600',
                    marginBottom: '16px',
                    marginTop: '4px'
                  }}
                >
                  {exp.role}
                  {exp.location ? <span style={{ color: '#9ca3af', fontWeight: '500' }}> | {exp.location}</span> : null}
                </p>

                <ul
                  className="exp-bullets"
                  style={{
                    paddingLeft: '20px',
                    margin: 0,
                    color: '#374151',
                    lineHeight: '1.68',
                    fontSize: '0.96rem'
                  }}
                >
                  {(exp.bullets || []).map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      style={{
                        marginBottom: bIdx === exp.bullets.length - 1 ? 0 : '10px'
                      }}
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Life In Engineering Photo Gallery */}
      <section
        className="about-container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px'
        }}
      >
        <div style={{ marginBottom: '28px' }}>
          <h2
            style={{
              fontSize: '1.65rem',
              marginBottom: '8px',
              color: '#0a0a0a',
              borderLeft: '4px solid #8B5CF6',
              paddingLeft: '15px'
            }}
          >
            Life In Engineering
          </h2>
          <p
            style={{
              fontSize: '1.02rem',
              color: '#6b7280',
              marginLeft: '19px',
              marginTop: '4px'
            }}
          >
            Pictures of me building, prototyping, and competing throughout the years.
          </p>
        </div>

        <div
          className="life-gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px'
          }}
        >
          {images.map((imgObj, i) => (
            <div
              key={i}
              onClick={() => {
                setCurrentImageIndex(i);
                setLightboxOpen(true);
              }}
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                backgroundColor: '#e5e7eb',
                borderRadius: '14px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02) translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 14px 24px -4px rgba(0, 0, 0, 0.14)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.08)';
              }}
            >
              <img
                src={imgObj.src}
                alt={imgObj.caption || `Life in Engineering ${i + 1}`}
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
      </section>

      {/* Lightbox Overlay */}
      {lightboxOpen && images.length > 0 && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            style={{
              position: 'fixed',
              top: '24px',
              right: '24px',
              background: 'rgba(255, 255, 255, 0.14)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              color: 'white',
              fontSize: '1.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100000
            }}
          >
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
            }}
            style={{
              position: 'absolute',
              left: '20px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '3rem',
              cursor: 'pointer',
              zIndex: 100000,
              padding: '10px'
            }}
          >
            ‹
          </button>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '85vw',
              zIndex: 10000
            }}
          >
            <img
              src={images[currentImageIndex].src}
              alt="Expanded Gallery Image"
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(82vh - 50px)',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                userSelect: 'none'
              }}
              onClick={(e) => e.stopPropagation()}
            />
            {images[currentImageIndex].caption && (
              <div
                style={{
                  marginTop: '16px',
                  color: 'rgba(255, 255, 255, 0.92)',
                  fontSize: '1rem',
                  fontWeight: '400',
                  textAlign: 'center',
                  maxWidth: '100%',
                  lineHeight: '1.45',
                  padding: '0 16px'
                }}
              >
                {images[currentImageIndex].caption}
              </div>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }}
            style={{
              position: 'absolute',
              right: '20px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '3rem',
              cursor: 'pointer',
              zIndex: 100000,
              padding: '10px'
            }}
          >
            ›
          </button>

          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              color: 'white',
              fontSize: '1rem'
            }}
          >
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .about-intro-card {
            grid-template-columns: 1fr !important;
            padding: 24px 20px !important;
            gap: 22px !important;
          }
          .about-intro-photo-col {
            max-width: 240px;
            margin: 0 auto;
            width: 100%;
          }
          .about-resume-exp-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .sticky-resume-col {
            position: static !important;
            max-width: 380px;
            margin: 0 auto;
            width: 100%;
          }
        }
        @media (max-width: 768px) {
          .about-hero {
            padding: 24px 16px 18px !important;
          }
          .about-container {
            padding: 0 18px !important;
            margin-bottom: 42px !important;
          }
          .about-bio-para {
            font-size: 0.88rem !important;
            line-height: 1.54 !important;
            margin-bottom: 10px !important;
          }
          .about-interest-pill {
            font-size: 0.74rem !important;
            padding: 4px 10px !important;
          }
          .about-course-pill {
            font-size: 0.72rem !important;
            padding: 3px 8px !important;
          }
          .exp-card {
            padding: 18px 16px !important;
          }
          .exp-company {
            font-size: 1.04rem !important;
          }
          .exp-role {
            font-size: 0.85rem !important;
            margin-bottom: 10px !important;
          }
          .exp-bullets {
            font-size: 0.85rem !important;
            line-height: 1.5 !important;
            padding-left: 16px !important;
          }
          .life-gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }
        @media (max-width: 480px) {
          .about-intro-card {
            padding: 18px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;