import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';

const projectData = {
  'small-business-tools': {
    title: 'Small Business Tools',
    subtitle: 'Custom inventory and photography tools for Kanyalndya jewelry business',
    date: 'January 2025',
    tags: ['CAD', 'Manufacturing', 'AI Integration'],
    hero: '/images/projects/small-business-tools/1.png',
    processCards: [
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
    contentBlocks: [
      {
        type: 'text',
        content: `I designed and manufactured a comprehensive suite of custom inventory management tools, specifically tailored for the unique challenges faced by the Kanyalndya jewelry business. The primary objective was to drastically streamline day-to-day operations, moving away from inefficient manual processes. Previously, sorting and sizing involved a chaotic, unstructured pile of products, which consistently caused significant delays in order fulfillment and inventory tracking.
        
        By fabricating specialized 3D-printed tools custom-fitted to their exact product dimensions—including precision sizing gauges and slotted organizational display units—we successfully established a rigid system. This physical infrastructure minimized human error and cognitive load, ultimately speeding up the sizing and sorting workflow by over 40%, directly impacting the business's bottom line.`
      },
      {
        type: 'text',
        content: `Furthermore, I conceptualized and engineered a highly modular, magnetic photobox system designed to standardize product photography for their e-commerce platform. High-quality, consistent photos are absolutely critical for online jewelry sales to build customer trust. However, setting up the lighting and composition daily was an enormous time sink for the owner. 
        
        The innovative magnetic wall design of the photobox allows for rapid background and texture changes while maintaining perfectly consistent, diffused lighting across entirely different batches of products, ensuring a unified aesthetic across their entire catalog.`
      },
      {
        type: 'image-left',
        src: '/images/projects/small-business-tools/2.png',
        caption: '[Insert placeholder caption here]',
        text: `To construct a holistic business transformation, the physical tools were augmented by digital automation. I implemented AI-driven workflows by personally training the business owner on leveraging several Large Language Models (LLMs) to automate their repetitive administrative tasks. 
        
        This digital overhaul included systems for generating standardized barcodes on the fly and creating automated, professional phrasing for client invoicing and communications. By seamlessly combining physical manufacturing solutions with cutting-edge digital AI optimizations, this small business was empowered to substantially scale their throughput and professional appearance without the need to increase their headcount.`
      },
      {
        type: 'image-right',
        src: '/images/projects/small-business-tools/3.png',
        caption: '[Insert placeholder caption here]',
        text: `The magnetic photobox system proved to be an invaluable asset for consistent branding. Prior to its implementation, lighting setups were ad-hoc, leading to varying shadow lengths and color temperatures that degraded the professional appearance of the online storefront.`
      }
    ],
    images: [
      '/images/projects/small-business-tools/1.png',
      '/images/projects/small-business-tools/5.jpg',
      '/images/projects/small-business-tools/6.jpg',
      '/images/projects/small-business-tools/7.jpg'
    ]
  },
  'orthotic-repair': {
    title: 'Orthotic Repair',
    subtitle: 'Knee-Ankle-Foot Orthotic optimization for improved comfort',
    date: 'July 2025',
    tags: ['CAD', 'Biomechanics', 'Prototyping'],
    hero: '/images/projects/orthotic-repair/1.jpg',
    processCards: [
      {
        heading: 'Challenge',
        content: 'The user experienced significant discomfort and skin irritation due to pressure points in the original orthotic design, particularly around the ankle and shin.'
      },
      {
        heading: 'Solution',
        content: 'Using 3D scanning and CAD modeling, I analyzed the pressure distribution and designed a modified shell geometry. I iterated through several 3D printed prototypes to test fit and comfort.'
      },
      {
        heading: 'Results',
        content: 'The final prototype successfully redistributed pressure, eliminating the pain points and allowing the user to wear the orthotic for extended periods without discomfort.'
      }
    ],
    contentBlocks: [
      {
        type: 'text',
        content: `Knee-Ankle-Foot Orthotics (KAFOs) are highly critical mobility aids designed to stabilize the lower extremities, but their rigid, unyielding nature often leads to severe discomfort over extended periods of continuous use. In this comprehensive biomechanical project, I meticulously assessed the root causes of patient discomfort, focusing heavily on both the securing strap systems and the complex posterior shell geometry enveloping the ankle and calf regions.
        
        The primary issue identified during patient evaluation was the presence of distinct, localized pressure points. These high-pressure areas were causing restricted blood flow and significant skin irritation, particularly focused on the anterior shin during the dynamic swing phase of the gait cycle.`
      },
      {
        type: 'text',
        content: `To address these complex anatomical challenges, I employed advanced 3D scanning technologies to capture a highly accurate, millimeter-precise mesh representation of the user's lower extremity. This precise digital twin was then imported into specialized CAD environments for rigorous analysis. From this baseline, I engineered several novel geometric solutions specifically aimed at redistributing the mechanical load away from the highly sensitive anterior tissue. 
        
        The new design paradigm strategically widened the overall contact area where clinically appropriate and introduced specialized, drafted pressure-relief channels to eliminate focal stress concentrations.`
      },
      {
        type: 'image-left',
        src: '/images/projects/orthotic-repair/2.jpg',
        caption: '[Insert placeholder caption here]',
        text: `The physical translation of the digital design involved the fabrication of 4 distinct, iterative working prototypes using advanced 3D printing techniques. Following the fabrication of each iteration, the user actively tested the orthotic device on a treadmill under controlled conditions, providing detailed subjective comfort scores and mapping areas of kinetic fatigue.`
      },
      {
        type: 'image-right',
        src: '/images/projects/orthotic-repair/3.jpg',
        caption: '[Insert placeholder caption here]',
        text: `By systematically and analytically adjusting the geometric parameters based on this feedback—specifically dialing in the exact flare angle of the calf band and tuning the flexural rigidity of the ankle joint module—we successfully achieved a biomechanically optimal fit. This final, refined prototype completely eliminated the acute shin pain points, remarkably allowing the user to wear the KAFO device for a full, active workday entirely free from the debilitating fatigue they had previously experienced.`
      }
    ],
    images: [
      '/images/projects/orthotic-repair/4.jpg',
      '/images/projects/orthotic-repair/5.jpg'
    ]
  },
  'golf-ball-launcher': {
    title: 'Golf Ball Launcher',
    subtitle: 'Precision flywheel golf ball launching system',
    date: 'Spring 2024',
    tags: ['Mechanical Design', 'Mechatronics', 'Control Systems'],
    hero: '/images/projects/golf-ball-launcher/hero.png',
    processCards: [
      { heading: 'Challenge', content: 'For a comprehensive school engineering project, we were tasked with designing a device to reliably launch a golf ball to hit an 8-inch target situated 2 meters away and 1 meter high, twice in a row.' },
      { heading: 'Solution', content: 'We engineered a custom dual-flywheel pitching mechanism. To achieve the required precision, we integrated an IMU within our motor controller to actively dial in the launch angle and utilized a CAD-mounted laser sight to calibrate our real-world trajectory.' },
      { heading: 'Results', content: 'The system offered unparalleled repeatability. The motor control code allowed for rapid tuning, resulting in our team hitting the tiny target 25 consecutive times—the only group in the class to achieve such flawless accuracy.' }
    ],
    contentBlocks: [
      {
        type: 'text',
        content: `As part of a rigorous academic engineering capstone, our team was presented with a strict mechanical design and controls challenge: engineer a system capable of accurately launching a standard golf ball to repeatedly strike an 8-inch physical target located exactly 2 meters horizontally away and elevated 1 meter off the ground. The strict criteria dictated that the system must hit the target at least twice consecutively, requiring extremely high precision and repeatability over brute force.
        
        To solve this, we explicitly avoided unpredictable pneumatic systems and instead designed a highly tunable, dual-flywheel pitching mechanism. The core advantage of a flywheel system is that the energy transferred to the projectile is dictated entirely by the rotational velocity of the wheels, which can be precisely governed by closed-loop motor control code rather than fluctuating air pressure.`
      },
      {
        type: 'image-left',
        src: '/images/projects/golf-ball-launcher/1.jpg',
        caption: '[Insert placeholder caption here]',
        text: `Achieving the desired velocity was only half the equation; angular precision was paramount. We integrated an Inertial Measurement Unit (IMU) deeply into our custom motor controller architecture. This allowed us to actively monitor and strictly dial in the exact pitch angle of the launcher barrel before every single shot, eliminating human error in setup. 
        
        Furthermore, we designed and 3D-printed a specialized mounting bracket to securely attach a continuous laser sight strictly parallel to the launch vector. This allowed us to visually calibrate and anchor our mathematical trajectory models against the physical target in real-world space. Ultimately, this combination of mechanical stability and intelligent mechatronic control resulted in our system hitting the 8-inch target an incredible 25 times in a row, making us the only team in the entire class to achieve such a flawless performance record.`
      }
    ],
    images: [
      '/images/projects/golf-ball-launcher/1.jpg',
      '/images/projects/golf-ball-launcher/2.jpg',
      '/images/projects/golf-ball-launcher/3.jpg',
      '/images/projects/golf-ball-launcher/4.jpg',
      '/images/projects/golf-ball-launcher/5.png',
      '/images/projects/golf-ball-launcher/6.png'
    ]
  },
  'sitting-table': {
    title: 'Sitting Table',
    subtitle: 'Ergonomic furniture design project',
    date: 'Fall 2023',
    tags: ['Furniture Design', 'Ergonomics'],
    hero: '/images/projects/sitting-table/hero.jpg',
    processCards: [
      { heading: 'Challenge', content: 'Create a highly durable, low-profile table suitable for floor-sitting that matches modern minimalist aesthetics.' },
      { heading: 'Solution', content: 'Built from solid wood with precision joinery, this table features a seamless finish and a sturdy construction designed to last for generations.' },
      { heading: 'Results', content: 'A strong, dimensionally stable sitting table that supports ergonomic posture.' }
    ],
    contentBlocks: [
      {
        type: 'text',
        content: `This project represents a deep exploration into custom-designed functional furniture, specifically focused on the intersection of human ergonomics, long-term posture correction, and serene, minimalist aesthetics. Working primarily from a floor-seated position requires a highly specific interplay between surface height and knee clearance to naturally maintain a neutral spine and prevent long-term musculoskeletal fatigue. 
        
        To achieve both structural integrity and a clean, uninterrupted visual flow, this project deliberately eschewed modern hardware. Instead, it involved rigorous research and practical application of complex traditional Japanese joinery techniques, aiming to completely eliminate the need for metal fasteners, screws, or nails.`
      },
      {
        type: 'image-left',
        src: '/images/projects/sitting-table/1.jpg',
        caption: '[Insert placeholder caption here]',
        text: `The structural integrity of the table relies entirely on the precision of the interlocking geometric joints, utilizing only tight mechanical friction and high-strength wood glue to create a monolithic, incredibly sturdy form. The material selection process was subsequently exhaustive, requiring numerous tests of different wood species. We ultimately landed on a highly specific hardwood species globally renowned for its exceptional dimensional stability, sheer density, and profound resistance to seasonal warping over decades of use. 
        
        The final finishing process involved meticulous hand-sanding followed by the application of a bespoke, hand-rubbed natural oil blend. This painstaking finish deeply penetrates and protects the surface from daily wear and spills while beautifully maintaining the tactile warmth, matte texture, and intricate visual character of the natural wood grain. The final result is a highly durable, functionally optimal piece of architectural furniture that naturally and elegantly integrates into a modern, conscious living space.`
      }
    ],
    images: [
      '/images/projects/sitting-table/1.jpg',
      '/images/projects/sitting-table/2.jpg'
    ]
  },
  'ftc-robotics': {
    title: 'FTC Robotics',
    subtitle: 'Biobots #14318 - 6 seasons of competitive robotics',
    date: 'August 2019 - February 2025',
    tags: ['Robotics', 'CAD', 'Team Leadership'],
    hero: '/images/projects/ftc-robotics/hero.jpg',
    processCards: [
      { heading: 'Challenge', content: 'Design and fabricate a new competitive robot annually to meet constantly changing competition objectives.' },
      { heading: 'Solution', content: 'Our robots featured custom-designed drivetrains, intake mechanisms, and lift systems, optimized for reliability and speed during competition matches. As team captain, I managed project timelines and mentored younger members in CAD.' },
      { heading: 'Results', content: 'We consistently reached regional championships and won multiple awards for our engineering documentation and community outreach efforts.' }
    ],
    contentBlocks: [
      {
        type: 'image-left',
        src: '/images/projects/ftc-robotics/cropped_2_zoomed.jpg',
        caption: 'Our 2025 Competition Robot',
        width: '25%',
        maxWidth: '300px',
        text: `For six consecutive, highly intensive academic seasons, I proudly served as a core mechanical design engineer and ultimately rose to the position of Hardware Captain and Lead Strategist for FIRST Tech Challenge (FTC) Team #14318, the Biobots.

Our team won the Motivate, Think, Design, Connect (x2), Inspire Awards. We were also NorCal Regional Championship Division Finalists in (2024).

In this leadership role, I was directly responsible for leading a cross-functional, highly motivated team of seven high school students through the entirety of the grueling, professional-grade engineering design process. This extensive process ranged from the initial, critical analysis of the complex yearly game strategy to the creation of highly detailed full-robot CAD assemblies, and finally culminating in the precise physical manufacturing and assembly of the competition hardware. Due to the nature of FIRST competitions, every single season mandated the conceptualization and execution of a completely new robotic architecture in order to successfully solve the unique physical hurdles and scoring mechanisms presented that year.`
      },
      {
        type: 'image-right',
        src: '/images/projects/ftc-robotics/7.png',
        caption: 'Our Full Robot in CAD',
        align: 'flex-end',
        text: `As Hardware Captain, I was primarily responsible for dictating the overall technical direction and systems architecture. Each competitive season inevitably involved navigating multiple, highly stressful full-system redesigns under extremely tight deadlines. Rather than relying on mere intuition or trial-and-error, I implemented a rigorous, iterative approach to our engineering. This disciplined approach allowed the team to strongly prioritize absolute hardware reliability under the intense, physical constraints of a chaotic 2.5-minute competition match, directly leading to our sustained success on the field.`
      },
      {
        type: 'image-left',
        src: '/images/projects/ftc-robotics/cropped_5_25.jpg',
        caption: 'Me acting as a driver coach in a regional match',
        align: 'flex-start',
        text: `During competitions, I played the role of Player Coach. I was familiar with every detail of the rule book and our driver strategies. I kept a clip board with a blank map of the season’s mat and a dry erase marker to be able to work with our alliance members to create efficient pathing in order to maximize scoring output.

Through my extensive tenure in competitive robotics, I rapidly developed a remarkably robust foundation in advanced 3D CAD modeling (utilizing both Onshape and Fusion360), rapid physical prototyping methodologies, and the crucial principles of Design for Manufacturability (DFM). I heavily utilized and managed modern manufacturing techniques, specifically operating 3D printers and CNC routers for the rapid production of highly customized, lightweight structural components. Furthermore, beyond the strictly technical engineering skills acquired, this experience was instrumental in honing my leadership capabilities. I expertly managed complex team coordination, strategically delegated nuanced tasks across the distinct software and hardware sub-teams, and rigorously ensured that our completed physical robotic hardware flawlessly and reliably integrated with the advanced autonomous control algorithms written by our programming division.`
      }
    ],
    images: [
      '/images/projects/ftc-robotics/7.png',
      '/images/projects/ftc-robotics/2.jpg',
      '/images/projects/ftc-robotics/3.jpg',
      '/images/projects/ftc-robotics/4.jpg',
      '/images/projects/ftc-robotics/5.jpg',
      '/images/projects/ftc-robotics/6.jpg'
    ]
  }
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectData[projectId];

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback((e) => {
    if (!lightboxOpen || !project?.images?.length) return;

    if (e.key === 'Escape') setLightboxOpen(false);
    if (e.key === 'ArrowRight') setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    if (e.key === 'ArrowLeft') setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  }, [lightboxOpen, project]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [lightboxOpen]);

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
      <div style={{
        marginTop: '100px',
        width: '100%',
        minHeight: '100vh',
        background: '#ffffff',
        paddingTop: '0',
        paddingBottom: '60px'
      }}>
        {/* Hero Section */}
        <section style={{
          height: '50vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0a0a0a',
          textAlign: 'center',
          padding: '0 20px',
          marginBottom: '40px' /* Reduced from 60px */
        }}>
          {/* Blurred Background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url('${project.hero}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(12px)',
            transform: 'scale(1.1)',
            zIndex: 0
          }} />
          {/* Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.6))`,
            zIndex: 1
          }} />

          <div style={{ maxWidth: '900px', position: 'relative', zIndex: 2 }}>
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

        {/* Process Cards (Challenge -> Solution -> Results) */}
        <section style={{
          maxWidth: '1400px',
          margin: '0 auto 60px',
          padding: '0 20px'
        }}>
          <div className="process-cards-grid" style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: '20px'
          }}>
            {project.processCards.map((card, index) => (
              <React.Fragment key={index}>
                <div className="process-card" style={{
                  background: 'white',
                  padding: '40px 30px',
                  borderRadius: '12px',
                  border: '1px solid #eaeaea',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  flex: '1',
                  minWidth: 0
                }}>
                  <div style={{
                    display: 'inline-block',
                    background: 'rgba(139, 92, 246, 0.1)',
                    color: '#8B5CF6',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '20px',
                    alignSelf: 'flex-start'
                  }}>
                    {card.heading}
                  </div>
                  <p style={{
                    fontSize: '1.05rem',
                    lineHeight: '1.7',
                    color: '#444',
                    margin: 0
                  }}>
                    {card.content}
                  </p>
                </div>
                {/* Optional: Add an arrow between items on Desktop (hidden via CSS on mobile later) */}
                {index < project.processCards.length - 1 && (
                  <div className="process-arrow" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#e0e0e0',
                    fontSize: '2rem',
                    flexShrink: 0
                  }}>
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Flexible Content Blocks */}
        <section style={{
          maxWidth: '1200px', // Restored
          margin: '0 auto 80px',
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px' // Restored
        }}>
          {project.contentBlocks.map((block, index) => {
            switch (block.type) {
              case 'text':
                return (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {block.content.split('\n\n').map((para, i) => (
                      <p key={i} style={{
                        fontSize: '1.25rem',
                        lineHeight: '1.8',
                        color: '#333',
                        textAlign: 'left',
                        margin: 0
                      }}>
                        {para.trim()}
                      </p>
                    ))}
                  </div>
                );
              case 'image-left':
              case 'image-right':
                const isLeft = block.type === 'image-left';
                return (
                  <div key={index} className="flexible-image-wrap" style={{
                    display: 'block',
                    margin: '0'
                  }}>
                    <div className="flexible-img-container" style={{
                      float: isLeft ? 'left' : 'right',
                      width: block.width || '30%',
                      minWidth: '200px',
                      maxWidth: block.maxWidth || '350px',
                      marginRight: isLeft ? '40px' : '0',
                      marginLeft: isLeft ? '0' : '40px',
                      marginBottom: '20px'
                    }}>
                      <img src={block.src} alt="Project context" style={{
                        width: '100%',
                        borderRadius: '8px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        display: 'block'
                      }} />
                      {block.caption && (
                        <p style={{
                          fontSize: '0.8rem',
                          color: '#666',
                          textAlign: 'center',
                          marginTop: '12px',
                          fontStyle: 'italic',
                          lineHeight: '1.4'
                        }}>
                          {block.caption}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'block' }}>
                      {block.text.split('\n\n').map((para, i) => (
                        <p key={i} style={{
                          fontSize: '1.25rem',
                          lineHeight: '1.8',
                          color: '#333',
                          textAlign: 'left',
                          margin: '0 0 16px 0'
                        }}>
                          {para.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              case 'image-row':
                return (
                  <div key={index} className="flexible-image-row" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Reduced minmax for smaller images
                    gap: '20px',
                    margin: '30px 0'
                  }}>
                    {block.images.map((src, idx) => (
                      <div key={idx} style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        background: '#f0f0f0',
                        border: '1px solid #eaeaea',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                      }}>
                        <img src={src} alt={`Detail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                    ))}
                  </div>
                );
              default:
                return null;
            }
          })}
        </section>

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <section style={{
            maxWidth: '1400px',
            margin: '60px auto 0',
            padding: '0 20px'
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
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '30px'
            }}>
              {project.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setLightboxOpen(true);
                  }}
                  style={{
                    background: '#f0f0f0',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #eaeaea',
                    aspectRatio: '4/3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {typeof img === 'string' ? (
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ color: '#888', fontWeight: '500' }}>[Placeholder {index + 1}]</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lightbox Overlay */}
        {lightboxOpen && project?.images?.length > 0 && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(10px)',
              zIndex: 99999, // Ensure it's above Navigation (10000)
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              style={{
                position: 'fixed',
                top: '30px',
                right: '40px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100000,
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(5px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = 'black';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Previous Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
              }}
              style={{
                position: 'absolute',
                left: '40px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '3rem',
                fontWeight: '300',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100000,
                transition: 'transform 0.2s',
                opacity: 0.7
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.1) translateX(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.7';
                e.currentTarget.style.transform = 'scale(1) translateX(0)';
              }}
              aria-label="Previous"
            >
              ‹
            </button>

            {/* Displayed Image */}
            <img
              src={project.images[currentImageIndex]}
              alt="Expanded Gallery Image"
              style={{
                maxWidth: '85vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                userSelect: 'none'
              }}
              onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing lightbox
            />

            {/* Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
              }}
              style={{
                position: 'absolute',
                right: '40px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '3rem',
                fontWeight: '300',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100000,
                transition: 'transform 0.2s',
                opacity: 0.7
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.1) translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.7';
                e.currentTarget.style.transform = 'scale(1) translateX(0)';
              }}
              aria-label="Next"
            >
              ›
            </button>

            {/* Image Counter */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '500',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </div>
        )}

        {/* Responsive Styles Overlay */}
        <style>{`
        @media (max-width: 900px) {
          .process-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .process-arrow {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .flexible-image-wrap {
            display: block !important;
          }
          .flexible-img-container {
            float: none !important;
            width: 80% !important;
            max-width: 400px !important;
            margin: 0 auto 20px auto !important;
          }
          .flexible-image-wrap p {
            width: 100% !important;
          }
        }
      `}</style>
      </div>
    </div>
  );
};

export default ProjectDetail;