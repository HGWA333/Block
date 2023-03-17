import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
function Animation2() {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.to(boxRef.current, 1, {
      transform: "translateX(200px)",
      delay: 0.5,
      ease: "ease",
    });
  }, []);

  return (
    <div>
      <h2>gsap Animation</h2>
      <div className="wrap">
        <div className="box" css={boxStyle} ref={boxRef}></div>
      </div>
    </div>
  );
}

const boxStyle = css`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: #bf5160;
`;
export default Animation2;
