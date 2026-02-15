import { Canvas } from "@react-three/fiber";
import { Experience, scenes } from "./Experience";
import { useState, Suspense, useEffect } from "react";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const currentScene = scenes[activeIndex] || scenes[0];
  const [title, desc] = currentScene.label.split("\n");

  useEffect(() => {
    // Hide loading screen after a short delay to ensure model is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* THREE.JS CANVAS */}
      <Canvas camera={{ position: [1.86, -0.34, 4.91], fov: 35 }}>
        <Suspense fallback={null}>
          <Experience onScrollUpdate={setActiveIndex} />
        </Suspense>
      </Canvas>

      {/* LOADING OVERLAY */}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.95)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
            animation: "fadeOut 0.5s ease 1.5s forwards"
          }}
        >
          <div style={{
            textAlign: "center",
            color: "white",
            fontFamily: "system-ui, -apple-system, sans-serif"
          }}>
            <div style={{
              width: "60px",
              height: "60px",
              border: "4px solid rgba(255, 183, 3, 0.2)",
              borderTop: "4px solid #ffb703",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px"
            }} />
            <p style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#ffb703",
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
      `}</style>

      {/* FIXED UI OVERLAY */}
      <div
        style={{
          position: "fixed",
          bottom: "40px",
          left: "40px",
          width: "550px",
          maxWidth: "calc(100vw - 80px)",
          maxHeight: "calc(100vh - 120px)",
          overflowY: "auto",
          background: "rgba(15, 15, 15, 0.95)",
          backdropFilter: "blur(12px)",
          border: "2px solid rgba(255, 183, 3, 0.3)",
          borderRadius: "16px",
          padding: "36px",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.7)",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            margin: "0 0 16px 0",
            fontSize: "40px",
            fontWeight: "700",
            color: "#ffb703",
            lineHeight: "1.3",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            margin: "0 0 24px 0",
            fontSize: "30px",
            lineHeight: "1.7",
            color: "#e0e0e0",
          }}
        >
          {desc}
        </p>

        {/* Progress dots */}
        <div style={{
          display: "flex",
          gap: "8px",
          alignItems: "center"
        }}>
          {scenes.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === activeIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === activeIndex ? "#ffb703" : "rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;