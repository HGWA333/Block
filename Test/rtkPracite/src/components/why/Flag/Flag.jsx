import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  GradientTexture,
  useCursor,
} from "@react-three/drei";
import gsap from "gsap";

function Flag() {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame(() => {
    ref.current.distort = THREE.MathUtils.lerp(
      ref.current.distort,
      hovered ? 0.4 : 0,
      hovered ? 0.05 : 0.01
    );
  });
  useFrame((state) => {
    gsap.to(ref.current.position, {
      rotation: 27,
      x: state.clock.elapsedTime,
      duration: 2,
    });
  });

  useEffect(() => {
    gsap.to(ref.current.rotation, {
      rotation: 27,
      x: 500,
      duration: 2,
    });
  }, [ref]);
  return (
    <>
      <mesh
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        scale={[3, 4, 1]}
      >
        <planeGeometry args={[1, 1, 32, 32]} />
        <MeshDistortMaterial ref={ref} speed={8}>
          <GradientTexture
            stops={[0, 0.8, 1]}
            colors={["#e63946", "#f1faee", "#a8dadc"]}
            size={100}
          />
        </MeshDistortMaterial>
      </mesh>
    </>
  );
}

export default function FlagTest() {
  return (
    <>
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{
          aspect: window.innerWidth / window.innerHeight,
          fov: 35,
          near: 0.1,
          far: 1000,
          position: [7, 5, 8],
        }}
      >
        <color attach="background" args={["fbfbf6"]} />
        <ambientLight />
        <Flag />
      </Canvas>
    </>
  );
}
