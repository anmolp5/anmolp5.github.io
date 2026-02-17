import { useGLTF, Environment, ScrollControls, useScroll, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";

// --- SCENE DATA ---
export const scenes = [
  { // 1. Wide
    label: "Welcome To My Room\nThis is where I spend most of my time working on engineering projects and relaxing. When I moved here, I immediately saw inconveniences and potential improvements. Over time, I have designed many different things to make my desk a better place. Just scroll to view them all!",
    position: new THREE.Vector3(1.86, -0.34, 4.91),
    target: new THREE.Vector3(0.24, -1.02, 1.27),
    labelPosition: new THREE.Vector3(-0.8, -0.5, 1.5),
    fov: 35
  },
  { // 2. Storage
    label: "Desk Extension\nWith a large outlet box sticking out from the wall, my desk had a large gap behind it which led to things falling and a waste of space. To fix this I 3D printed a series of mounts and spacers, as well as cutting out custom planks from wood.",
    position: new THREE.Vector3(-0.22, 0.21, 0.85),
    target: new THREE.Vector3(-0.22, -1.44, -0.07),
    labelPosition: new THREE.Vector3(0.3, -0.8, 0.2),
    fov: 35
  },
  { // 3. Bed Side Stand
    label: "Bedside Mount\nTo get a rigid left anchor point, I created a mount that perfectly wraps around my bed frame printed in PETG for higher part strength, as well as printed in the plane of the hook for the most optimal layer orientation for the loads it will experience.",
    position: new THREE.Vector3(-0.32, -0.89, 0.53),
    target: new THREE.Vector3(-0.70, -1.30, 0.04),
    labelPosition: new THREE.Vector3(-0.2, -0.8, 0.3),
    fov: 35
  },
  { // 4. Outlet Stand
    label: "Outlet Mount\nFor my central anchor point, I decided to wrap around the outlet box for a connection that was friction fit with no screwing into the wall required. Having the room modeled in CAD allowed me to verify the heights of the mounts relative to eachother to get a level plank.",
    position: new THREE.Vector3(-0.23, -0.97, 0.30),
    target: new THREE.Vector3(-0.24, -1.25, 0.06),
    labelPosition: new THREE.Vector3(0.2, -0.7, 0.2),
    fov: 50,
    mobileTop: true
  },
  { // 5. Both Planks
    label: "Extension Planks\nI cut Custom planks to fit the specific dimensions of my room using measurements, including the cutout required for the Lamp to mount.",
    position: new THREE.Vector3(-0.18, -0.03, 0.19),
    target: new THREE.Vector3(-0.18, -0.98, 0.10),
    labelPosition: new THREE.Vector3(0.3, -0.5, 0.3),
    fov: 50,
    mobileTop: true
  },
  { // 6. Lamp Base
    label: "Custom Lamp Base\nMy desk lamp's remote was inline on its power cable which would dangle and be inconvenient, so I created a custom base that routes the cables neatly while holding the switch in a convenient place. While printing, I gave it an Archimedean Chord bottom surface pattern to give it a brushed metal appearance.",
    position: new THREE.Vector3(-0.07, -1.13, 0.19),
    target: new THREE.Vector3(-0.07, -1.32, 0.07),
    labelPosition: new THREE.Vector3(0.3, -1.0, 0.2),

    fov: 50,
    mobileFov: 80,
    mobileTop: false
  },
  { // 7. Cologne Cubby
    label: "Cologne Cubby\nI wanted easy access to my colognes but could not keep them in the open as they would degrade in the direct sunlight from the window, so I created a custom wooden cubby to fit neatly in my space.",
    position: new THREE.Vector3(0.12, -0.74, 0.50),
    target: new THREE.Vector3(0.63, -1.14, 0.17),
    labelPosition: new THREE.Vector3(0.2, -0.6, 0.4),
    fov: 50,
    mobileTop: true
  },
  { // 8. Shelf Individual
    label: "Wall Mounted Shelf\nI wanted to display some keepsakes and small creations, so I created a shelf system that did not require any screws into the wall. Two 3D printed brackets are attached to a custom wooden shelf with epoxy, and then held onto the wall with command strips for easy removal.",
    position: new THREE.Vector3(0.18, -0.48, 0.23),
    target: new THREE.Vector3(0.47, -0.42, -0.00),
    labelPosition: new THREE.Vector3(0.1, -0.1, 0.3),
    fov: 80
  },
  { // 9. Shelves Together
    label: "Triple Shelves\nI added 3 of these shelves to display more items as well as fill up space on my wall.",
    position: new THREE.Vector3(0.91, -0.29, 1.14),
    target: new THREE.Vector3(0.49, -0.58, 0.00),
    labelPosition: new THREE.Vector3(0.0, -0.2, 0.5),
    fov: 50,
    mobileTop: true
  },
  { // 10. Shelf Stand
    label: "Shelf Support\nWhen I placed heavier items on the shelves like picture frames, the interface between the command strip and the wall would fail, risking the items on the shelf. I designed a modular tree-like support system that is supported by the cubby to prevent any shelf from falling in the future.",
    position: new THREE.Vector3(1.23, -0.81, 0.94),
    target: new THREE.Vector3(0.59, -0.86, 0.01),
    labelPosition: new THREE.Vector3(0.2, -0.5, 0.3),
    fov: 50
  },
  { // 11. Sponge Tray
    label: "Sponge Tray\nAfter washing my dishes, I needed a place to keep my sponge, ideally in the open to prevent mold growth and expedite drying. I created a tray with ribs to allow airflow underneath while doubling as a reservoir for excess water.",
    position: new THREE.Vector3(0.59, -1.10, 0.51),
    target: new THREE.Vector3(0.70, -1.32, 0.28),
    labelPosition: new THREE.Vector3(0.3, -0.8, 0.4),
    fov: 50,
    mobileTop: true
  },
  { // 12. Laptop Screen
    label: "My Laptop\nThe heart of the operation. This is where the coding and CAD happens. I am able to create all of these things because of my experience in CAD.",
    position: new THREE.Vector3(-0.24, -0.82, 1.87),
    target: new THREE.Vector3(-0.21, -1.16, 0.36),
    labelPosition: new THREE.Vector3(0.2, -0.8, 0.8),
    fov: 35,
    mobileTop: true
  },
  { // 13. Laptop Zoom
    label: "Parts List\nHere are each of the different components I designed on this desk.",
    position: new THREE.Vector3(-0.23, -1.14, 0.74),
    target: new THREE.Vector3(-0.24, -1.21, 0.37),
    labelPosition: new THREE.Vector3(0.2, -0.9, 0.5),
    fov: 35
  }
];

// --- SCROLL BINDER (Exposes scroll element to parent) ---
const ScrollBinder = ({ setScrollElement }) => {
  const scroll = useScroll();
  useEffect(() => {
    if (scroll && scroll.el && setScrollElement) {
      setScrollElement(scroll.el);
    }
  }, [scroll, setScrollElement]);
  return null;
};

// --- SCROLL TRACKER (passes activeIndex up) ---
const ScrollTracker = ({ onIndexChange }) => {
  const scroll = useScroll();
  const lastIndexRef = useRef(0);

  useFrame(() => {
    if (!scroll) return;

    const total = scenes.length - 1;
    const currentIdx = Math.round(scroll.offset * total);

    if (currentIdx !== lastIndexRef.current) {
      lastIndexRef.current = currentIdx;
      onIndexChange(currentIdx);
    }
  });

  return null;
};

// --- CAMERA HANDLER ---
const CameraHandler = () => {
  const scroll = useScroll();
  const { camera } = useThree();

  useFrame(() => {
    if (!scenes || scenes.length < 2 || !scroll) return;

    const totalTransitions = scenes.length - 1;
    const currentScroll = scroll.offset * totalTransitions;
    const index = Math.floor(currentScroll);

    // Check if mobile (window width < 768px)
    const isMobile = window.innerWidth < 768;

    if (index >= totalTransitions) {
      const lastScene = scenes[totalTransitions];
      camera.position.copy(lastScene.position);
      camera.lookAt(lastScene.target);
      // Set FOV for last scene (only use custom FOV on mobile)
      if (lastScene.fov && isMobile) {
        if (camera.fov !== lastScene.fov) {
          camera.fov = lastScene.fov;
          camera.updateProjectionMatrix();
        }
      } else if (!isMobile && camera.fov !== 35) {
        // Reset to default FOV on desktop
        camera.fov = 35;
        camera.updateProjectionMatrix();
      }
      return;
    }

    let progress = currentScroll - index;
    const hold = 0.20;

    if (progress < hold) {
      progress = 0;
    } else if (progress > 1 - hold) {
      progress = 1;
    } else {
      progress = (progress - hold) / (1 - (hold * 2));
    }

    const start = scenes[index];
    const end = scenes[index + 1];

    if (!start || !end) return;

    // Interpolate camera position
    camera.position.lerpVectors(start.position, end.position, progress);
    const currentTarget = new THREE.Vector3().lerpVectors(start.target, end.target, progress);
    camera.lookAt(currentTarget);

    // Interpolate FOV only on mobile
    if (isMobile) {
      const startFov = start.mobileFov || start.fov || 35;
      const endFov = end.mobileFov || end.fov || 35;

      const targetFov = startFov + (endFov - startFov) * progress;

      if (Math.abs(camera.fov - targetFov) > 0.1) {
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }
    } else if (!isMobile && camera.fov !== 35) {
      // Keep desktop at FOV 35
      camera.fov = 35;
      camera.updateProjectionMatrix();
    }
  });
  return null;
};

// --- MAIN EXPERIENCE ---
export const Experience = ({ onIndexChange, setScrollElement, activeIndex }) => {
  const { scene } = useGLTF("/Room3D.gltf");

  return (
    <>
      <Environment preset="warehouse" intensity={0.3} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={0.4} castShadow />

      <ScrollControls pages={scenes.length} damping={0.25}>
        <CameraHandler />
        <ScrollTracker onIndexChange={onIndexChange} />
        {setScrollElement && <ScrollBinder setScrollElement={setScrollElement} />}
        <primitive object={scene} scale={1} position={[0, -1, 0]} />

        {/* LaptopInterface is managed externally in Room3D now (using activeIndex) */}
      </ScrollControls>
    </>
  );
};