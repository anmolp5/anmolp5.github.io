import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import GalleryDrawer from '../components/GalleryDrawer';
import { isMediaVideo } from '../utils/media';
import InteractiveCanvasImage from '../components/InteractiveCanvasImage';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const {
    projectsData,
    updateProjectsData,
    editMode,
    uploadImage,
    updateCoverPhoto,
    updateImageCaption
  } = useAdmin();

  const project = projectsData?.projectsDetail?.[projectId];

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cover Photo Picker & Drag State
  const [showCoverPicker, setShowCoverPicker] = useState(false);
  const [isDraggingOverCover, setIsDraggingOverCover] = useState(false);
  const [customCoverUrl, setCustomCoverUrl] = useState('');
  const coverFileInputRef = useRef(null);

  // Document Canvas Drag & Hover State
  const storyCanvasRef = useRef(null);
  const dragIndicatorRef = useRef(null);
  const [hoveredDividerIndex, setHoveredDividerIndex] = useState(null);

  // Track global dragging state to avoid contentEditable text-drag interference
  useEffect(() => {
    const handleDragStart = () => {
      document.body.classList.add('is-canvas-dragging');
    };
    const handleDragEnd = () => {
      document.body.classList.remove('is-canvas-dragging');
      if (dragIndicatorRef.current) {
        dragIndicatorRef.current.style.display = 'none';
      }
    };
    window.addEventListener('dragstart', handleDragStart, true);
    window.addEventListener('dragend', handleDragEnd, true);
    window.addEventListener('drop', handleDragEnd, true);
    return () => {
      window.removeEventListener('dragstart', handleDragStart, true);
      window.removeEventListener('dragend', handleDragEnd, true);
      window.removeEventListener('drop', handleDragEnd, true);
    };
  }, []);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e) => {
      if (!lightboxOpen || !project?.images?.length) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      if (e.key === 'ArrowLeft')
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    },
    [lightboxOpen, project]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  // Normalize project narrative into Unified Document Canvas format (paragraphs + canvasImages)
  const storyData = useMemo(() => {
    if (!project) return { paragraphs: [], canvasImages: [] };

    if (project.story) {
      return {
        paragraphs: Array.isArray(project.story.paragraphs) ? project.story.paragraphs : [],
        canvasImages: Array.isArray(project.story.canvasImages) ? project.story.canvasImages : []
      };
    }

    // Convert legacy contentBlocks to Document Canvas format
    const paragraphs = [];
    const canvasImages = [];
    let imageCounter = 0;

    (project.contentBlocks || []).forEach((block) => {
      if (block.type === 'text') {
        const paras = block.content.split('\n\n').filter(Boolean);
        paras.forEach((p) => paragraphs.push(p.trim()));
      } else if (block.type === 'image-left' || block.type === 'image-right') {
        const paras = (block.text || '').split('\n\n').filter(Boolean);
        // If there's a heading line followed by body text:
        if (paras.length > 1 && paras[0].length < 80 && !paras[0].endsWith('.')) {
          // Push heading first (so it renders at 100% full width above the float)
          paragraphs.push(paras[0].trim());
          // Image belongs to the body text paragraph below the heading
          const paraIndexForThisImage = paragraphs.length;
          for (let i = 1; i < paras.length; i++) {
            paragraphs.push(paras[i].trim());
          }
          canvasImages.push({
            id: `img-${imageCounter++}`,
            src: block.src,
            caption: block.caption || '',
            width: block.width || '35%',
            isLeft: block.type === 'image-left',
            paragraphIndex: paraIndexForThisImage,
            topOffset: 0
          });
        } else {
          const paraIndexForThisImage = paragraphs.length;
          paras.forEach((p) => paragraphs.push(p.trim()));
          canvasImages.push({
            id: `img-${imageCounter++}`,
            src: block.src,
            caption: block.caption || '',
            width: block.width || '35%',
            isLeft: block.type === 'image-left',
            paragraphIndex: paraIndexForThisImage,
            topOffset: 0
          });
        }
      }
    });

    return { paragraphs, canvasImages };
  }, [project]);

  const projectItemInList = projectsData?.projectsList?.find((p) => p.id === projectId);
  const isHidden = projectItemInList?.hidden || project?.hidden || projectId === 'smart-lighting';

  if (!project || isHidden) {
    return <Navigate to="/projects" replace />;
  }

  // --- Updaters ---
  const updateProjectField = (field, value) => {
    updateProjectsData((prev) => ({
      ...prev,
      projectsDetail: {
        ...prev.projectsDetail,
        [projectId]: {
          ...prev.projectsDetail[projectId],
          [field]: value
        }
      }
    }));
  };

  const updateProcessCard = (index, field, value) => {
    const newCards = [...project.processCards];
    newCards[index] = { ...newCards[index], [field]: value };
    updateProjectField('processCards', newCards);
  };

  const updateStory = (newStory) => {
    updateProjectsData((prev) => ({
      ...prev,
      projectsDetail: {
        ...prev.projectsDetail,
        [projectId]: {
          ...prev.projectsDetail[projectId],
          story: newStory
        }
      }
    }));
  };

  const updateParagraph = (index, text) => {
    const newParagraphs = [...(storyData.paragraphs || [])];
    newParagraphs[index] = text;
    updateStory({ ...storyData, paragraphs: newParagraphs });
  };

  const insertParagraphAfter = (index) => {
    const newParagraphs = [...(storyData.paragraphs || [])];
    newParagraphs.splice(index + 1, 0, 'New paragraph here. Click to type directly on canvas.');
    const updatedImages = (storyData.canvasImages || []).map((img) => {
      if (img.paragraphIndex > index) {
        return { ...img, paragraphIndex: img.paragraphIndex + 1 };
      }
      return img;
    });
    updateStory({ paragraphs: newParagraphs, canvasImages: updatedImages });
  };

  const updateCanvasImage = (imageId, updates) => {
    const updatedImages = (storyData.canvasImages || []).map((img) =>
      img.id === imageId ? { ...img, ...updates } : img
    );
    updateStory({ ...storyData, canvasImages: updatedImages });
  };

  const moveImageToParagraph = (imageId, targetParagraphIndex) => {
    const maxIdx = Math.max(0, (storyData.paragraphs?.length || 1) - 1);
    const clamped = Math.max(0, Math.min(targetParagraphIndex, maxIdx));
    updateCanvasImage(imageId, { paragraphIndex: clamped, topOffset: 0 });
  };

  const toggleImageAnchor = (imageId) => {
    const img = (storyData.canvasImages || []).find((i) => i.id === imageId);
    if (!img) return;
    const willAnchor = !img.isAnchored;
    updateCanvasImage(imageId, {
      isAnchored: willAnchor,
      topOffset: 0
    });
  };

  const removeCanvasImage = (imageId) => {
    const updatedImages = (storyData.canvasImages || []).filter((img) => img.id !== imageId);
    updateStory({ ...storyData, canvasImages: updatedImages });
  };

  // Calculate target paragraph from mouse Y on document canvas
  const getDropLocation = (clientY) => {
    if (!storyCanvasRef.current) return { paragraphIndex: 0, relativeY: 0 };
    const canvasRect = storyCanvasRef.current.getBoundingClientRect();
    const mouseY = clientY - canvasRect.top;

    const paraEls = Array.from(storyCanvasRef.current.querySelectorAll('.story-paragraph'));
    if (paraEls.length === 0) {
      return { paragraphIndex: 0, relativeY: Math.max(0, mouseY) };
    }

    let targetIndex = 0;
    let calculatedOffset = 0;
    for (let i = 0; i < paraEls.length; i++) {
      const el = paraEls[i];
      const elRect = el.getBoundingClientRect();
      const paraTop = elRect.top - canvasRect.top;
      const paraBottom = elRect.bottom - canvasRect.top;

      if (mouseY <= paraBottom || i === paraEls.length - 1) {
        targetIndex = i;
        calculatedOffset = Math.max(0, Math.round(mouseY - paraTop));
        break;
      }
    }

    return {
      paragraphIndex: Math.max(0, Math.min(targetIndex, (storyData.paragraphs.length || 1) - 1)),
      topOffset: calculatedOffset,
      relativeY: mouseY
    };
  };

  const handleCanvasDragOver = (e) => {
    if (!editMode) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    if (dragIndicatorRef.current && storyCanvasRef.current) {
      const canvasRect = storyCanvasRef.current.getBoundingClientRect();
      const relativeY = Math.max(0, e.clientY - canvasRect.top);
      dragIndicatorRef.current.style.display = 'block';
      dragIndicatorRef.current.style.top = `${relativeY}px`;
    }
  };

  const handleCanvasDragLeave = (e) => {
    if (storyCanvasRef.current && !storyCanvasRef.current.contains(e.relatedTarget)) {
      if (dragIndicatorRef.current) {
        dragIndicatorRef.current.style.display = 'none';
      }
    }
  };

  const handleDropAtParagraph = async (e, targetParagraphIndex, explicitOffset = null) => {
    if (!editMode) return;
    e.preventDefault();
    e.stopPropagation();
    if (dragIndicatorRef.current) dragIndicatorRef.current.style.display = 'none';
    setHoveredDividerIndex(null);
    document.body.classList.remove('is-canvas-dragging');

    const maxIdx = Math.max(0, (storyData.paragraphs?.length || 1) - 1);
    const clampedIndex = Math.max(0, Math.min(targetParagraphIndex, maxIdx));
    const loc = getDropLocation(e.clientY);
    const resolvedOffset = explicitOffset !== null ? explicitOffset : loc.topOffset;

    // 1. Direct file drop from user's computer (drag from Finder/Explorer onto paragraph)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      for (const file of e.dataTransfer.files) {
        const isImg = file.type.startsWith('image/');
        const isVid = file.type.startsWith('video/') || /\.(mp4|mov|webm|m4v|ogv)$/i.test(file.name);
        if (isImg || isVid) {
          try {
            const uploadedUrl = await uploadImage(projectId, file);
            if (uploadedUrl) {
              const newAsset = {
                id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                src: uploadedUrl,
                caption: file.name,
                width: '35%',
                isLeft: true,
                paragraphIndex: clampedIndex,
                topOffset: resolvedOffset,
                isAnchored: false
              };
              updateStory({
                ...storyData,
                canvasImages: [...(storyData.canvasImages || []), newAsset]
              });
            }
          } catch (err) {
            console.error('File drop upload error:', err);
          }
        }
      }
      return;
    }

    // 2. Retrieve payload from window global backup OR dataTransfer JSON/text
    let dragPayload = window.__portfolioActiveDrag;
    if (!dragPayload) {
      try {
        const jsonText =
          e.dataTransfer.getData('application/json') ||
          e.dataTransfer.getData('text/plain') ||
          e.dataTransfer.getData('text');
        if (jsonText) dragPayload = JSON.parse(jsonText);
      } catch (err) {}
    }

    if (!dragPayload) return;

    if (dragPayload.type === 'move-image') {
      updateCanvasImage(dragPayload.imageId, {
        paragraphIndex: clampedIndex,
        topOffset: resolvedOffset,
        isAnchored: false
      });
      return;
    }

    if (dragPayload.type === 'new-image' || dragPayload.src) {
      const newImage = {
        id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        src: dragPayload.src,
        caption: dragPayload.caption || '',
        width: '35%',
        isLeft: true,
        paragraphIndex: clampedIndex,
        topOffset: resolvedOffset,
        isAnchored: false
      };

      updateStory({
        ...storyData,
        canvasImages: [...(storyData.canvasImages || []), newImage]
      });
    }
  };

  const handleCanvasDrop = (e) => {
    if (!editMode) return;
    const loc = getDropLocation(e.clientY);
    handleDropAtParagraph(e, loc.paragraphIndex, loc.topOffset);
  };

  const handleInsertAsset = (asset) => {
    const targetIdx = Math.max(0, (storyData.paragraphs?.length || 1) - 1);
    const newImage = {
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      src: asset.src,
      caption: asset.caption || '',
      width: '35%',
      isLeft: true,
      paragraphIndex: targetIdx,
      topOffset: 0,
      isAnchored: false
    };

    updateStory({
      ...storyData,
      canvasImages: [...(storyData.canvasImages || []), newImage]
    });
  };

  // Group images by their assigned paragraph index
  const imagesByParagraph = {};
  (storyData.canvasImages || []).forEach((img) => {
    if (!img) return;
    const maxIdx = Math.max(0, (storyData.paragraphs?.length || 1) - 1);
    const pIdx = Math.max(0, Math.min(img.paragraphIndex || 0, maxIdx));
    if (!imagesByParagraph[pIdx]) {
      imagesByParagraph[pIdx] = [];
    }
    imagesByParagraph[pIdx].push(img);
  });

  return (
    <div style={{ paddingBottom: '100px', background: '#f5f5f5' }}>
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          background: '#ffffff',
          paddingBottom: '60px'
        }}
      >
        {/* Hero Section */}
        <section
          onDragOver={(e) => {
            if (editMode) {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
              setIsDraggingOverCover(true);
            }
          }}
          onDragLeave={(e) => {
            if (editMode && !e.currentTarget.contains(e.relatedTarget)) {
              setIsDraggingOverCover(false);
            }
          }}
          onDrop={async (e) => {
            if (!editMode) return;
            e.preventDefault();
            setIsDraggingOverCover(false);

            // Dragged asset from media drawer
            const activeDrag = window.__portfolioActiveDrag;
            if (activeDrag && activeDrag.src) {
              updateCoverPhoto(projectId, activeDrag.src);
              return;
            }

            // Dropped image file from desktop
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              const file = e.dataTransfer.files[0];
              if (file.type.startsWith('image/')) {
                try {
                  const url = await uploadImage(projectId, file);
                  updateCoverPhoto(projectId, url);
                } catch (err) {
                  alert('Failed to upload cover photo: ' + err.message);
                }
              }
            }
          }}
          style={{
            height: '50vh',
            minHeight: '380px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0a0a0a',
            textAlign: 'center',
            padding: '0 20px',
            marginBottom: '40px',
            outline: isDraggingOverCover ? '4px dashed #8B5CF6' : 'none',
            outlineOffset: '-4px',
            transition: 'outline 0.2s ease'
          }}
        >
          {/* Blurred Background */}
          <div
            style={{
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
            }}
          />
          {/* Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.6))`,
              zIndex: 1
            }}
          />

          {/* Drag Overlay Feedback */}
          {isDraggingOverCover && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(139, 92, 246, 0.25)',
                backdropFilter: 'blur(4px)',
                zIndex: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.92)',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                📸 Drop Image to Set as Project Cover Photo
              </div>
            </div>
          )}

          {/* Change Cover Photo Button (Edit Mode) */}
          {editMode && (
            <div style={{ position: 'absolute', top: '20px', right: '24px', zIndex: 20 }}>
              <button
                onClick={() => setShowCoverPicker(true)}
                style={{
                  background: 'rgba(15, 23, 42, 0.88)',
                  backdropFilter: 'blur(10px)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '24px',
                  padding: '8px 16px',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#8B5CF6';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(15, 23, 42, 0.88)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                📷 Change Cover Photo
              </button>
            </div>
          )}

          <div style={{ maxWidth: '900px', position: 'relative', zIndex: 2 }}>
            <Link
              to="/projects"
              state={{ scrollTo: projectId }}
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

            <h1
              contentEditable={editMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => updateProjectField('title', e.currentTarget.innerText.trim())}
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '800',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                marginBottom: '15px',
                letterSpacing: '-1px',
                outline: 'none',
                cursor: editMode ? 'text' : 'inherit'
              }}
            >
              {project.title}
            </h1>

            <p
              contentEditable={editMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => updateProjectField('subtitle', e.currentTarget.innerText.trim())}
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: '#444',
                marginBottom: '20px',
                maxWidth: '700px',
                margin: '0 auto 20px',
                outline: 'none',
                cursor: editMode ? 'text' : 'inherit'
              }}
            >
              {project.subtitle}
            </p>

            <p
              contentEditable={editMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => updateProjectField('date', e.currentTarget.innerText.trim())}
              style={{
                fontSize: '1rem',
                color: '#666',
                fontWeight: '500',
                outline: 'none',
                cursor: editMode ? 'text' : 'inherit'
              }}
            >
              {project.date}
            </p>
          </div>
        </section>

        {/* Tags */}
        <section
          style={{
            maxWidth: '1000px',
            margin: '0 auto 60px',
            padding: '0 40px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
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
        <section
          style={{
            maxWidth: '1400px',
            margin: '0 auto 60px',
            padding: '0 20px'
          }}
        >
          <div
            className="process-cards-grid"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'stretch',
              gap: '20px'
            }}
          >
            {project.processCards.map((card, index) => (
              <React.Fragment key={index}>
                <div
                  className="process-card"
                  style={{
                    background: 'white',
                    padding: '40px 30px',
                    borderRadius: '12px',
                    border: '1px solid #eaeaea',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1 1 0',
                    minWidth: '250px'
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: '700',
                      marginBottom: '15px',
                      color: '#0a0a0a',
                      letterSpacing: '-0.5px'
                    }}
                  >
                    {card.heading}
                  </h3>
                  <p
                    contentEditable={editMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => updateProcessCard(index, 'content', e.currentTarget.innerText.trim())}
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      color: '#444',
                      margin: 0,
                      textAlign: 'left',
                      outline: 'none',
                      cursor: editMode ? 'text' : 'inherit'
                    }}
                  >
                    {card.content}
                  </p>
                </div>

                {index < project.processCards.length - 1 && (
                  <div
                    className="process-arrow"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#e0e0e0',
                      fontSize: '2rem',
                      flexShrink: 0
                    }}
                  >
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* DOCUMENT CANVAS: Continuous Narrative with Native Flow & Space Filling */}
        <section
          style={{
            maxWidth: '1200px',
            margin: '0 auto 80px',
            padding: '0 20px',
            position: 'relative'
          }}
        >
          <div
            ref={storyCanvasRef}
            onDragOver={handleCanvasDragOver}
            onDragLeave={handleCanvasDragLeave}
            onDrop={handleCanvasDrop}
            style={{
              position: 'relative',
              minHeight: '200px',
              padding: editMode ? '10px 0' : '0'
            }}
          >
            {/* Global style preventing contenteditable text interference during drag */}
            <style>{`
              .is-canvas-dragging [contenteditable] {
                user-select: none !important;
                pointer-events: none !important;
              }
            `}</style>

            {/* Live Visual Drag Guideline (Ref-based, zero React re-renders during drag) */}
            <div
              ref={dragIndicatorRef}
              style={{
                display: 'none',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: '#8B5CF6',
                boxShadow: '0 0 10px rgba(139, 92, 246, 0.9)',
                zIndex: 2000,
                pointerEvents: 'none'
              }}
            />

            {storyData.paragraphs.map((paraText, pIdx) => {
              const imagesForThisPara = imagesByParagraph[pIdx] || [];
              const isHead = paraText && paraText.trim().length < 80 && !paraText.trim().endsWith('.') && !paraText.includes('. ');

              return (
                <React.Fragment key={pIdx}>
                  {/* Images slotted at this paragraph:
                      All text above this point renders at 100% full width!
                      The body text beside this wraps around the float cleanly. */}
                  {imagesForThisPara.map((img) => (
                    <InteractiveCanvasImage
                      key={img.id}
                      id={img.id}
                      src={img.src}
                      caption={img.caption}
                      width={img.width || '35%'}
                      isLeft={img.isLeft}
                      paragraphIndex={pIdx}
                      totalParagraphs={storyData.paragraphs.length}
                      topOffset={img.topOffset || 0}
                      isAnchored={Boolean(img.isAnchored)}
                      editMode={editMode}
                      onUpdateWidth={(newW) => updateCanvasImage(img.id, { width: newW })}
                      onToggleFloat={() => updateCanvasImage(img.id, { isLeft: !img.isLeft })}
                      onToggleAnchor={() => toggleImageAnchor(img.id)}
                      onUpdateCaption={(newCap) => updateCanvasImage(img.id, { caption: newCap })}
                      onMoveToParagraph={(targetIdx) => moveImageToParagraph(img.id, targetIdx)}
                      onRemove={() => removeCanvasImage(img.id)}
                    />
                  ))}

                  {/* Section Heading (Always 100% Full Width & Clears Above Floats) OR Body Paragraph */}
                  {isHead ? (
                    <h3
                      data-para-index={pIdx}
                      className="story-paragraph"
                      contentEditable={editMode}
                      suppressContentEditableWarning={true}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          insertParagraphAfter(pIdx);
                        }
                      }}
                      onBlur={(e) => updateParagraph(pIdx, e.currentTarget.innerText.trim())}
                      onDragOver={(e) => {
                        if (!editMode) return;
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'copy';
                        if (dragIndicatorRef.current && storyCanvasRef.current) {
                          const canvasRect = storyCanvasRef.current.getBoundingClientRect();
                          const relativeY = Math.max(0, e.clientY - canvasRect.top);
                          dragIndicatorRef.current.style.display = 'block';
                          dragIndicatorRef.current.style.top = `${relativeY}px`;
                        }
                      }}
                      onDrop={(e) => {
                        const loc = getDropLocation(e.clientY);
                        handleDropAtParagraph(e, pIdx, loc.topOffset);
                      }}
                      style={{
                        clear: 'both',
                        width: '100%',
                        fontSize: '1.65rem',
                        fontWeight: '700',
                        color: '#0a0a0a',
                        letterSpacing: '-0.5px',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        textAlign: 'left',
                        margin: pIdx === 0 ? '0 0 16px 0' : '48px 0 16px 0',
                        outline: 'none',
                        cursor: editMode ? 'text' : 'inherit',
                        borderRadius: '4px',
                        transition: 'background 0.2s'
                      }}
                    >
                      {paraText}
                    </h3>
                  ) : (
                    <p
                      data-para-index={pIdx}
                      className="story-paragraph"
                      contentEditable={editMode}
                      suppressContentEditableWarning={true}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          insertParagraphAfter(pIdx);
                        }
                      }}
                      onBlur={(e) => updateParagraph(pIdx, e.currentTarget.innerText.trim())}
                      onDragOver={(e) => {
                        if (!editMode) return;
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'copy';
                        if (dragIndicatorRef.current && storyCanvasRef.current) {
                          const canvasRect = storyCanvasRef.current.getBoundingClientRect();
                          const relativeY = Math.max(0, e.clientY - canvasRect.top);
                          dragIndicatorRef.current.style.display = 'block';
                          dragIndicatorRef.current.style.top = `${relativeY}px`;
                        }
                      }}
                      onDrop={(e) => {
                        const loc = getDropLocation(e.clientY);
                        handleDropAtParagraph(e, pIdx, loc.topOffset);
                      }}
                      style={{
                        fontSize: '1.25rem',
                        lineHeight: '1.8',
                        color: '#333',
                        textAlign: 'left',
                        margin: '0 0 24px 0',
                        outline: 'none',
                        cursor: editMode ? 'text' : 'inherit',
                        borderRadius: '4px',
                        transition: 'background 0.2s'
                      }}
                    >
                      {paraText}
                    </p>
                  )}

                  {/* Smooth Between-Paragraph Insertion Divider */}
                  {editMode && (
                    <div
                      onMouseEnter={() => setHoveredDividerIndex(pIdx)}
                      onMouseLeave={() => setHoveredDividerIndex(null)}
                      onDragOver={(e) => {
                        if (!editMode) return;
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'copy';
                        setHoveredDividerIndex(pIdx);
                      }}
                      onDrop={(e) => handleDropAtParagraph(e, pIdx + 1, 0)}
                      style={{
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        cursor: 'pointer',
                        margin: '4px 0',
                        zIndex: 10
                      }}
                      onClick={() => insertParagraphAfter(pIdx)}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '2px',
                          background: hoveredDividerIndex === pIdx ? '#8B5CF6' : 'transparent',
                          transition: 'background 0.2s',
                          position: 'relative'
                        }}
                      />
                      {hoveredDividerIndex === pIdx && (
                        <div
                          style={{
                            position: 'absolute',
                            background: '#8B5CF6',
                            color: '#ffffff',
                            borderRadius: '16px',
                            padding: '2px 12px',
                            fontSize: '0.72rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: '0 2px 8px rgba(139, 92, 246, 0.4)',
                            zIndex: 20,
                            pointerEvents: 'none'
                          }}
                        >
                          <span>+ Add Paragraph (or hit Enter)</span>
                        </div>
                      )}
                    </div>
                  )}

                  {!editMode && <div style={{ height: '20px' }} />}
                </React.Fragment>
              );
            })}

            {/* Clear floats at end of story flow */}
            <div style={{ clear: 'both' }} />
          </div>

          {/* Bottom Add Paragraph Button */}
          {editMode && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <button
                onClick={() => insertParagraphAfter(storyData.paragraphs.length - 1)}
                style={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  color: '#7c3aed',
                  border: '1px dashed #8B5CF6',
                  borderRadius: '24px',
                  padding: '8px 20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#8B5CF6';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                  e.currentTarget.style.color = '#7c3aed';
                }}
              >
                <span>➕ Add Paragraph</span>
              </button>
            </div>
          )}
        </section>

        {/* Bottom Image Gallery */}
        {project.images && project.images.length > 0 && (
          <section
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 20px 60px'
            }}
          >
            <h2
              style={{
                fontSize: '1.8rem',
                marginBottom: '30px',
                color: '#0a0a0a',
                borderLeft: '4px solid #8B5CF6',
                paddingLeft: '20px'
              }}
            >
              Visual Documentation &amp; Gallery
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
              }}
            >
              {project.images.map((img, idx) => {
                const src = typeof img === 'string' ? img : (img?.src || '');
                const caption = typeof img === 'string' ? '' : (img?.caption || '');
                const isVid = isMediaVideo(src);

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentImageIndex(idx);
                      setLightboxOpen(true);
                    }}
                    style={{
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: '#ffffff',
                      border: '1px solid #eaeaea',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                    }}
                  >
                    <div style={{ width: '100%', height: '200px', overflow: 'hidden', background: '#0a0a0a', position: 'relative' }}>
                      {isVid ? (
                        <>
                          <video
                            ref={(el) => {
                              if (el) {
                                el.defaultMuted = true;
                                el.muted = true;
                              }
                            }}
                            src={src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '8px',
                              left: '8px',
                              background: 'rgba(15, 23, 42, 0.85)',
                              color: '#38bdf8',
                              fontSize: '0.72rem',
                              fontWeight: 'bold',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            ▶ VIDEO
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            src={src}
                            alt={caption || `Gallery ${idx + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          {/* Cover Photo Badge or Set as Cover Button */}
                          {project.hero === src ? (
                            <div
                              style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                                color: '#ffffff',
                                fontSize: '0.68rem',
                                fontWeight: '700',
                                padding: '3px 8px',
                                borderRadius: '6px',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                zIndex: 5
                              }}
                              title="Current project cover photo"
                            >
                              ★ Cover Photo
                            </div>
                          ) : editMode ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCoverPhoto(projectId, src);
                              }}
                              title="Set this image as project cover photo"
                              style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                background: 'rgba(15, 23, 42, 0.85)',
                                color: '#ffffff',
                                border: '1px solid rgba(255,255,255,0.25)',
                                borderRadius: '6px',
                                padding: '4px 10px',
                                fontSize: '0.68rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                                zIndex: 5
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = '#8B5CF6')}
                              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(15, 23, 42, 0.85)')}
                            >
                              ★ Set as Cover
                            </button>
                          ) : null}
                        </>
                      )}
                    </div>
                    {/* Caption Section */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        padding: '12px 14px',
                        background: editMode ? '#fafafa' : '#ffffff',
                        borderTop: '1px solid #f1f5f9'
                      }}
                    >
                      {editMode ? (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.68rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Caption
                            </span>
                          </div>
                          <input
                            type="text"
                            key={`cap-${idx}-${caption}`}
                            defaultValue={caption}
                            placeholder="Add a caption..."
                            onBlur={(e) => {
                              const val = e.target.value.trim();
                              if (val !== caption) {
                                updateImageCaption(projectId, idx, val);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.currentTarget.blur();
                              }
                            }}
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              fontSize: '0.85rem',
                              color: '#1e293b',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              background: '#ffffff',
                              outline: 'none',
                              boxSizing: 'border-box',
                              fontFamily: 'inherit'
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#8B5CF6')}
                            onBlurCapture={(e) => (e.target.style.borderColor = '#cbd5e1')}
                          />
                        </div>
                      ) : (
                        caption && (
                          <div style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.4' }}>
                            {caption}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && project.images && project.images[currentImageIndex] && (() => {
        const curAsset = project.images[currentImageIndex];
        const curSrc = typeof curAsset === 'string' ? curAsset : (curAsset?.src || '');
        const curCaption = typeof curAsset === 'string' ? '' : (curAsset?.caption || '');
        const isVid = isMediaVideo(curSrc);

        return (
          <div
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.92)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px'
            }}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '30px',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '2.5rem',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
              }}
              style={{
                position: 'absolute',
                left: '30px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#ffffff',
                fontSize: '2rem',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              &#8249;
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '85vw',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {isVid ? (
                <video
                  ref={(el) => {
                    if (el) {
                      el.play?.().catch(() => {});
                    }
                  }}
                  src={curSrc}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '75vh',
                    borderRadius: '8px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
                  }}
                />
              ) : (
                <img
                  src={curSrc}
                  alt="Lightbox asset"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '75vh',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
                  }}
                />
              )}
              {editMode ? (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    marginTop: '16px',
                    width: '100%',
                    maxWidth: '650px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <input
                    type="text"
                    key={`lb-${currentImageIndex}-${curCaption}`}
                    defaultValue={curCaption}
                    placeholder="Add a caption..."
                    onBlur={(e) => {
                      const val = e.target.value.trim();
                      if (val !== curCaption) {
                        updateImageCaption(projectId, currentImageIndex, val);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') e.currentTarget.blur();
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 14px',
                      fontSize: '0.92rem',
                      color: '#ffffff',
                      background: 'rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '8px',
                      outline: 'none',
                      textAlign: 'center',
                      boxSizing: 'border-box'
                    }}
                  />
                  {!isVid && (
                    <button
                      onClick={() => updateCoverPhoto(projectId, curSrc)}
                      style={{
                        background: project.hero === curSrc ? '#8B5CF6' : 'rgba(255,255,255,0.18)',
                        color: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.25)',
                        borderRadius: '6px',
                        padding: '4px 14px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (project.hero !== curSrc) e.currentTarget.style.background = '#8B5CF6';
                      }}
                      onMouseLeave={(e) => {
                        if (project.hero !== curSrc) e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
                      }}
                    >
                      {project.hero === curSrc ? '★ Current Cover Photo' : 'Set as Cover Photo'}
                    </button>
                  )}
                </div>
              ) : (
                curCaption && (
                  <p
                    style={{
                      color: '#ffffff',
                      marginTop: '16px',
                      fontSize: '1rem',
                      textAlign: 'center',
                      maxWidth: '700px'
                    }}
                  >
                    {curCaption}
                  </p>
                )
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
              }}
              style={{
                position: 'absolute',
                right: '30px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#ffffff',
                fontSize: '2rem',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              &#8250;
            </button>
          </div>
        );
      })()}

      {/* Cover Photo Picker Modal */}
      {showCoverPicker && (
        <div
          onClick={() => setShowCoverPicker(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              padding: '28px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '700', color: '#0f172a' }}>
                  Project Cover Photo
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                  Choose an image from the gallery, upload a new photo, or enter a URL.
                </p>
              </div>
              <button
                onClick={() => setShowCoverPicker(false)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569'
                }}
              >
                &times;
              </button>
            </div>

            {/* Current Cover Preview */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>
                CURRENT COVER:
              </div>
              <div
                style={{
                  width: '100%',
                  height: '160px',
                  borderRadius: '10px',
                  backgroundImage: `url('${project.hero}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '2px solid #e2e8f0',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    color: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    maxWidth: '90%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {project.hero}
                </div>
              </div>
            </div>

            {/* Upload Button */}
            <div style={{ marginBottom: '24px' }}>
              <input
                type="file"
                ref={coverFileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const url = await uploadImage(projectId, file);
                    updateCoverPhoto(projectId, url);
                    setShowCoverPicker(false);
                  } catch (err) {
                    alert('Upload failed: ' + err.message);
                  }
                }}
              />
              <button
                onClick={() => coverFileInputRef.current?.click()}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                }}
              >
                📤 Upload New Cover Photo from Computer
              </button>
            </div>

            {/* Select from existing gallery images */}
            {project.images && project.images.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#475569', marginBottom: '10px' }}>
                  CHOOSE FROM PROJECT MEDIA:
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                    gap: '12px',
                    maxHeight: '220px',
                    overflowY: 'auto',
                    padding: '4px'
                  }}
                >
                  {project.images.map((img, idx) => {
                    const src = typeof img === 'string' ? img : (img?.src || '');
                    const isVid = isMediaVideo(src);
                    if (isVid) return null; // Cover photos must be images
                    const isSelected = project.hero === src;

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          updateCoverPhoto(projectId, src);
                          setShowCoverPicker(false);
                        }}
                        style={{
                          height: '80px',
                          borderRadius: '8px',
                          border: isSelected ? '3px solid #8B5CF6' : '1px solid #cbd5e1',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          position: 'relative',
                          boxShadow: isSelected ? '0 0 0 2px #c4b5fd' : 'none',
                          transform: isSelected ? 'scale(1.02)' : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <img
                          src={src}
                          alt={`Option ${idx + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {isSelected && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '4px',
                              right: '4px',
                              background: '#8B5CF6',
                              color: '#fff',
                              borderRadius: '50%',
                              width: '18px',
                              height: '18px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.65rem',
                              fontWeight: 'bold'
                            }}
                          >
                            ✓
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom URL Input */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>
                OR PASTE IMAGE URL:
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="/images/projects/custom-hero.png or https://..."
                  value={customCoverUrl}
                  onChange={(e) => setCustomCoverUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customCoverUrl.trim()) {
                      updateCoverPhoto(projectId, customCoverUrl.trim());
                      setCustomCoverUrl('');
                      setShowCoverPicker(false);
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    fontSize: '0.85rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => {
                    if (customCoverUrl.trim()) {
                      updateCoverPhoto(projectId, customCoverUrl.trim());
                      setCustomCoverUrl('');
                      setShowCoverPicker(false);
                    }
                  }}
                  style={{
                    padding: '9px 16px',
                    background: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Drawer for dragging & adding photos and videos */}
      {editMode && (
        <GalleryDrawer
          projectId={projectId}
          images={project.images}
          onInsertAsset={handleInsertAsset}
        />
      )}
    </div>
  );
};

export default ProjectDetail;