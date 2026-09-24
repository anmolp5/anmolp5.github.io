import React from 'react';
import { useAdmin } from '../context/AdminContext';

const AdminBar = () => {
  const {
    canEdit,
    editMode,
    setEditMode,
    dirty,
    saveAll,
    saveStatus,
    statusMessage,
    toggleLock,
    adminLocked,
    undo,
    redo,
    canUndo,
    canRedo
  } = useAdmin();

  if (!canEdit) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.94)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '50px',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.08)',
        color: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '0.85rem'
      }}
    >
      {/* Edit Mode Switch */}
      <button
        onClick={() => setEditMode(!editMode)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: editMode ? '#8B5CF6' : 'rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '20px',
          padding: '8px 16px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '0.85rem',
          transition: 'all 0.2s ease',
          boxShadow: editMode ? '0 0 15px rgba(139, 92, 246, 0.5)' : 'none'
        }}
      >
        <span style={{ fontSize: '1rem' }}>{editMode ? '✏️' : '👁️'}</span>
        <span>{editMode ? 'Edit Mode: ON' : 'Edit Mode: OFF'}</span>
      </button>

      {/* Undo & Redo Buttons */}
      {editMode && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            onClick={undo}
            disabled={!canUndo}
            title="Undo (⌘Z)"
            style={{
              background: canUndo ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
              color: canUndo ? '#ffffff' : '#64748B',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: canUndo ? 'pointer' : 'default',
              fontSize: '1rem',
              transition: 'all 0.15s'
            }}
          >
            ↶
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            title="Redo (⌘Y or ⌘⇧Z)"
            style={{
              background: canRedo ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
              color: canRedo ? '#ffffff' : '#64748B',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: canRedo ? 'pointer' : 'default',
              fontSize: '1rem',
              transition: 'all 0.15s'
            }}
          >
            ↷
          </button>
        </div>
      )}

      {/* Status indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: dirty ? '#F59E0B' : saveStatus === 'saving' ? '#38BDF8' : '#10B981',
            boxShadow: dirty
              ? '0 0 8px #F59E0B'
              : saveStatus === 'saving'
              ? '0 0 8px #38BDF8'
              : '0 0 8px #10B981'
          }}
        />
        <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
          {statusMessage || (dirty ? 'Unsaved changes' : 'All saved')}
        </span>
      </div>

      {/* Save Button */}
      {editMode && (
        <button
          onClick={saveAll}
          disabled={saveStatus === 'saving' || !dirty}
          style={{
            background: dirty ? '#10B981' : 'rgba(255, 255, 255, 0.08)',
            color: dirty ? '#ffffff' : '#64748B',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 18px',
            fontWeight: '600',
            cursor: dirty ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            boxShadow: dirty ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
          }}
        >
          {saveStatus === 'saving' ? 'Saving...' : '💾 Save to Repo'}
        </button>
      )}

      {/* Lock Button */}
      <button
        onClick={toggleLock}
        title="Lock Admin Mode (disables editor)"
        style={{
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#94A3B8',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '0.8rem'
        }}
      >
        🔒
      </button>

      {/* Shortcut hint */}
      <span
        style={{
          fontSize: '0.72rem',
          color: '#64748B',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '4px 8px',
          borderRadius: '6px'
        }}
      >
        ⌘+Shift+E
      </span>
    </div>
  );
};

export default AdminBar;
