import LastBLComponents from "../LastBL/Components";
import { useState, useEffect } from "react";

const LastBLContainer = () => {
  // const [lastBL, setLastBL] = useState(-1);
  // const [BLpageNum, setBLpageNum] = useState(0);
  useEffect(() => {
    console.log(" LastBL useEffect");
    for (let i = 0; i < 55; ++i) {
      if (5 * 7 <= i && i < 5 * (7 + 1)) {
        console.log(i);
      }
    }
  }, []);

  return (
    <>
      <LastBLComponents></LastBLComponents>
    </>
  );
};

export default LastBLContainer;
