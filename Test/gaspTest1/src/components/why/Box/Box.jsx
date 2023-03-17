import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import FlagTest from "../Flag/Flag";
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
  return (
    <>
      <mesh
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        scale={[2, 4, 1]}
      >
        <planeGeometry args={[1, 1, 32, 32]} />
        <MeshDistortMaterial ref={ref} speed={5}>
          <GradientTexture
            stops={[0, 0.8, 1]}
            colors={["#e63946", "#f1faee", "#a8dadc"]}
            size={300}
          />
        </MeshDistortMaterial>
      </mesh>
    </>
  );
}

function MyBox() {
  const box = useRef();
  useEffect(() => {
    gsap.to(box.current.position, {
      duration: 1,
      y: 2,
    });
  }, [box]);
  useFrame((state, delta) => {
    gsap.to(box.current.rotation, {
      y: state.clock.elapsedTime,
    });
  });
  return (
    <mesh
      ref={box}
      position={[Math.random() * 5 - 2.5, 0, Math.random() * 5 - 2.5]}
    >
      <meshStandardMaterial attach="material" color="red" />
      <boxGeometry attach="geometry" />
    </mesh>
  );
}

function Lect6() {
  return (
    <>
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{
          aspect: window.innerWidth / window.innerHeight,
          fov: 100,
          near: 0.1,
          far: 1000,
          position: [0, 1, 6],
        }}
      >
        <color attach="background" args={["fbfbf6"]} />
        <fog attach={"fog"} args={["black", 3, 7]} />
        <directionalLight color={"green"} position={[1, 3, 2]} />
        <Flag />
        <MyBox />
        <ambientLight />
      </Canvas>
      <FlagTest />
    </>
  );
}

export default Lect6;
