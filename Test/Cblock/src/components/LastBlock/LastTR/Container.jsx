import LastTRComponents from "./Components";
import { lastTransactionList, TrMaxList } from "../../../api/index";
import { useState, useEffect } from "react";

const LastTRContainer = ({ setClickTR, clickTR }) => {
  const [lastTR, setLastTR] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [maxnum, setMaxnum] = useState();

  const NextPage = () => {
    if (parseInt(maxnum / limit) + 1 === offset) {
      return;
    }
    setOffset(offset + 1);
  };
  const PrevPage = () => {
    if (offset == 0) {
      return;
    }
    setOffset(offset - 1);
  };

  const PageMove = (page) => {
    setOffset(page);
  };
  useEffect(() => {
    lastTransactionList({ offset, limit }).then((lastTRData) => {
      setLastTR(lastTRData);
    });
  }, [offset]);

  useEffect(() => {
    TrMaxList({}).then((maxList) => {
      setMaxnum(maxList);
    });
  }, [maxnum]);

  return (
    <>
      <LastTRComponents
        lastTR={lastTR}
        offset={offset}
        NextPage={NextPage}
        PrevPage={PrevPage}
        PageMove={PageMove}
        setClickTR={setClickTR}
        clickTR={clickTR}
      ></LastTRComponents>
    </>
  );
};

export default LastTRContainer;
