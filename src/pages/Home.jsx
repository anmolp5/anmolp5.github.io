import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Hero Section */}
      <section style={{
        height: '50vh',
        background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7)), url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 20px',
        color: '#0a0a0a',
        marginBottom: '80px'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
            fontWeight: '800',
            marginBottom: '10px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-1px',
            color: '#0a0a0a'
          }}>
            Anmol Prabhakar
          </h1>
          <p style={{
            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
            fontWeight: '500',
            color: '#555',
            marginBottom: '20px',
            letterSpacing: '0.5px'
          }}>
            Systems Engineering and Design
          </p>
          <div style={{
            width: '60px',
            height: '4px',
            background: '#8B5CF6',
            margin: '0 auto 20px'
          }}></div>
          <p style={{
            fontSize: '1.1rem',
            color: '#666'
          }}>
            University of Illinois Urbana-Champaign <br />
            <span style={{ fontSize: '0.95rem', opacity: 0.8 }}>Expected Graduation: December 2028</span>
          </p>
        </div>
      </section>

      {/* About Me Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto 100px',
        padding: '0 40px'
      }}>
        <div className="about-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{
              fontSize: '2rem',
              marginBottom: '30px',
              color: '#0a0a0a',
              borderLeft: '4px solid #8B5CF6',
              paddingLeft: '20px'
            }}>
              About Me
            </h2>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#444',
              marginBottom: '20px',
              textAlign: 'justify'
            }}>
              I’m Anmol, an engineer interested in how complex systems come together. I focus on how design decisions affect performance, efficiency, and reliability as a whole. I’m especially drawn to problem-solving that requires structured thinking, testing assumptions, and refining ideas through iteration.
            </p>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#444',
              textAlign: 'justify'
            }}>
              I enjoy breaking down challenges, analyzing trade-offs, and optimizing designs to make them cleaner and more effective. My goal is to work on projects where precision matters and where thoughtful engineering can directly improve how something functions in the real world.
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '400px',
              aspectRatio: '3/4',
              background: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#888',
              fontSize: '1.2rem',
              fontWeight: '500',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              Profile Photo Placeholder
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section style={{
        backgroundColor: '#fff',
        padding: '100px 40px',
        marginBottom: '100px',
        borderTop: '1px solid #eee',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '60px',
            textAlign: 'center',
            color: '#0a0a0a'
          }}>
            Skills & Expertise
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {[
              {
                title: 'Technical Design',
                skills: 'Fusion 360, Onshape, SolidWorks, Python (Pandas/NumPy), FDM 3D Printing, Rapid Prototyping',
                icon: '🛠️'
              },
              {
                title: 'Fabrication',
                skills: 'CNC Machining, Bandsaw, Rotary Grinder, Surface Planer, Carbon Fiber Layups, Circuit Assembly',
                icon: '⚙️'
              },
              {
                title: 'Languages',
                skills: 'English (Native), Hindi (Native), Spanish (Professional Working Proficiency)',
                icon: '🗣️'
              }
            ].map((skill, index) => (
              <div key={index} style={{
                padding: '40px',
                background: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #eee',
                textAlign: 'center',
                transition: 'transform 0.2s',
                height: '100%'
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{skill.icon}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#0a0a0a' }}>{skill.title}</h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#555' }}>{skill.skills}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coursework & Education (Optional kept from previous, or new CTA) */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 40px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#0a0a0a' }}>
          See What I've Built
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>
          Explore my latest engineering projects, designs, and prototypes.
        </p>
        <Link to="/projects" style={{
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