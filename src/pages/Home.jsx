import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const Home = () => {
  const { homeData, updateHomeData, editMode } = useAdmin();

  const hero = homeData?.hero || {};
  const about = homeData?.about || {};
  const flagshipProjects = homeData?.flagshipProjects || [];
  const skillsList = homeData?.skills || [];

  // Guarantee immediate autoplay on all inline videos across desktop & mobile Safari/Chrome
  useEffect(() => {
    const playAllVideos = () => {
      const vids = document.querySelectorAll('video');
      vids.forEach((v) => {
        v.defaultMuted = true;
        v.muted = true;
        v.setAttribute('muted', '');
        v.setAttribute('playsinline', '');
        v.setAttribute('webkit-playsinline', '');
        if (v.paused) {
          v.play().catch(() => {});
        }
      });
    };

    playAllVideos();
    const t1 = setTimeout(playAllVideos, 80);
    const t2 = setTimeout(playAllVideos, 300);
    const t3 = setTimeout(playAllVideos, 800);
    window.addEventListener('pointermove', playAllVideos, { passive: true, once: true });
    window.addEventListener('mousemove', playAllVideos, { passive: true, once: true });
    window.addEventListener('touchstart', playAllVideos, { passive: true, once: true });
    window.addEventListener('scroll', playAllVideos, { passive: true, once: true });
    window.addEventListener('click', playAllVideos, { passive: true, once: true });
    document.addEventListener('visibilitychange', playAllVideos);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('pointermove', playAllVideos);
      window.removeEventListener('mousemove', playAllVideos);
      window.removeEventListener('touchstart', playAllVideos);
      window.removeEventListener('scroll', playAllVideos);
      window.removeEventListener('click', playAllVideos);
      document.removeEventListener('visibilitychange', playAllVideos);
    };
  }, [flagshipProjects]);

  const updateHeroField = (field, value) => {
    updateHomeData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateAboutParagraph = (index, value) => {
    const newParas = [...(about.paragraphs || [])];
    newParas[index] = value;
    updateHomeData((prev) => ({
      ...prev,
      about: { ...prev.about, paragraphs: newParas }
    }));
  };

  return (
    <div className="home-page" style={{ paddingBottom: '80px' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', padding: '0 16px' }}>
          <h1
            className="home-hero-name"
            contentEditable={editMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => updateHeroField('name', e.currentTarget.innerText.trim())}
            style={{
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              fontWeight: '800',
              marginBottom: '10px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-1px',
              color: '#0a0a0a',
              outline: editMode ? '1px dashed transparent' : 'none',
              cursor: editMode ? 'text' : 'inherit'
            }}
          >
            {hero.name}
          </h1>

          <p
            className="home-hero-major"
            contentEditable={editMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => updateHeroField('major', e.currentTarget.innerText.trim())}
            style={{
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
              fontWeight: '500',
              color: '#333',
              marginBottom: '6px',
              marginTop: 0,
              letterSpacing: '0.5px',
              cursor: editMode ? 'text' : 'inherit'
            }}
          >
            {hero.major}
          </p>

          <p
            className="home-hero-minor"
            contentEditable={editMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => updateHeroField('minor', e.currentTarget.innerText.trim())}
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              fontWeight: '400',
              color: '#555',
              marginBottom: '8px',
              marginTop: 0,
              letterSpacing: '0.5px',
              cursor: editMode ? 'text' : 'inherit'
            }}
          >
            {hero.minor}
          </p>

          <p
            className="home-hero-focus"
            contentEditable={editMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => updateHeroField('focus', e.currentTarget.innerText.trim())}
            style={{
              fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
              fontWeight: '600',
              color: '#7c3aed',
              marginBottom: '14px',
              marginTop: 0,
              letterSpacing: '0.3px',
              lineHeight: '1.4',
              cursor: editMode ? 'text' : 'inherit'
            }}
          >
            {hero.focus}
          </p>

          <div
            style={{
              width: '60px',
              height: '4px',
              background: '#8B5CF6',
              margin: '0 auto 14px',
              borderRadius: '2px'
            }}
          />

          <p className="home-hero-school" style={{ fontSize: '1.1rem', color: '#555', margin: 0, lineHeight: '1.45' }}>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => updateHeroField('school', e.currentTarget.innerText.trim())}
              style={{ fontWeight: '500' }}
            >
              {hero.school}
            </span>
            <br />
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => updateHeroField('graduation', e.currentTarget.innerText.trim())}
              style={{ fontSize: '0.95rem', opacity: 0.85 }}
            >
              {hero.graduation}
            </span>
          </p>
        </div>
      </section>

      {/* About Me Section (Aligned to 1200px; Mobile order: Title -> Picture -> Paragraph) */}
      <section
        className="home-section home-about-section"
        style={{
          maxWidth: '1200px',
          margin: '0 auto 44px',
          padding: '0 40px'
        }}
      >
        <div className="home-about-layout">
          <h2
            className="home-about-title home-sec-heading"
            style={{
              fontSize: '2rem',
              margin: 0,
              color: '#0a0a0a',
              borderLeft: '4px solid #8B5CF6',
              paddingLeft: '16px',
              alignSelf: 'end'
            }}
          >
            About Me
          </h2>

          <div className="home-about-photo-area" style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="home-about-photo"
              style={{
                width: '100%',
                maxWidth: '250px',
                aspectRatio: '1 / 1',
                background: '#e5e7eb',
                borderRadius: '14px',
                boxShadow: '0 12px 28px -6px rgba(0, 0, 0, 0.12)',
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}
            >
              <img
                src={about.image || '/images/home/profile.jpg'}
                alt={hero.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%'
                }}
              />
            </div>
          </div>

          <div className="home-about-text-area" style={{ alignSelf: 'start' }}>
            {about.paragraphs?.map((para, idx) => (
              <p
                key={idx}
                className="home-about-para"
                contentEditable={editMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => updateAboutParagraph(idx, e.currentTarget.innerText.trim())}
                style={{
                  fontSize: '1.08rem',
                  lineHeight: '1.78',
                  color: '#374151',
                  marginBottom: idx === about.paragraphs.length - 1 ? 0 : '14px',
                  marginTop: 0,
                  textAlign: 'left',
                  cursor: editMode ? 'text' : 'inherit'
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Summary Section (Aligned to 1200px) */}
      <section
        className="home-section"
        style={{
          maxWidth: '1200px',
          margin: '0 auto 70px',
          padding: '0 40px'
        }}
      >
        <h2
          className="home-sec-heading"
          style={{
            fontSize: '2rem',
            marginBottom: '26px',
            color: '#0a0a0a',
            borderLeft: '4px solid #8B5CF6',
            paddingLeft: '16px'
          }}
        >
          Featured Projects
        </h2>

        {/* 2 Side-by-Side Flagship Project Cards */}
        <div
          className="flagship-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '28px',
            marginBottom: '36px'
          }}
        >
          {flagshipProjects.map((proj) => {
            const videoSrc = proj.video ? `${proj.video}${proj.video.includes('?') ? '&' : '?'}v=2` : '';
            return (
              <Link
                key={proj.id}
                to={proj.link}
                className="flagship-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 8px 20px -4px rgba(0, 0, 0, 0.06), 0 2px 6px -2px rgba(0, 0, 0, 0.03)',
                  transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease, border-color 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.borderColor = '#8B5CF6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px -4px rgba(0, 0, 0, 0.06), 0 2px 6px -2px rgba(0, 0, 0, 0.03)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                {/* Split Side-by-Side Media Header: Photo (Left) + Looping Video (Right) */}
                <div
                  className="flagship-media-split"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2px',
                    background: '#e5e7eb',
                    height: '235px',
                    borderBottom: '1px solid #e5e7eb'
                  }}
                >
                  {/* Static Image Pane (No overlay tag) */}
                  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#111' }}>
                    <img
                      src={proj.image}
                      alt={`${proj.title} hardware`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Looping Video Pane (Native HTML muted autoplay + zero audio track + no overlay tag) */}
                  <div
                    style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#111' }}
                    ref={(wrapperEl) => {
                      if (!wrapperEl) return;
                      const vid = wrapperEl.querySelector('video');
                      if (vid) {
                        vid.defaultMuted = true;
                        vid.muted = true;
                        const tryPlay = () => {
                          vid.muted = true;
                          vid.play().catch(() => {});
                        };
                        vid.addEventListener('loadedmetadata', tryPlay, { once: true });
                        vid.addEventListener('canplay', tryPlay, { once: true });
                        tryPlay();
                      }
                    }}
                    dangerouslySetInnerHTML={{
                      __html: `<video src="${videoSrc}" autoplay loop muted playsinline webkit-playsinline preload="auto" disablepictureinpicture disableremoteplayback style="width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;"></video>`
                    }}
                  />
                </div>

                {/* Card Details Body */}
                <div
                  className="flagship-card-body"
                  style={{
                    padding: '22px 26px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    {/* Title & Subtitle */}
                    <h3
                      className="flagship-card-title"
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: '800',
                        color: '#0a0a0a',
                        marginBottom: '4px',
                        lineHeight: '1.25'
                      }}
                    >
                      {proj.title}
                    </h3>
                    <p
                      className="flagship-card-subtitle"
                      style={{
                        fontSize: '0.92rem',
                        fontWeight: '600',
                        color: '#7c3aed',
                        marginBottom: '12px',
                        marginTop: 0
                      }}
                    >
                      {proj.subtitle}
                    </p>

                    {/* High-Level Overview Description */}
                    <p
                      className="flagship-card-desc"
                      style={{
                        fontSize: '0.96rem',
                        lineHeight: '1.62',
                        color: '#4b5563',
                        marginBottom: '14px',
                        marginTop: 0
                      }}
                    >
                      {proj.description}
                    </p>
                  </div>

                  {/* Compact Bottom-Right 'See more ->' */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      color: '#7c3aed'
                    }}
                  >
                    <span>See more</span>
                    <span style={{ fontSize: '1.05rem', lineHeight: 1 }}>→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Clean CTA Underneath Flagship Cards (No Card Wrapper) */}
        <div
          style={{
            textAlign: 'center',
            paddingTop: '8px'
          }}
        >
          <p
            className="home-cta-text"
            style={{
              fontSize: '1.08rem',
              color: '#374151',
              fontWeight: '500',
              marginBottom: '16px',
              marginTop: 0
            }}
          >
            Want to see these in more detail or see my other projects?
          </p>
          <Link
            to="/projects"
            className="home-cta-btn"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              backgroundColor: '#0a0a0a',
              color: 'white',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              transition: 'all 0.2s ease'
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
            Check Out My Work
          </Link>
        </div>
      </section>

      {/* Skills Section */}
      <section
        className="home-skills-section"
        style={{
          backgroundColor: '#fff',
          padding: '72px 40px',
          borderTop: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            className="home-sec-heading"
            style={{
              fontSize: '2rem',
              marginBottom: '48px',
              textAlign: 'center',
              color: '#0a0a0a'
            }}
          >
            Skills &amp; Expertise
          </h2>

          <div
            className="skills-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px'
            }}
          >
            {skillsList.map((skill, index) => (
              <div
                key={index}
                className="skill-card-item"
                style={{
                  padding: '36px 28px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 className="skill-card-title" style={{ fontSize: '1.4rem', marginBottom: '12px', color: '#0a0a0a', fontWeight: '700' }}>
                  {skill.title}
                </h3>
                <p className="skill-card-desc" style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', margin: 0 }}>
                  {skill.skills}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .home-about-layout {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          grid-template-areas:
            "title photo"
            "text  photo";
          column-gap: 44px;
          row-gap: 14px;
          align-items: center;
        }
        .home-about-title {
          grid-area: title;
        }
        .home-about-photo-area {
          grid-area: photo;
        }
        .home-about-text-area {
          grid-area: text;
        }

        @media (max-width: 960px) {
          .flagship-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .home-hero-name {
            font-size: 2.1rem !important;
          }
          .home-hero-major {
            font-size: 1.05rem !important;
          }
          .home-hero-minor {
            font-size: 0.9rem !important;
          }
          .home-hero-focus {
            font-size: 0.84rem !important;
          }
          .home-hero-school {
            font-size: 0.88rem !important;
          }
          .home-sec-heading {
            font-size: 1.4rem !important;
            margin-bottom: 18px !important;
          }
          .home-section {
            padding: 0 18px !important;
            margin-bottom: 36px !important;
          }
          .home-about-layout {
            grid-template-columns: 1fr !important;
            grid-template-areas:
              "title"
              "photo"
              "text" !important;
            row-gap: 16px !important;
          }
          .home-about-photo {
            max-width: 200px !important;
          }
          .home-about-para {
            font-size: 0.88rem !important;
            line-height: 1.55 !important;
          }
          .flagship-media-split {
            height: 185px !important;
          }
          .flagship-card-body {
            padding: 16px 18px !important;
          }
          .flagship-card-title {
            font-size: 1.12rem !important;
          }
          .flagship-card-subtitle {
            font-size: 0.82rem !important;
          }
          .flagship-card-desc {
            font-size: 0.86rem !important;
            line-height: 1.52 !important;
          }
          .home-cta-text {
            font-size: 0.92rem !important;
          }
          .home-cta-btn {
            padding: 12px 26px !important;
            font-size: 0.88rem !important;
          }
          .home-skills-section {
            padding: 36px 18px !important;
          }
          .skill-card-item {
            padding: 20px 18px !important;
          }
          .skill-card-title {
            font-size: 1.1rem !important;
            margin-bottom: 8px !important;
          }
          .skill-card-desc {
            font-size: 0.86rem !important;
            line-height: 1.5 !important;
          }
          .skills-cards-grid {
            gap: 14px !important;
          }
        }
        @media (max-width: 480px) {
          .flagship-media-split {
            height: 165px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;