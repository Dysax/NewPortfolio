import { Suspense, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile, onModelLoaded }) => {
  const { scene, nodes, materials } = useGLTF("./desktop_pc/scene.gltf");

  useEffect(() => {
    if (scene) {
      console.log("Scene is loaded. Triggering onModelLoaded...");
      onModelLoaded();
    }
  }, [scene, onModelLoaded]);


  return (
    <mesh>
      <hemisphereLight intensity={.85} groundColor="white" color="white"/>
      <spotLight
        position={[-20, 50, 10]}
        angle={Math.PI / 4}
        penumbra={0.5}
        intensity={2}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={2} color="white" />
      <primitive
        
        object={scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
      />
    </mesh>
  );
};

const ComputersCanvas = ({ onModelLoaded }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 1, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />
        <Computers isMobile={isMobile} onModelLoaded={onModelLoaded} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
