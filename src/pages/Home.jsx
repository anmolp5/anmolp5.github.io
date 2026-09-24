import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const Home = () => {
  const { homeData, updateHomeData, editMode } = useAdmin();

  const hero = homeData?.hero || {};
  const about = homeData?.about || {};
  const experiences = homeData?.experiences || [];
  const skillsList = homeData?.skills || [];

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

  const updateExperienceBullet = (expIndex, bulletIndex, value) => {
    const newExps = [...experiences];
    const newBullets = [...newExps[expIndex].bullets];
    newBullets[bulletIndex] = value;
    newExps[expIndex] = { ...newExps[expIndex], bullets: newBullets };
    updateHomeData((prev) => ({
      ...prev,
      experiences: newExps
    }));
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1
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
            contentEditable={editMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => updateHeroField('major', e.currentTarget.innerText.trim())}
            style={{
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
              fontWeight: '500',
              color: '#555',
              marginBottom: '10px',
              letterSpacing: '0.5px',
              cursor: editMode ? 'text' : 'inherit'
            }}
          >
            {hero.major}
          </p>

          <p
            contentEditable={editMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => updateHeroField('minor', e.currentTarget.innerText.trim())}
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              fontWeight: '400',
              color: '#666',
              marginBottom: '10px',
              letterSpacing: '0.5px',
              cursor: editMode ? 'text' : 'inherit'
            }}
          >
            {hero.minor}
          </p>

          <p
            contentEditable={editMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => updateHeroField('focus', e.currentTarget.innerText.trim())}
            style={{
              fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
              fontWeight: '500',
              color: '#7c3aed',
              marginBottom: '20px',
              letterSpacing: '0.3px',
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
              margin: '0 auto 20px'
            }}
          />

          <p style={{ fontSize: '1.1rem', color: '#666' }}>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => updateHeroField('school', e.currentTarget.innerText.trim())}
            >
              {hero.school}
            </span>
            <br />
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => updateHeroField('graduation', e.currentTarget.innerText.trim())}
              style={{ fontSize: '0.95rem', opacity: 0.8 }}
            >
              {hero.graduation}
            </span>
          </p>
        </div>
      </section>

      {/* About Me Section */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto 100px',
          padding: '0 40px'
        }}
      >
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'center'
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '2rem',
                marginBottom: '30px',
                color: '#0a0a0a',
                borderLeft: '4px solid #8B5CF6',
                paddingLeft: '20px'
              }}
            >
              About Me
            </h2>

            {about.paragraphs?.map((para, idx) => (
              <p
                key={idx}
                contentEditable={editMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => updateAboutParagraph(idx, e.currentTarget.innerText.trim())}
                style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  color: '#444',
                  marginBottom: '20px',
                  textAlign: 'left',
                  cursor: editMode ? 'text' : 'inherit'
                }}
              >
                {para}
              </p>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '3/4',
                background: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}
            >
              <img
                src={about.image || '/images/home/profile.jpg'}
                alt={hero.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        style={{
          maxWidth: '1000px',
          margin: '0 auto 100px',
          padding: '0 40px'
        }}
      >
        <h2
          style={{
            fontSize: '2rem',
            marginBottom: '50px',
            color: '#0a0a0a',
            borderLeft: '4px solid #8B5CF6',
            paddingLeft: '20px'
          }}
        >
          Experience
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {experiences.map((exp, expIdx) => (
            <div key={exp.id || expIdx}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '10px',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <h3
                  contentEditable={editMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const newExps = [...experiences];
                    newExps[expIdx].company = e.currentTarget.innerText.trim();
                    updateHomeData((prev) => ({ ...prev, experiences: newExps }));
                  }}
                  style={{ fontSize: '1.4rem', color: '#0a0a0a', margin: 0 }}
                >
                  {exp.company}
                </h3>
                <span
                  contentEditable={editMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const newExps = [...experiences];
                    newExps[expIdx].period = e.currentTarget.innerText.trim();
                    updateHomeData((prev) => ({ ...prev, experiences: newExps }));
                  }}
                  style={{ color: '#666', fontWeight: '500' }}
                >
                  {exp.period}
                </span>
              </div>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: '#8B5CF6',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}
              >
                <span
                  contentEditable={editMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const newExps = [...experiences];
                    newExps[expIdx].role = e.currentTarget.innerText.trim();
                    updateHomeData((prev) => ({ ...prev, experiences: newExps }));
                  }}
                >
                  {exp.role}
                </span>{' '}
                {exp.location && (
                  <>
                    |{' '}
                    <span
                      contentEditable={editMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const newExps = [...experiences];
                        newExps[expIdx].location = e.currentTarget.innerText.trim();
                        updateHomeData((prev) => ({ ...prev, experiences: newExps }));
                      }}
                    >
                      {exp.location}
                    </span>
                  </>
                )}
              </p>
              <ul style={{ paddingLeft: '20px', color: '#444', lineHeight: '1.6', fontSize: '1rem' }}>
                {exp.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    contentEditable={editMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => updateExperienceBullet(expIdx, bIdx, e.currentTarget.innerText.trim())}
                    style={{
                      marginBottom: '10px',
                      cursor: editMode ? 'text' : 'inherit'
                    }}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section
        style={{
          backgroundColor: '#fff',
          padding: '100px 40px',
          marginBottom: '100px',
          borderTop: '1px solid #eee',
          borderBottom: '1px solid #eee'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2rem',
              marginBottom: '60px',
              textAlign: 'center',
              color: '#0a0a0a'
            }}
          >
            Skills &amp; Expertise
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px'
            }}
          >
            {skillsList.map((skill, index) => (
              <div
                key={index}
                style={{
                  padding: '40px',
                  background: '#f9f9f9',
                  borderRadius: '8px',
                  border: '1px solid #eee',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  height: '100%'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#0a0a0a' }}>
                  {skill.title}
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#555' }}>{skill.skills}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 40px',
          textAlign: 'center'
        }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#0a0a0a' }}>
          See What I've Built
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>
          Explore my latest engineering projects, designs, and prototypes.
        </p>
        <Link
          to="/projects"
          style={{
            display: 'inline-block',
            padding: '15px 40px',
            backgroundColor: '#0a0a0a',
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: '600',
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.2s'
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
          Check Out My Work
        </Link>
      </section>
    </div>
  );
};

export default Home;