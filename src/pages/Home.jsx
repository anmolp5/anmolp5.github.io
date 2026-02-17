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
            marginBottom: '10px',
            letterSpacing: '0.5px'
          }}>
            Systems Engineering and Design
          </p>
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            fontWeight: '400',
            color: '#666',
            marginBottom: '20px',
            letterSpacing: '0.5px'
          }}>
            Minor in Electrical Engineering
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
            <span style={{ fontSize: '0.95rem', opacity: 0.8 }}>Expected Graduation: May 2028</span>
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
              <img
                src="/images/home/profile.jpg"
                alt="Anmol Prabhakar"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>
        </div>
      </section>


      {/* Experience Section */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto 100px',
        padding: '0 40px'
      }}>
        <h2 style={{
          fontSize: '2rem',
          marginBottom: '50px',
          color: '#0a0a0a',
          borderLeft: '4px solid #8B5CF6',
          paddingLeft: '20px'
        }}>
          Experience
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Brainstorm EEG */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#0a0a0a', margin: 0 }}>Brainstorm EEG Hardware Team</h3>
              <span style={{ color: '#666', fontWeight: '500' }}>Sep 2025 – Present</span>
            </div>
            <p style={{ fontSize: '1.1rem', color: '#8B5CF6', fontWeight: '600', marginBottom: '15px' }}>Hardware Engineer</p>
            <ul style={{ paddingLeft: '20px', color: '#444', lineHeight: '1.6', fontSize: '1rem' }}>
              <li style={{ marginBottom: '8px' }}>Engineered a biocompatible strap for EEG neurofeedback therapy, optimizing for patient comfort and signal fidelity.</li>
              <li style={{ marginBottom: '8px' }}>Iterated 7+ prototypes using CAD and 3D printing to minimize package size and secure electrode stability during use.</li>
              <li style={{ marginBottom: '8px' }}>Developed a custom wiring architecture to reliably transmit data through modular, replaceable cartridge units.</li>
              <li style={{ marginBottom: '8px' }}>Researching EEG signal processing circuits to design a custom PCB streaming real-time data into AI models.</li>
            </ul>
          </div>

          {/* Beverly Orthopedics */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#0a0a0a', margin: 0 }}>Beverly Orthopedics</h3>
              <span style={{ color: '#666', fontWeight: '500' }}>Jul 2024</span>
            </div>
            <p style={{ fontSize: '1.1rem', color: '#8B5CF6', fontWeight: '600', marginBottom: '15px' }}>Clinical Engineering Intern</p>
            <ul style={{ paddingLeft: '20px', color: '#444', lineHeight: '1.6', fontSize: '1rem' }}>
              <li style={{ marginBottom: '8px' }}>Fabricated 13 custom-fit orthotics and diabetic insoles, utilizing carbon fiber lamination for lightweight durability.</li>
              <li style={{ marginBottom: '8px' }}>Facilitated patient care by providing real-time Spanish-English translation for 20+ patients, ensuring accurate diagnoses.</li>
              <li style={{ marginBottom: '8px' }}>Executed 3D scanning protocols for patient anatomies to generate precise geometry for custom diabetic shoe inserts.</li>
            </ul>
          </div>

          {/* Credence Prosthetics */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#0a0a0a', margin: 0 }}>Credence Prosthetics</h3>
              <span style={{ color: '#666', fontWeight: '500' }}>Jun 2024</span>
            </div>
            <p style={{ fontSize: '1.1rem', color: '#8B5CF6', fontWeight: '600', marginBottom: '15px' }}>Prosthetics Intern</p>
            <ul style={{ paddingLeft: '20px', color: '#444', lineHeight: '1.6', fontSize: '1rem' }}>
              <li style={{ marginBottom: '8px' }}>Trained in the designing, assembly, and tuning of 8 different types of orthotic and prosthetic devices.</li>
              <li style={{ marginBottom: '8px' }}>Performed casting procedures on patient limbs to fabricate custom thigh and foot shells using molded polycarbonate.</li>
              <li style={{ marginBottom: '8px' }}>Conducted gait analysis and synthesized user feedback to fine-tune orthotic devices, improving patient mobility metrics.</li>
              <li style={{ marginBottom: '8px' }}>Assembled complex medical devices including knee-ankle-foot orthotics (KAFO) and cerebral palsy foot braces.</li>
            </ul>
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
                icon: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                )
              },
              {
                title: 'Fabrication',
                skills: 'CNC Machining, Bandsaw, Rotary Grinder, Surface Planer, Carbon Fiber Layups, Circuit Assembly',
                icon: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                )
              },
              {
                title: 'Languages',
                skills: 'English (Native), Hindi (Native), Spanish (Professional Working Proficiency)',
                icon: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                )
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