import { useGLTF, Environment, ScrollControls, useScroll, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useState } from "react";

// --- YOUR SCENES (Update labels with your full paragraphs!) ---
const scenes = [
  { 
    label: "Welcome to My Room\nThis is where I spend most of my time working on engineering projects and relaxing.", 
    position: new THREE.Vector3(1.86, -0.34, 4.91), 
    target:   new THREE.Vector3(0.24, -1.02, 1.27) 
  },
  { 
    label: "Storage & Organization\nI keep all my 3D printing filaments and prototyping tools organized in these bins for easy access.", 
    position: new THREE.Vector3(-0.33, -0.19, 0.77), 
    target:   new THREE.Vector3(-0.45, -1.32, 0.24) 
  },
  { 
    label: "Bedside Setup\nA simple setup for charging devices and keeping essentials close at hand during the night.", 
    position: new THREE.Vector3(-0.32, -0.89, 0.53), 
    target:   new THREE.Vector3(-0.70, -1.30, 0.04) 
  },
  { 
    label: "Power & Access\nManaged cable routing ensures that all my devices stay charged without creating a mess of wires.", 
    position: new THREE.Vector3(-0.23, -0.97, 0.30), 
    target:   new THREE.Vector3(-0.24, -1.25, 0.06) 
  },
  { 
    label: "Structural Design\nThese planks were custom cut to fit the specific dimensions of the corner, maximizing vertical storage.", 
    position: new THREE.Vector3(-0.18, -0.03, 0.19), 
    target:   new THREE.Vector3(-0.18, -0.98, 0.10) 
  },
  { 
    label: "Lighting Detail\nSoft ambient lighting helps reduce eye strain during late-night study sessions.", 
    position: new THREE.Vector3(-0.07, -1.13, 0.19), 
    target:   new THREE.Vector3(-0.07, -1.32, 0.07) 
  },
  { 
    label: "Personal Care\nA dedicated spot for daily essentials keeps the workspace clutter-free.", 
    position: new THREE.Vector3(0.12, -0.74, 0.50), 
    target:   new THREE.Vector3(0.63, -1.14, 0.17) 
  },
  { 
    label: "Single Shelf\nDisplaying some of my favorite small builds and keepsakes.", 
    position: new THREE.Vector3(0.18, -0.48, 0.23), 
    target:   new THREE.Vector3(0.47, -0.42, -0.00) 
  },
  { 
    label: "Triple Shelves\nThe main display area for larger projects and reference books.", 
    position: new THREE.Vector3(0.91, -0.29, 1.14), 
    target:   new THREE.Vector3(0.49, -0.58, 0.00) 
  },
  { 
    label: "Shelf Support\nReinforced brackets ensure stability for heavier equipment.", 
    position: new THREE.Vector3(1.23, -0.81, 0.94), 
    target:   new THREE.Vector3(0.59, -0.86, 0.01) 
  },
  { 
    label: "Utility Tray\nCatches loose screws, SD cards, and other small parts while I'm working.", 
    position: new THREE.Vector3(0.59, -1.10, 0.51), 
    target:   new THREE.Vector3(0.70, -1.32, 0.28) 
  },
  { 
    label: "My Workstation\nThe heart of the operation. This is where the coding and CAD happens.", 
    position: new THREE.Vector3(-0.24, -0.82, 1.87), 
    target:   new THREE.Vector3(-0.21, -1.16, 0.36) 
  },
  { 
    label: "The Laptop\nMy main machine, capable of handling heavy rendering and simulation tasks.", 
    position: new THREE.Vector3(-0.23, -1.14, 0.74), 
    target:   new THREE.Vector3(-0.24, -1.21, 0.37) 
  }
];

const CameraHandler = ({ setStep }) => {
  const scroll = useScroll();
  const { camera } = useThree();

  useFrame(() => {
    if (!scenes || scenes.length === 0 || !scroll) return;

    const totalTransitions = scenes.length - 1; 
    const currentScroll = scroll.offset * totalTransitions; 
    const index = Math.floor(currentScroll); 
    
    let progress = currentScroll - index;
    const hold = 0.20; 

    // --- VISIBILITY LOGIC ---
    let activeIndex = -1;

    if (progress < hold) {
      progress = 0;
      activeIndex = index;
    } else if (progress > 1 - hold) {
      progress = 1;
      activeIndex = index + 1;
    } else {
      progress = (progress - hold) / (1 - (hold * 2));
      activeIndex = -1; 
    }

    setStep(activeIndex);

    if (index >= totalTransitions) {
      const last = scenes[totalTransitions];
      camera.position.copy(last.position);
      camera.lookAt(last.target);
      return;
    }

    const start = scenes[index];
    const end = scenes[index + 1];

    if (!start || !end) return;

    camera.position.lerpVectors(start.position, end.position, progress);
    const currentTarget = new THREE.Vector3().lerpVectors(start.target, end.target, progress);
    camera.lookAt(currentTarget);
  });
  return null;
};

export const Experience = () => {
  const { scene } = useGLTF("/Room3D.gltf");
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <Environment preset="studio" intensity={0.5} />
      
      <ScrollControls pages={scenes.length} damping={0.2}>
        <CameraHandler setStep={setActiveStep} />
        
        {scenes.map((sceneData, i) => (
          <Html
            key={i}
            position={sceneData.target}
            center
            distanceFactor={3} // <--- CHANGED FROM 10 TO 3 (Fixes the size issue)
            style={{
              opacity: activeStep === i ? 1 : 0,
              pointerEvents: 'none',
              transition: 'opacity 0.4s ease-in-out',
            }}
          >
            <div style={{
              background: 'rgba(0, 0, 0, 0.85)',
              color: 'white',
              padding: '15px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              
              // --- COMPACT SIZING ---
              width: '220px',       // Slightly narrower for better fit
              maxWidth: '80vw',     // Never wider than 80% of the screen
              textAlign: 'left',    
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              lineHeight: '1.4',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)' // Adds a nice glass effect
            }}>
              {sceneData.label.split('\n').map((line, idx) => (
                <p key={idx} style={{ margin: idx === 0 ? '0 0 6px 0' : '0' }}>
                  {idx === 0 ? <strong style={{fontSize: '1.1em', color: '#ffb703'}}>{line}</strong> : line}
                </p>
              ))}
            </div>
          </Html>
        ))}

        <primitive object={scene} scale={1} position={[0, -1, 0]} />
        
      </ScrollControls>
    </>
  );
};