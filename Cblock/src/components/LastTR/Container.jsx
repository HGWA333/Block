import LastTRComponents from "../LastTR/Components";
import { useState, useEffect } from "react";

const LastTRContainer = () => {
  // const [lastTR, setLastTR] = useState(-1);
  // const [TRpageNum, setTRpageNum] = useState(0);
  useEffect(() => {
    console.log(" LastTR useEffect");
    for (let i = 0; i < 55; ++i) {
      if (5 * 7 <= i && i < 5 * (7 + 1)) console.log(i);
    }
  }, []);

  return (
    <>
      <LastTRComponents></LastTRComponents>
    </>
  );
};

export default LastTRContainer;
