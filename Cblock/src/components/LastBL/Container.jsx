import LastBLComponents from "../LastBL/Components";
import { lastBlockList } from "../../api/index";
import { useState, useEffect } from "react";

const LastBLContainer = () => {
  const [lastBL, setLastBL] = useState([]);

  useEffect(() => {
    // console.log("LastBLContainer 찍힘");
    lastBlockList({}).then((lastBLData) => {
      console.log("lastBLData", lastBLData);
      setLastBL(lastBLData);
    });
  }, []);

  return (
    <>
      <LastBLComponents lastBL={lastBL}></LastBLComponents>
    </>
  );
};

export default LastBLContainer;
