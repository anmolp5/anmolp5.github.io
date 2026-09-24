import React, { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

const InteractiveCanvasImage = ({
  id,
  src,
  caption,
  width = '35%',
  isLeft = true,
  paragraphIndex = 0,
  totalParagraphs = 1,
  topOffset = 0,
  isAnchored = false,
  editMode = false,
  onImageClick,
  onUpdateWidth,
  onToggleFloat,
  onToggleAnchor,
  onUpdateCaption,
  onMoveToParagraph,
  onRemove
}) => {
  const { selectedElementId, setSelectedElementId } = useAdmin();

  const [isHovered, setIsHovered] = useState(false);
  const [isResizingCorner, setIsResizingCorner] = useState(false);

  const containerRef = useRef(null);
  const resizeStartRef = useRef({ startX: 0, startWidth: 35, parentWidth: 800 });
  const hoverTimeoutRef = useRef(null);

  const isSelected = selectedElementId === id;
  const numericWidth = parseInt(width, 10) || 35;
  const isVideo = Boolean(src && typeof src === 'string' && src.match(/\.(mp4|webm|mov|m4v|ogv)($|\?)/i));

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isResizingCorner) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 280);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Click outside to deselect
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isSelected && containerRef.current && !containerRef.current.contains(e.target)) {
        setSelectedElementId(null);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isSelected, setSelectedElementId]);

  // Corner Resizing Handler
  const handleCornerResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizingCorner(true);

    const parentWidth = Math.max(100, containerRef.current?.parentElement?.offsetWidth || window.innerWidth || 800);
    resizeStartRef.current = {
      startX: e.clientX,
      startWidth: numericWidth,
      parentWidth
    };

    let latestPercent = numericWidth;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - resizeStartRef.current.startX;
      const factor = isLeft ? 1 : -1;
      const parentW = Math.max(100, resizeStartRef.current.parentWidth);
      const deltaPercent = (deltaX * factor / parentW) * 100;
      let newPercent = Math.round(resizeStartRef.current.startWidth + deltaPercent);
      if (isNaN(newPercent)) newPercent = resizeStartRef.current.startWidth || 35;
      if (newPercent < 15) newPercent = 15;
      if (newPercent > 100) newPercent = 100;
      latestPercent = newPercent;

      if (containerRef.current) {
        if (newPercent >= 92) {
          containerRef.current.style.width = '100%';
          containerRef.current.style.float = 'none';
          containerRef.current.style.clear = 'both';
          containerRef.current.style.marginRight = '0px';
          containerRef.current.style.marginLeft = '0px';
        } else {
          containerRef.current.style.width = `${newPercent}%`;
          containerRef.current.style.float = isLeft ? 'left' : 'right';
          containerRef.current.style.clear = 'none';
          containerRef.current.style.marginRight = isLeft ? '16px' : '0px';
          containerRef.current.style.marginLeft = isLeft ? '0px' : '16px';
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizingCorner(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      const finalWidth = latestPercent >= 92 ? '100%' : `${latestPercent}%`;
      onUpdateWidth(finalWidth);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const showControls = editMode && (isHovered || isSelected || isResizingCorner);

  return (
    <div
      ref={containerRef}
      className="flexible-img-container"
      draggable={editMode && !isResizingCorner && !isAnchored}
      onDragStart={(e) => {
        if (!editMode || isAnchored) return;
        const payload = {
          type: 'move-image',
          imageId: id
        };
        window.__portfolioActiveDrag = payload;
        try {
          e.dataTransfer.setData('text/plain', JSON.stringify(payload));
          e.dataTransfer.setData('text', JSON.stringify(payload));
        } catch (err) {}
        e.dataTransfer.effectAllowed = 'move';
      }}
      onDragEnd={() => {
        setTimeout(() => {
          window.__portfolioActiveDrag = null;
        }, 2000);
      }}
      onDragOver={(e) => {
        if (editMode) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'copy';
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (editMode) setSelectedElementId(id);
      }}
      style={{
        float: numericWidth >= 92 ? 'none' : (isLeft ? 'left' : 'right'),
        clear: numericWidth >= 92 ? 'both' : 'none',
        display: numericWidth >= 92 ? 'block' : 'inline-block',
        width: numericWidth >= 92 ? '100%' : width,
        minWidth: '160px',
        maxWidth: '100%',
        marginRight: numericWidth >= 92 ? '0' : (isLeft ? '16px' : '0'),
        marginLeft: numericWidth >= 92 ? '0' : (isLeft ? '0' : '16px'),
        marginTop: isAnchored ? '4px' : `${Math.max(4, topOffset || 4)}px`,
        marginBottom: '14px',
        position: 'relative',
        zIndex: editMode ? (isSelected || isHovered ? 100 : 40) : 1,
        userSelect: isResizingCorner ? 'none' : 'auto',
        transition: isResizingCorner ? 'none' : 'width 0.15s ease'
      }}
    >
      {/* Invisible Hover Bridge: covers gap between image top and pill so hover never flickers */}
      {editMode && (
        <div
          style={{
            position: 'absolute',
            top: '-55px',
            left: '-10px',
            right: '-10px',
            height: '60px',
            zIndex: 990,
            pointerEvents: showControls ? 'auto' : 'none'
          }}
        />
      )}

      {/* Floating Controls Pill (High z-index to guarantee it stays above all paragraphs) */}
      {showControls && (
        <div
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'absolute',
            top: '-48px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(15, 23, 42, 0.98)',
            backdropFilter: 'blur(12px)',
            color: '#ffffff',
            padding: '5px 12px',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.75rem',
            fontFamily: 'system-ui, sans-serif',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.15)',
            zIndex: 1000,
            whiteSpace: 'nowrap'
          }}
        >
          {/* Anchor / Freeform Mode Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleAnchor) onToggleAnchor();
            }}
            title={isAnchored ? "Locked to start of paragraph. Click to allow freeform dragging" : "Click to anchor flush to paragraph start"}
            style={{
              background: isAnchored ? 'rgba(139, 92, 246, 0.4)' : 'rgba(255, 255, 255, 0.15)',
              color: isAnchored ? '#c4b5fd' : '#ffffff',
              border: isAnchored ? '1px solid #8b5cf6' : '1px solid transparent',
              borderRadius: '12px',
              padding: '3px 8px',
              cursor: 'pointer',
              fontSize: '0.72rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {isAnchored ? `📌 Anchored (Para ${paragraphIndex + 1})` : `🔓 Freeform (+${topOffset}px)`}
          </button>

          {/* Float Side Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFloat();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '3px 8px',
              cursor: 'pointer',
              fontSize: '0.72rem',
              fontWeight: '500'
            }}
          >
            {isLeft ? 'Float: Left ⟷' : 'Float: Right ⟷'}
          </button>

          {/* Quick Full Width (100%) Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateWidth(numericWidth >= 95 ? '45%' : '100%');
            }}
            title={numericWidth >= 95 ? "Click for normal floating width (45%)" : "Click for 100% full width"}
            style={{
              background: numericWidth >= 95 ? 'rgba(139, 92, 246, 0.45)' : 'rgba(255, 255, 255, 0.15)',
              color: numericWidth >= 95 ? '#c4b5fd' : '#ffffff',
              border: numericWidth >= 95 ? '1px solid #8b5cf6' : 'none',
              borderRadius: '12px',
              padding: '3px 8px',
              cursor: 'pointer',
              fontSize: '0.72rem',
              fontWeight: '600'
            }}
          >
            {numericWidth >= 95 ? '↔ Full Width: ON' : '↔ Full Width'}
          </button>

          {/* Width Display */}
          <span style={{ color: '#A78BFA', fontWeight: 'bold' }}>{width}</span>

          {/* Paragraph Position & Move Up / Down Buttons (Quick hop) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (paragraphIndex > 0) onMoveToParagraph(paragraphIndex - 1);
              }}
              disabled={paragraphIndex <= 0}
              title="Move image to previous paragraph"
              style={{
                background: paragraphIndex > 0 ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                color: paragraphIndex > 0 ? '#ffffff' : '#64748B',
                border: 'none',
                borderRadius: '4px',
                padding: '2px 6px',
                cursor: paragraphIndex > 0 ? 'pointer' : 'default',
                fontSize: '0.68rem',
                fontWeight: 'bold'
              }}
            >
              ▲ Up
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (paragraphIndex < totalParagraphs - 1) onMoveToParagraph(paragraphIndex + 1);
              }}
              disabled={paragraphIndex >= totalParagraphs - 1}
              title="Move image to next paragraph"
              style={{
                background: paragraphIndex < totalParagraphs - 1 ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                color: paragraphIndex < totalParagraphs - 1 ? '#ffffff' : '#64748B',
                border: 'none',
                borderRadius: '4px',
                padding: '2px 6px',
                cursor: paragraphIndex < totalParagraphs - 1 ? 'pointer' : 'default',
                fontSize: '0.68rem',
                fontWeight: 'bold'
              }}
            >
              ▼ Down
            </button>
          </div>

          {/* Remove Image Button */}
          {onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              title="Remove image"
              style={{
                background: 'rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                border: 'none',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem'
              }}
            >
              &times;
            </button>
          )}
        </div>
      )}

      {/* Image Frame */}
      <div
        onClick={(e) => {
          if (!editMode && onImageClick) {
            e.stopPropagation();
            onImageClick(src, caption);
          }
        }}
        style={{
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: isSelected
            ? '0 0 0 3px #8B5CF6, 0 12px 28px rgba(139, 92, 246, 0.3)'
            : editMode && isHovered
            ? '0 0 0 2px #8B5CF6, 0 8px 20px rgba(139, 92, 246, 0.2)'
            : '0 4px 15px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          cursor: editMode ? (isAnchored ? 'default' : 'grab') : 'zoom-in'
        }}
      >
        {isVideo ? (
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
            controls={!editMode}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              pointerEvents: editMode ? 'none' : 'auto'
            }}
          />
        ) : (
          <img
            src={src}
            alt={caption || 'Visual asset'}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Expand Hint on Hover in View Mode */}
        {!editMode && isHovered && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.2)',
              pointerEvents: 'none',
              zIndex: 10
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9"/>
              <polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/>
              <line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
            Click to expand
          </div>
        )}

        {/* Drag Hint on Hover in Edit Mode */}
        {editMode && (isHovered || isSelected) && (
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(15, 23, 42, 0.85)',
              color: '#ffffff',
              padding: '2px 10px',
              borderRadius: '12px',
              fontSize: '0.68rem',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              zIndex: 10
            }}
          >
            {isAnchored ? (
              <span>📌 Anchored (unlock to drag)</span>
            ) : (
              <span>⠿ Drag anywhere vertically</span>
            )}
          </div>
        )}

        {/* Corner Resizing Drag Handle */}
        {editMode && (
          <div
            data-handle="corner"
            onMouseDown={handleCornerResizeStart}
            title="Drag corner to resize image width"
            style={{
              position: 'absolute',
              bottom: '4px',
              right: isLeft ? '4px' : 'auto',
              left: isLeft ? 'auto' : '4px',
              width: '16px',
              height: '16px',
              backgroundColor: '#8B5CF6',
              border: '2px solid #ffffff',
              borderRadius: '4px',
              cursor: isLeft ? 'nwse-resize' : 'nesw-resize',
              boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
              zIndex: 20
            }}
          />
        )}
      </div>

      {/* Caption Directly In-Place Editable */}
      {editMode ? (
        <p
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={(e) => onUpdateCaption(e.currentTarget.innerText.trim())}
          style={{
            fontSize: '0.8rem',
            color: '#666',
            textAlign: 'center',
            marginTop: '10px',
            fontStyle: 'italic',
            lineHeight: '1.4',
            cursor: 'text',
            outline: 'none',
            borderBottom: isHovered || isSelected ? '1px dashed #8B5CF6' : '1px solid transparent'
          }}
        >
          {caption || 'Click to enter caption...'}
        </p>
      ) : (
        caption && (
          <p
            style={{
              fontSize: '0.8rem',
              color: '#666',
              textAlign: 'center',
              marginTop: '12px',
              fontStyle: 'italic',
              lineHeight: '1.4'
            }}
          >
            {caption}
          </p>
        )
      )}
    </div>
  );
};

export default InteractiveCanvasImage;
