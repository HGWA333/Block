import BlockListComponents from "../BlockList/Components";
import { lastTransactionList, lastBlockList } from "../../api/index";
import { useState, useEffect } from "react";

const BlockListContainer = () => {
  const [lastTR, setLastTR] = useState([]);
  const [lastBL, setLastBL] = useState([]);

  useEffect(() => {
    lastTransactionList({}).then((lastTRData) => {
      setLastTR(lastTRData);
    });
    lastBlockList({}).then((lastBLData) => {
      setLastBL(lastBLData);
    });
  }, []);

  return (
    <>
      <BlockListComponents
        lastTR={lastTR}
        lastBL={lastBL}
      ></BlockListComponents>
    </>
  );
};

export default BlockListContainer;
