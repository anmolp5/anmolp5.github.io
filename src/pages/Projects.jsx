import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 'room-improvement',
    title: 'Room Improvement',
    subtitle: 'Bedroom Improvement (3D Experience)',
    color: '#6b8e23',
    link: '/projects/room-improvement',
    image: '/images/projects/room-improvement/hero.png'
  },
  {
    id: 'ftc-robotics',
    title: 'FTC Robotics',
    subtitle: 'Biobots #14318',
    color: '#9370db',
    link: '/projects/ftc-robotics',
    image: '/images/projects/ftc-robotics/card.jpg'
  },
  {
    id: 'orthotic-repair',
    title: 'Orthotic Repair',
    color: '#4682b4',
    link: '/projects/orthotic-repair'
  },
  {
    id: 'golf-ball-launcher',
    title: 'Golf Ball Launcher',
    color: '#8fbc8f',
    link: '/projects/golf-ball-launcher',
    image: '/images/projects/golf-ball-launcher/hero.png',
    backgroundPosition: 'center 25%'
  },
  {
    id: 'small-business-tools',
    title: 'Small Business Tools',
    subtitle: 'Kanyalndya',
    color: '#cd5c5c',
    link: '/projects/small-business-tools'
  },
  {
    id: 'sitting-table',
    title: 'Sitting Table',
    color: '#bc8f8f',
    link: '/projects/sitting-table',
    image: '/images/projects/sitting-table/hero.jpg'
  }
];

const Projects = () => {
  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Hero Section */}
      <section style={{
        height: '40vh',
        background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.8)), url("https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 20px',
        color: '#0a0a0a'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          marginBottom: '10px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '-1px'
        }}>
          Project Portfolio
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#555',
          maxWidth: '600px'
        }}>
          These projects showcase my work as an engineer so far.
        </p>
      </section>

      {/* Intro Text */}
      <section style={{
        maxWidth: '800px',
        margin: '60px auto',
        padding: '0 40px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.6',
          color: '#444'
        }}>
          Click on any image to learn more about the design process and results.
        </p>
      </section>

      {/* Project Cards Grid */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '40px'
        }}>
          {projects.map((project) => (
            <Link
              key={project.id}
              to={project.link}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block'
              }}
            >
              <div
                className="project-card"
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  border: '1px solid #eee',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                }}
              >
                {/* Project Image */}
                <div style={{
                  width: '100%',
                  height: '240px',
                  backgroundColor: project.color,
                  backgroundImage: project.image ? `url('${project.image}')` : `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.1) 100%)`,
                  backgroundSize: 'cover',
                  backgroundPosition: project.backgroundPosition || 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                  {!project.image && `${project.title} Preview`}
                </div>

                {/* Project Details */}
                <div style={{ padding: '25px' }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    color: '#0a0a0a',
                    marginBottom: project.subtitle ? '5px' : '0',
                    fontWeight: '700'
                  }}>
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p style={{
                      fontSize: '0.95rem',
                      color: '#666',
                      margin: 0
                    }}>
                      {project.subtitle}
                    </p>
                  )}
                  <span style={{
                    display: 'inline-block',
                    marginTop: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#8B5CF6',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    View Project &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;