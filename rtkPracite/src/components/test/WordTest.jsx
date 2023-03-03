import useWeb3 from "../../useWeb3";
import axios from "axios";
import * as THREE from "three";
import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, TrackballControls } from "@react-three/drei";
import { TestApi } from "../../api/api";
import { Scene } from "three";

function Word({ name, query, mutation, setCount, children, ...props }) {
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
    console.log("useEffect 호버 했다.");
    //;
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
        onClick={async () => {
          // console.log("클릭했다.", children);
          await setCount({
            name: "test",
            value: `${children}님이 클릭했습니다.`,
            test: `${children}님이 현기증 난다고 빨리 확인해달래요`,
          });
        }}
      />
    </>
  );
}

function Cloud({ tempArr, radius, query, mutation, setCount }) {
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
    <Word
      key={index}
      position={pos}
      children={word}
      query={query}
      mutation={mutation}
      setCount={setCount}
    />
  ));
}

export default function WordTest({ name }) {
  const [web3, account] = useWeb3();
  const [ca, setCA] = useState("");
  const [net, setNet] = useState("");

  useEffect(() => {
    (async () => {
      const CounterContract = (
        await axios.post(
          "http://localhost:8080/api/contract/CounterContract",
          {}
        )
      ).data;

      console.log("CounterContract", CounterContract);
      const networkId = CounterContract.networkId;
      console.log("networkId", networkId);
      const CA = CounterContract.to;
      setCA(CA);
      setNet(networkId);
    })();
  }, []);

  const query = TestApi.useGetCountQuery({ name });
  const mutation = TestApi.useSetCountMutation();
  const setCount = mutation[0];

  const light = new THREE.DirectionalLight(0xffe4ff, 0.8);
  const scene = new THREE.Scene();
  scene.add(light);

  const helper = new THREE.DirectionalLightHelper(light, 5);
  scene.add(helper);

  if (query.isLoading) {
    return <>Loading</>;
  }

  const tempArr = [
    [[`Account : ${account}`]],
    [[`CA : ${ca}`]],
    [[`NetworkID : ${net}`]],
    // [[account]],
    // [[account]],
    // [[account]],
    // [[account]],
    // [[account]],
    // [[account]],
    // [[account]],
    // [[account]],
    // [[account]],
    // ["1", "1", "1", "1", "1", "1"],
    // ["7", "7", "7", "7", "7", "7"],
    // ["3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3"],
    // ["4", "4", "4", "4", "4", "4", "4", "4"],
    // ["5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5"],
    // ["4", "4", "4", "4", "4", "4", "4", "4"],
    // ["3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3"],
    // ["2", "2", "2", "2", "2", "2"],
    // ["1", "1", "1", "1", "1", "1"],
    // [[account]],
  ];

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
      <fog attach="fog" args={["#202025", 0, 80]} />
      <Cloud
        tempArr={tempArr}
        count={8}
        radius={20}
        query={query}
        mutation={mutation}
        setCount={setCount}
      />
      <TrackballControls />
    </Canvas>
  );
}
