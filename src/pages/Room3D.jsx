import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { Experience, scenes } from "../Experience";
import * as THREE from "three";

import LaptopInterface from '../components/LaptopInterface';

const SceneOverlay = ({ activeIndex, scrollScroll }) => {
  const currentScene = scenes[activeIndex || 0];
  const [title, desc] = currentScene.label.split("\n");
  const isMobileTop = currentScene.mobileTop || false;

  const handleScroll = (direction) => {
    if (!scrollScroll) return;
    const total = scenes.length - 1;
    let next = activeIndex + direction;
    if (next < 0) next = 0;
    if (next > total) next = total;

    const targetOffset = next / total;
    const el = scrollScroll;
    const targetTop = targetOffset * (el.scrollHeight - el.clientHeight);
    el.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  return (
    <>
      <div
        className={`scene-overlay ${isMobileTop ? "mobile-top" : ""}`}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "15px", marginBottom: "10px" }}>
          <h1 style={{ margin: 0, fontSize: "clamp(20px, 4vw, 24px)", fontWeight: "700", color: "#8B5CF6", lineHeight: "1.2" }}>
            {title}
          </h1>

          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            <button
              onClick={() => handleScroll(-1)}
              disabled={activeIndex === 0}
              className="nav-btn"
              aria-label="Previous"
            >
              <span style={{ fontSize: "18px", lineHeight: "1", paddingBottom: "3px", marginLeft: "3px" }}>❮</span>
            </button>
            <button
              onClick={() => handleScroll(1)}
              disabled={activeIndex === scenes.length - 1}
              className="nav-btn"
              aria-label="Next"
            >
              <span style={{ fontSize: "18px", lineHeight: "1", paddingBottom: "3px", marginLeft: "3px" }}>❯</span>
            </button>
          </div>
        </div>

        <p style={{ margin: 0, fontSize: "clamp(13px, 3vw, 15px)", lineHeight: "1.5", color: "#666" }}>
          {desc}
        </p>
      </div>

      <style>{`
        .scene-overlay {
          position: fixed;
          bottom: 40px;
          left: 40px;
          width: 380px;
          max-width: calc(100% - 40px);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 16px;
          padding: 25px;
          color: #1a1a1a;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .nav-btn {
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
          color: #1a1a1a;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          padding: 0; /* Override global button padding */
        }

        .nav-btn:hover:not(:disabled) {
          background: #8B5CF6;
          color: white;
          border-color: #8B5CF6;
        }

        .nav-btn:disabled {
          opacity: 0.3;
          cursor: default;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .scene-overlay {
            width: auto;
            left: 20px;
            right: 20px;
            bottom: 30px;
            padding: 16px 20px;
            border-radius: 12px;
          }

          .mobile-top {
            bottom: auto !important;
            top: 100px !important;
          }
        }
      `}</style>
    </>
  );
};



const Room3D = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollElement, setScrollElement] = useState(null);

  // Loading Timer
  useEffect(() => {
    // Hide loading screen after model loads
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!scrollElement) return;

      const total = scenes.length - 1;
      const current = activeIndex;
      let next = current;

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        next = current - 1;
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        next = current + 1;
      }

      if (next < 0) next = 0;
      if (next > total) next = total;

      if (next !== current) {
        const targetOffset = next / total;
        const el = scrollElement;
        const targetTop = targetOffset * (el.scrollHeight - el.clientHeight);
        el.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollElement]);

  const handleScroll = (direction) => {
    if (!scrollElement) return;
    const total = scenes.length - 1;
    let next = activeIndex + direction;
    if (next < 0) next = 0;
    if (next > total) next = total;

    const targetOffset = next / total;
    const el = scrollElement;
    const targetTop = targetOffset * (el.scrollHeight - el.clientHeight);
    el.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: '#666666' }}>
      {/* THREE.JS CANVAS */}
      <Canvas
        camera={{ position: [1.86, -0.34, 4.91], fov: 35 }}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8,
          outputColorSpace: THREE.SRGBColorSpace
        }}
      >
        <Suspense fallback={null}>
          <Experience onIndexChange={setActiveIndex} setScrollElement={setScrollElement} activeIndex={activeIndex} />
        </Suspense>
      </Canvas>

      {/* OVERLAY */}
      {!isLoading && activeIndex !== 12 && <SceneOverlay activeIndex={activeIndex} scrollScroll={scrollElement} />}



      {/* LAPTOP INTERFACE OVERLAY */}
      {/* Show ONLY when activeIndex is 12 (Parts List) */}
      {!isLoading && activeIndex === 12 && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 50, // Between canvas and top-level UI
          pointerEvents: 'none' // Allow clicks to pass through to canvas if needed, but the interface itself will catch them
        }}>
          <div style={{ pointerEvents: 'auto' }}>
            <LaptopInterface
              scenes={scenes}
              onClose={() => handleScroll(-1)} // Go back one keyframe
            />
          </div>
        </div>
      )}

      {/* BACK BUTTON (Always show) */}
      {!isLoading && (
        <a
          href="/projects"
          className="back-btn"
          style={{
            position: 'fixed',
            top: '40px',
            left: '40px',
            zIndex: 10000,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#1a1a1a',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '12px 24px',
            borderRadius: '30px',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#8B5CF6'; // Lavender
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.borderColor = '#8B5CF6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.color = '#1a1a1a';
            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.05)';
          }}
        >
          <span>←</span> Back to Projects
        </a>
      )}

      {/* LOADING OVERLAY */}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#666666",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
            animation: "fadeOut 0.5s ease 1.5s forwards"
          }}
        >
          <div style={{
            textAlign: "center",
            color: "#e0e0e0",
            fontFamily: "system-ui, -apple-system, sans-serif"
          }}>
            <div style={{
              width: "60px",
              height: "60px",
              border: "4px solid rgba(139, 92, 246, 0.2)",
              borderTop: "4px solid #8B5CF6", // Lavender
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px"
            }} />
            <p style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#8B5CF6",
              margin: 0
            }}>Loading 3D Model...</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeOut {
          to { opacity: 0; visibility: hidden; }
        }
        
        /* Mobile-specific positioning */
        @media (max-width: 768px) {
          .mobile-top {
            bottom: auto !important;
            top: 100px !important;
          }
          
          .back-btn {
            left: 50% !important;
            transform: translateX(-50%);
            top: 20px !important;
            padding: 10px 20px !important;
            width: max-content;
          }
        }
      `}</style>
    </div>
  );
};

export default Room3D;