import LastTRComponents from "../LastTR/Components";
import { lastTransactionList } from "../../api/index";
import { useState, useEffect } from "react";

const LastTRContainer = () => {
  const [lastTR, setLastTR] = useState([]);

  useEffect(() => {
    lastTransactionList({}).then((lastTRData) => {
      // console.log("lastTransactionList실행");
      // console.log("lastTR", lastTRData);
      setLastTR(lastTRData);
    });
  }, []);

  return (
    <>
      <LastTRComponents lastTR={lastTR}></LastTRComponents>
    </>
  );
};

export default LastTRContainer;
