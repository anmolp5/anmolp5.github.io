import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const Projects = () => {
  const location = useLocation();
  const {
    projectsData,
    updateProjectsData,
    editMode,
    uploadImage,
    updateCoverPhoto
  } = useAdmin();
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const cardFileInputRef = useRef(null);
  const [activeUploadProjectId, setActiveUploadProjectId] = useState(null);

  const projects = (projectsData?.projectsList || []).filter((p) => !p.hidden);

  useEffect(() => {
    // Check if we arrived returning from a specific project
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  const moveProjectCard = (index, direction, e) => {
    e.preventDefault();
    e.stopPropagation();
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= projects.length) return;
    const newProjects = [...projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[newIndex];
    newProjects[newIndex] = temp;
    updateProjectsData((prev) => ({
      ...prev,
      projectsList: newProjects
    }));
  };

  const updateCardField = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    updateProjectsData((prev) => ({
      ...prev,
      projectsList: newProjects
    }));
  };

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Hero Section */}
      <section
        style={{
          height: '40vh',
          background:
            'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.8)), url("/images/projects-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 20px',
          color: '#0a0a0a'
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '10px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-1px'
          }}
        >
          Project Portfolio
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            color: '#555',
            maxWidth: '600px'
          }}
        >
          These projects showcase my work as an engineer so far.
        </p>
      </section>

      {/* Intro Text */}
      <section
        style={{
          maxWidth: '800px',
          margin: '60px auto',
          padding: '0 40px',
          textAlign: 'center'
        }}
      >
        <p
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: '#444'
          }}
        >
          Click on any card to explore the mechanical design, control firmware, and prototyping process.
        </p>
      </section>

      {/* Project Cards Grid */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '40px'
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={project.id}
              onMouseEnter={() => setHoveredCardIndex(index)}
              onMouseLeave={() => setHoveredCardIndex(null)}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Subtle Floating Reorder Pill (Only visible on hover when in Edit Mode) */}
              {editMode && hoveredCardIndex === index && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 10,
                    display: 'flex',
                    gap: '4px',
                    background: 'rgba(15, 23, 42, 0.9)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    padding: '3px 8px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }}
                >
                  <button
                    onClick={(e) => moveProjectCard(index, -1, e)}
                    disabled={index === 0}
                    title="Move Left"
                    style={{
                      background: 'transparent',
                      color: index === 0 ? '#64748B' : '#ffffff',
                      border: 'none',
                      cursor: index === 0 ? 'default' : 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    ◀
                  </button>
                  <span style={{ fontSize: '0.75rem', color: '#A78BFA', lineHeight: '20px' }}>
                    #{index + 1}
                  </span>
                  <button
                    onClick={(e) => moveProjectCard(index, 1, e)}
                    disabled={index === projects.length - 1}
                    title="Move Right"
                    style={{
                      background: 'transparent',
                      color: index === projects.length - 1 ? '#64748B' : '#ffffff',
                      border: 'none',
                      cursor: index === projects.length - 1 ? 'default' : 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    ▶
                  </button>
                </div>
              )}

              <Link
                to={project.link}
                onClick={(e) => {
                  if (editMode) {
                    // In edit mode, allow navigation if clicking outside of editable text,
                    // but prevent navigation if user is clicking to edit title
                    if (document.activeElement?.getAttribute('contenteditable') === 'true') {
                      e.preventDefault();
                    }
                  }
                }}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  flex: '1'
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
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow =
                      '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                  }}
                >
                  {/* Project Image */}
                  {(() => {
                    const coverImage = projectsData?.projectsDetail?.[project.id]?.hero || project.image;
                    return (
                      <div
                        style={{
                          width: '100%',
                          height: '240px',
                          backgroundColor: project.color || '#333',
                          backgroundImage: coverImage
                            ? `url('${coverImage}')`
                            : `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.1) 100%)`,
                          backgroundSize: 'cover',
                          backgroundPosition: project.backgroundPosition || 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                          position: 'relative'
                        }}
                      >
                        {!coverImage && `${project.title} Preview`}

                        {/* Change Cover Button (Edit Mode on Card Hover) */}
                        {editMode && hoveredCardIndex === index && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveUploadProjectId(project.id);
                              cardFileInputRef.current?.click();
                            }}
                            title="Upload a new cover photo for this project"
                            style={{
                              position: 'absolute',
                              bottom: '12px',
                              right: '12px',
                              background: 'rgba(15, 23, 42, 0.88)',
                              backdropFilter: 'blur(8px)',
                              color: '#ffffff',
                              border: '1px solid rgba(255,255,255,0.25)',
                              borderRadius: '16px',
                              padding: '5px 12px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#8B5CF6')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(15, 23, 42, 0.88)')}
                          >
                            📷 Change Cover
                          </button>
                        )}
                      </div>
                    );
                  })()}

                  {/* Project Details */}
                  <div style={{ padding: '25px', flex: '1', display: 'flex', flexDirection: 'column' }}>
                    <h3
                      contentEditable={editMode}
                      suppressContentEditableWarning={true}
                      onClick={(e) => {
                        if (editMode) e.stopPropagation();
                      }}
                      onBlur={(e) => updateCardField(index, 'title', e.currentTarget.innerText.trim())}
                      style={{
                        fontSize: '1.3rem',
                        color: '#0a0a0a',
                        marginBottom: project.subtitle ? '5px' : '0',
                        fontWeight: '700',
                        outline: 'none',
                        cursor: editMode ? 'text' : 'inherit'
                      }}
                    >
                      {project.title}
                    </h3>

                    {project.subtitle && (
                      <p
                        contentEditable={editMode}
                        suppressContentEditableWarning={true}
                        onClick={(e) => {
                          if (editMode) e.stopPropagation();
                        }}
                        onBlur={(e) => updateCardField(index, 'subtitle', e.currentTarget.innerText.trim())}
                        style={{
                          fontSize: '0.95rem',
                          color: '#666',
                          margin: 0,
                          outline: 'none',
                          cursor: editMode ? 'text' : 'inherit'
                        }}
                      >
                        {project.subtitle}
                      </p>
                    )}

                    <div style={{ marginTop: 'auto', paddingTop: '15px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          color: '#8B5CF6',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        View Project &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Hidden file input for uploading project cover from card */}
      <input
        type="file"
        ref={cardFileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file || !activeUploadProjectId) return;
          try {
            const url = await uploadImage(activeUploadProjectId, file);
            updateCoverPhoto(activeUploadProjectId, url);
          } catch (err) {
            alert('Failed to upload cover: ' + err.message);
          } finally {
            setActiveUploadProjectId(null);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
};

export default Projects;