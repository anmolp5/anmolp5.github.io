import { Canvas } from "@react-three/fiber";
import { Suspense } from "react"; // <--- NEW IMPORT
import { Experience } from "./Experience";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [5, 5, 5], fov: 30 }}>
        {/* If the model is loading, show this text */}
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;