import useWeb3 from "../../useWeb3";
import axios from "axios";
import * as THREE from "three";
import Lect6 from "../why/Box/Box";
import FlagTest from "../why/Flag/Flag";
import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, TrackballControls } from "@react-three/drei";

export function Word({ children, ...props }) {
  const color = new THREE.Color();
  const fontProps = {
    // fontFamily: "ffProExtraLight",
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef();
  const [hover, setHover] = useState(false);
  const over = (e) => (e.stopPropagation(), setHover(true));
  const out = () => setHover(false);

  useEffect(() => {
    // console.log("useEffect 호버 했다.");
    if (hover) document.body.style.cursor = "pointer";
    return () => (document.body.style.cursor = "auto");
  }, [hover]);

  useFrame(({ camera }) => {
    ref.current.quaternion.copy(camera.quaternion);
    ref.current.material.color.lerp(color.set(hover ? "#fa2720" : "white"));
  });

  return (
    <>
      <Text
        // font="https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff"
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        {...props}
        {...fontProps}
        children={children}
      />
    </>
  );
}

export function Cloud({ tempArr, radius }) {
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (tempArr.length - 1);

    for (let i = 0; i < tempArr.length; i++)
      for (let j = 0; j < tempArr[i].length; j++) {
        const thetaSpan = (Math.PI * 2) / tempArr[i].length;

        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j)
          ),
          tempArr[i][j],
        ]);
      }
    return temp;
  }, [radius]);
  return words.map(([pos, word], index) => (
    <Word key={index} position={pos} children={word} />
  ));
}

export default function WordTest() {
  const [vote, setVote] = useState(0);

  const tempArr = [
    ["hihihihihi", "hohohohoho", "huhuhuhu", "1", "1", "1"],

    // [`Account : ${account}  Menu : ${candidateList[0]} vote : ${vote}`],
    // [` ${candidateList[1]} : ${vote}`],
    // [` ${candidateList[2]} : ${vote}`],
    // [` ${candidateList[3]} : ${vote}`],
    // [[`NetworkID : {netId}`]],
    // [[`host : ${host}`]],
    // [[`Count : ${coun}`]],
    // [[`Data : ${data}`]],
    // [[`Signature : ${signature}`]],
    // [[`BlockHeader Timeout : ${time}`]],
    // [[`DefaultBlock : ${block}`]],

    // [[account]],
  ];

  return (
    <>
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        dpr={[1, 2]}
        camera={{
          position: [0, 0, 35],
          fov: 90,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.1,
        }}
      >
        <fog attach="fog" args={["#202025", 0, 80]} />
        <color attach="background" args={["#fbfbf6"]} />
        <Cloud tempArr={tempArr} count={8} radius={20} />
        <TrackballControls />
      </Canvas>
      {/* <Lect6 /> */}
    </>
  );
}
