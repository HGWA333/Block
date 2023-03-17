import { css } from "@emotion/react";

import { Timeline, Tween } from "react-gsap";

function Animation3() {
  return (
    <div>
      <h2>react-gsap Animation</h2>
      <div className="wrap">
        <Timeline target={<div className="box" css={boxStyle}></div>}>
          <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={1} />
          <Tween to={{ x: "200px" }} />
        </Timeline>
      </div>
    </div>
  );
}

const boxStyle = css`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: #bf5160;
  opacity: 0;
`;

export default Animation3;
