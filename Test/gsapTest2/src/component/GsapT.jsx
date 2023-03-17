import gsap from "gsap";
import styled from "styled-components";
import { useEffect } from "react";
import { Tween } from "react-gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function GsapT() {
  useEffect(() => {
    <ScrollTrigger
      trigger="trigger"
      start="top center"
      end="400px center"
      scrub={0.5}
      markers={true}
      pin={true}
    >
      {/* <Timeline target={<TargetWithNames />}>
        <Tween
          from={{
            x: "-100vw",
          }}
          target="div1"
        />
        <Tween
          from={{
            x: "-100vw",
          }}
          target="div3"
        />
        <Tween
          from={{
            x: "-100vw",
          }}
          stagger={0.5}
          target="div2"
        />
      </Timeline> */}
    </ScrollTrigger>;
  }, []);

  return (
    <>
      <div>111</div>
    </>
  );
}

export default GsapT;
