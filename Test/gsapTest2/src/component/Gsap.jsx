import gsap from "gsap";
import styled from "styled-components";
import { useEffect } from "react";
import { Tween } from "react-gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Tri() {
  useEffect(() => {
    gsap.to(".box", {
      scrollTrigger: ".box",
      x: 100,
      y: 100,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".contain",
        pin: true,
        start: "top top",
        end: "+=420",

        snap: {
          snapTo: "labels",
          duration: { min: 0.25, max: 4.5 },
          delay: 0.3,
          ease: "power1.inOut",
        },
      },
    });

    tl.addLabel("start")
      .from(".box p", { scale: 0.25, rotation: 55, autoAlpha: 0 })
      .addLabel("color")
      .from(".box", { backgroundColor: "red" })
      .from(".box1", { backgroundColor: "blue" })
      .from(".box2", { backgroundColor: "yellow" })
      .addLabel("spin")
      .to(".box", { rotation: 17 })
      .addLabel("end");

    ScrollTrigger.create({
      trigger: "#id",
      start: "top top",
      endTrigger: "#otherID",
      end: "bottom 80%+=100px",
      onToggle: (self) => console.log("toggled, isActive:", self.isActive),
      onUpdate: (self) => {
        console.log(
          "progress:",
          self.progress.toFixed(3),
          "direction:",
          self.direction,
          "velocity",
          self.getVelocity()
        );
      },
    });
  }, []);

  return (
    <>
      <HeightBox> </HeightBox>
      <div className="box"> scroll 1</div>
      <TestBox></TestBox>
      <div> scroll 2</div>
      <HeightBox> </HeightBox>
      <div className="contain box "> scroll 3</div> <HeightBox> </HeightBox>
      <div className="contain box1 spin"> scroll 4</div>
      <HeightBox> </HeightBox>
      <div className="contain box2"> scroll 5</div> <HeightBox> </HeightBox>
      <div className="contain"> scroll 6</div> <HeightBox> </HeightBox>
      <div className="contain"> scroll 7</div> <HeightBox> </HeightBox>
      <div className="contain"> scroll 8</div> <HeightBox> </HeightBox>
      <div className="contain"> scroll 9</div> <HeightBox> </HeightBox>
    </>
  );
}

export default Tri;

const HeightBox = styled.div`
  height: 200px;
`;
const TestBox = styled.div`
  width: 100px;
  background: yellowgreen;
`;
