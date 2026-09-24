import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import initialProjectsData from '../data/projects.json';
import initialHomeData from '../data/home.json';
import { ADMIN_CONFIG } from '../adminConfig';

const AdminContext = createContext(null);

const loadInitialProjects = () => {
  try {
    const cached = typeof window !== 'undefined' ? localStorage.getItem('portfolio_projects_data') : null;
    if (cached) {
      const parsed = JSON.parse(cached.replace(/\.mov/gi, '.mp4'));
      if (parsed && parsed.projectsDetail) return parsed;
    }
  } catch (e) {}
  return initialProjectsData;
};

const loadInitialHome = () => {
  try {
    const cached = typeof window !== 'undefined' ? localStorage.getItem('portfolio_home_data') : null;
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.hero) return parsed;
    }
  } catch (e) {}
  return initialHomeData;
};

export const AdminProvider = ({ children }) => {
  const [adminLocked, setAdminLocked] = useState(ADMIN_CONFIG.locked);
  // Hardcoded out for production pushed version as requested
  const editMode = false;
  const setEditMode = () => {};
  const [projectsData, setProjectsDataState] = useState(loadInitialProjects);
  const [homeData, setHomeDataState] = useState(loadInitialHome);
  const [dirty, setDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  // Selected canvas element for click-selection (prevents hover menu from disappearing)
  const [selectedElementId, setSelectedElementId] = useState(null);

  // Undo / Redo History Stacks
  const historyRef = useRef({
    past: [],
    future: []
  });
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const autoSaveTimerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      setIsLocalhost(isLocal);
    }
  }, []);

  // Background Auto-Save to repository disk
  useEffect(() => {
    if (!dirty) return;
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(async () => {
      try {
        await fetch('/api/save-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'projects', data: projectsData })
        });
        await fetch('/api/save-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'home', data: homeData })
        });
        setDirty(false);
      } catch (err) {
        console.warn('Auto-save error:', err);
      }
    }, 1500);

    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [dirty, projectsData, homeData]);

  // Hardcoded out for production pushed version as requested
  const canEdit = false;

  // Push current state to undo history before making a mutation
  const pushHistorySnapshot = useCallback(() => {
    historyRef.current.past.push({
      projects: JSON.parse(JSON.stringify(projectsData)),
      home: JSON.parse(JSON.stringify(homeData))
    });
    // Limit history stack size to 50
    if (historyRef.current.past.length > 50) {
      historyRef.current.past.shift();
    }
    // Clear future redo stack upon new mutation
    historyRef.current.future = [];
    setCanUndo(true);
    setCanRedo(false);
  }, [projectsData, homeData]);

  const updateProjectsData = useCallback(
    (updater) => {
      pushHistorySnapshot();
      setProjectsDataState((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        try {
          localStorage.setItem('portfolio_projects_data', JSON.stringify(next));
        } catch (e) {}
        setDirty(true);
        return next;
      });
    },
    [pushHistorySnapshot]
  );

  const updateHomeData = useCallback(
    (updater) => {
      pushHistorySnapshot();
      setHomeDataState((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        try {
          localStorage.setItem('portfolio_home_data', JSON.stringify(next));
        } catch (e) {}
        setDirty(true);
        return next;
      });
    },
    [pushHistorySnapshot]
  );

  // Undo implementation
  const undo = useCallback(() => {
    if (historyRef.current.past.length === 0) return;
    const previous = historyRef.current.past.pop();
    historyRef.current.future.push({
      projects: JSON.parse(JSON.stringify(projectsData)),
      home: JSON.parse(JSON.stringify(homeData))
    });
    setProjectsDataState(previous.projects);
    setHomeDataState(previous.home);
    setDirty(true);
    setCanUndo(historyRef.current.past.length > 0);
    setCanRedo(true);
    setStatusMessage('Undone');
    setTimeout(() => setStatusMessage(''), 1500);
  }, [projectsData, homeData]);

  // Redo implementation
  const redo = useCallback(() => {
    if (historyRef.current.future.length === 0) return;
    const next = historyRef.current.future.pop();
    historyRef.current.past.push({
      projects: JSON.parse(JSON.stringify(projectsData)),
      home: JSON.parse(JSON.stringify(homeData))
    });
    setProjectsDataState(next.projects);
    setHomeDataState(next.home);
    setDirty(true);
    setCanUndo(true);
    setCanRedo(historyRef.current.future.length > 0);
    setStatusMessage('Redone');
    setTimeout(() => setStatusMessage(''), 1500);
  }, [projectsData, homeData]);

  // Keyboard shortcuts: Cmd+Z, Cmd+Y / Cmd+Shift+Z, Cmd+Shift+E
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (!isCmdOrCtrl) return;

      // Cmd + Shift + E -> Toggle edit mode
      if (e.shiftKey && e.key.toLowerCase() === 'e') {
        if (canEdit) {
          e.preventDefault();
          setEditMode((prev) => !prev);
        }
        return;
      }

      // If in edit mode:
      if (editMode) {
        // Cmd + Shift + Z or Cmd + Y -> Redo
        if ((e.shiftKey && e.key.toLowerCase() === 'z') || e.key.toLowerCase() === 'y') {
          // If focus is inside an input/textarea, let browser handle native input redo
          if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
          e.preventDefault();
          redo();
          return;
        }

        // Cmd + Z -> Undo
        if (!e.shiftKey && e.key.toLowerCase() === 'z') {
          if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
          e.preventDefault();
          undo();
          return;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canEdit, editMode, undo, redo]);

  const saveAll = async () => {
    setSaveStatus('saving');
    setStatusMessage('Saving to repository...');
    try {
      const resProjects = await fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'projects', data: projectsData })
      });
      if (!resProjects.ok) throw new Error('Failed to save projects data');

      const resHome = await fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'home', data: homeData })
      });
      if (!resHome.ok) throw new Error('Failed to save homepage data');

      setDirty(false);
      setSaveStatus('saved');
      setStatusMessage('Changes saved to repository!');
      setTimeout(() => {
        setSaveStatus('idle');
        setStatusMessage('');
      }, 3000);
      return true;
    } catch (err) {
      console.error('Save error:', err);
      setSaveStatus('error');
      setStatusMessage(`Save failed: ${err.message}`);
      setTimeout(() => {
        setSaveStatus('idle');
      }, 4000);
      return false;
    }
  };

  const toggleLock = async () => {
    const newLocked = !adminLocked;
    try {
      await fetch('/api/toggle-lock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locked: newLocked })
      });
      setAdminLocked(newLocked);
      if (newLocked) {
        setEditMode(false);
      }
      alert(newLocked ? 'Admin Mode is now LOCKED.' : 'Admin Mode is now UNLOCKED.');
    } catch (err) {
      alert('Failed to toggle lock status: ' + err.message);
    }
  };

  const uploadImage = async (projectId, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const res = await fetch('/api/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              projectId,
              filename: file.name,
              base64Data: reader.result
            })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Upload failed');

          updateProjectsData((prev) => {
            const project = prev.projectsDetail[projectId];
            if (!project) return prev;
            const updatedImages = [...(project.images || []), { src: data.url, caption: file.name }];
            return {
              ...prev,
              projectsDetail: {
                ...prev.projectsDetail,
                [projectId]: {
                  ...project,
                  images: updatedImages
                }
              }
            };
          });

          resolve(data.url);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const deleteImage = async (projectId, assetSrc) => {
    try {
      await fetch('/api/delete-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: assetSrc })
      });
    } catch (e) {
      console.warn('Delete image backend error:', e);
    }

    updateProjectsData((prev) => {
      const project = prev.projectsDetail[projectId];
      if (!project) return prev;
      const updatedImages = (project.images || []).filter((img) => {
        const src = typeof img === 'string' ? img : img?.src;
        return src !== assetSrc;
      });
      return {
        ...prev,
        projectsDetail: {
          ...prev.projectsDetail,
          [projectId]: {
            ...project,
            images: updatedImages
          }
        }
      };
    });
  };

  const updateCoverPhoto = useCallback((projectId, newHeroUrl) => {
    updateProjectsData((prev) => {
      const project = prev.projectsDetail?.[projectId];
      if (!project) return prev;

      const updatedDetail = {
        ...prev.projectsDetail,
        [projectId]: {
          ...project,
          hero: newHeroUrl
        }
      };

      const updatedProjectsList = (prev.projectsList || []).map((p) => {
        if (p.id === projectId) {
          return { ...p, image: newHeroUrl };
        }
        return p;
      });

      const updatedFeatured = (prev.featuredProjects || []).map((p) => {
        if (p.id === projectId) {
          return { ...p, image: newHeroUrl };
        }
        return p;
      });

      return {
        ...prev,
        projectsList: updatedProjectsList,
        featuredProjects: updatedFeatured,
        projectsDetail: updatedDetail
      };
    });
    setStatusMessage('Cover photo updated');
    setTimeout(() => setStatusMessage(''), 2000);
  }, [updateProjectsData]);

  const updateImageCaption = useCallback((projectId, assetIndexOrSrc, newCaption) => {
    updateProjectsData((prev) => {
      const project = prev.projectsDetail?.[projectId];
      if (!project || !project.images) return prev;

      const updatedImages = project.images.map((img, idx) => {
        const currentSrc = typeof img === 'string' ? img : img?.src;
        const matches = typeof assetIndexOrSrc === 'number' ? idx === assetIndexOrSrc : currentSrc === assetIndexOrSrc;

        if (matches) {
          return {
            src: currentSrc,
            caption: newCaption
          };
        }
        return typeof img === 'string' ? { src: img, caption: '' } : img;
      });

      return {
        ...prev,
        projectsDetail: {
          ...prev.projectsDetail,
          [projectId]: {
            ...project,
            images: updatedImages
          }
        }
      };
    });
    setStatusMessage('Caption saved');
    setTimeout(() => setStatusMessage(''), 1500);
  }, [updateProjectsData]);

  return (
    <AdminContext.Provider
      value={{
        adminLocked,
        isLocalhost,
        canEdit,
        editMode,
        setEditMode,
        projectsData,
        homeData,
        updateProjectsData,
        updateHomeData,
        saveAll,
        dirty,
        saveStatus,
        statusMessage,
        toggleLock,
        uploadImage,
        deleteImage,
        updateCoverPhoto,
        updateImageCaption,
        selectedElementId,
        setSelectedElementId,
        undo,
        redo,
        canUndo,
        canRedo
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
