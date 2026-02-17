import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const projectData = {
  'small-business-tools': {
    title: 'Small Business Tools',
    subtitle: 'Custom inventory and photography tools for Kanyalndya jewelry business',
    date: 'January 2025',
    tags: ['CAD', 'Manufacturing', 'AI Integration'],
    hero: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80',
    description: `Designed and manufactured a suite of custom inventory tools (sizing gauges, display units) to streamline operations. Conceptualized and built a modular magnetic photobox system, standardizing product photography for e-commerce. Implemented AI-driven workflows, training the business owner on LLMs to automate barcode generation and invoicing.`,
    sections: [
      {
        heading: 'Challenge',
        content: 'Small businesses often struggle with efficient inventory management and consistent product presentation. The manual processes were time-consuming and prone to errors.'
      },
      {
        heading: 'Solution',
        content: 'I developed a set of 3D-printed tools custom-fitted to their products to speed up sizing and sorting. I also designed a magnetic, modular photobox that allows for quick background changes and consistent lighting.'
      },
      {
        heading: 'Results',
        content: 'Inventory processing time was reduced by 40%, and the standardized photography significantly improved the online store aesthetic, leading to increased engagement.'
      }
    ],
    images: [] // Placeholder for now
  },
  'orthotic-repair': {
    title: 'Orthotic Repair',
    subtitle: 'Knee-Ankle-Foot Orthotic optimization for improved comfort',
    date: 'July 2025',
    tags: ['CAD', 'Biomechanics', 'Prototyping'],
    hero: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
    description: `Assessed causes of discomfort in straps and shell geometry around the ankle region of a knee-foot-ankle orthotic. Engineered CAD solutions to redistribute load away from the shin and enhance blood circulation in lower extremities. Fabricated 4 iterative prototypes, adjusting geometric parameters to achieve optimal fit and reduce user fatigue.`,
    sections: [
      {
        heading: 'Problem Analysis',
        content: 'The user experienced significant discomfort and skin irritation due to pressure points in the original orthotic design, particularly around the ankle and shin.'
      },
      {
        heading: 'Design Process',
        content: 'Using 3D scanning and CAD modeling, I analyzed the pressure distribution and designed a modified shell geometry. I iterated through several 3D printed prototypes to test fit and comfort.'
      },
      {
        heading: 'Prototype Testing',
        content: 'The final prototype successfully redistributed pressure, eliminating the pain points and allowing the user to wear the orthotic for extended periods without discomfort.'
      }
    ],
    images: []
  },
  'golf-ball-launcher': {
    title: 'Golf Ball Launcher',
    subtitle: 'Pneumatic golf ball launching system',
    date: 'Spring 2024',
    tags: ['Mechanical Design', 'Pneumatics'],
    hero: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80',
    description: 'Designed and built a pneumatic device capable of launching golf balls at varying distances and angles. This project involved calculating pressure requirements, designing the release mechanism, and safety testing.',
    sections: [],
    images: []
  },
  'sitting-table': {
    title: 'Sitting Table',
    subtitle: 'Ergonomic furniture design project',
    date: 'Fall 2023',
    tags: ['Furniture Design', 'Ergonomics'],
    hero: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80',
    description: 'A custom-designed sitting table focused on ergonomics and minimalist aesthetics. The project explored joinery techniques and material selection to create a durable and stylish piece of furniture.',
    sections: [],
    images: []
  },
  'ftc-robotics': {
    title: 'FTC Robotics',
    subtitle: 'Biobots #14318 - 6 seasons of competitive robotics',
    date: 'August 2019 - February 2025',
    tags: ['Robotics', 'CAD', 'Team Leadership'],
    hero: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80',
    description: `Led a cross-functional team of 7 in design, fabrication, and strategy for 6 consecutive robotics competition seasons. Designed all major robot subsystems in CAD and executed fabrication via 3D printing and CNC machining. Won Motivate, Think, Design, Connect (x2), Inspire Awards; Regional Championship Division Finalist (2024).`,
    sections: [
      {
        heading: 'Team Leadership',
        content: 'As team captain, I managed project timelines, organized outreach events, and mentored younger members in CAD and manufacturing techniques.'
      },
      {
        heading: 'Robot Design',
        content: 'Our robots featured custom-designed drivetrains, intake mechanisms, and lift systems, optimized for reliability and speed during competition matches.'
      },
      {
        heading: 'Competition Highlights',
        content: 'We consistently reached regional championships and won multiple awards for our engineering documentation and community outreach efforts.'
      }
    ],
    images: []
  }
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectData[projectId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '100px 40px', textAlign: 'center' }}>
        <h1 style={{ color: '#0a0a0a', fontSize: '2.5rem', marginBottom: '20px' }}>Project Not Found</h1>
        <Link to="/projects" style={{ color: '#8B5CF6', fontSize: '1.2rem', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Projects</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '100px', background: '#f5f5f5' }}>
      {/* Hero Section */}
      <section style={{
        height: '50vh',
        background: `linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.8)), url('${project.hero}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0a0a0a',
        textAlign: 'center',
        padding: '0 20px',
        marginBottom: '60px'
      }}>
        <div style={{ maxWidth: '900px' }}>
          <Link
            to="/projects"
            style={{
              color: '#555',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '30px',
              display: 'inline-block',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid transparent',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#8B5CF6';
              e.target.style.borderColor = '#8B5CF6';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#555';
              e.target.style.borderColor = 'transparent';
            }}
          >
            ← Back to Projects
          </Link>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            marginBottom: '15px',
            letterSpacing: '-1px'
          }}>
            {project.title}
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: '#444',
            marginBottom: '20px',
            maxWidth: '700px',
            margin: '0 auto 20px'
          }}>
            {project.subtitle}
          </p>
          <p style={{
            fontSize: '1rem',
            color: '#666',
            fontWeight: '500'
          }}>
            {project.date}
          </p>
        </div>
      </section>

      {/* Tags */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto 60px',
        padding: '0 40px',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: '8px 20px',
              background: 'white',
              color: '#0a0a0a',
              borderRadius: '30px',
              fontSize: '0.9rem',
              fontWeight: '600',
              border: '1px solid #ddd',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            {tag}
          </span>
        ))}
      </section>

      {/* Description */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto 80px',
        padding: '0 40px'
      }}>
        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.8',
          color: '#333',
          textAlign: 'justify'
        }}>
          {project.description}
        </p>
      </section>

      {/* Content Sections */}
      {project.sections.map((section, index) => (
        <section
          key={index}
          style={{
            maxWidth: '900px',
            margin: '0 auto 60px',
            padding: '0 40px'
          }}
        >
          <h2 style={{
            fontSize: '1.8rem',
            color: '#0a0a0a',
            marginBottom: '20px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: '700',
            borderLeft: '4px solid #8B5CF6',
            paddingLeft: '15px'
          }}>
            {section.heading}
          </h2>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#444'
          }}>
            {section.content}
          </p>
        </section>
      ))}

      {/* Image Gallery */}
      {/* Shown even if empty for visual structure in this demo, usually would check length */}
      <section style={{
        maxWidth: '1200px',
        margin: '100px auto 0',
        padding: '0 40px'
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: '#0a0a0a',
          marginBottom: '50px',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: '700'
        }}>
          Project Gallery
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {(project.images.length > 0 ? project.images : [1, 2, 3]).map((img, index) => (
            <div
              key={index}
              style={{
                background: '#f0f0f0',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #e0e0e0',
                aspectRatio: '4/3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              [Image Placeholder {index + 1}]
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;