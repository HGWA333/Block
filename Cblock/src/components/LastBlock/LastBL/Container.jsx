import LastBLComponents from "./Components";
import { lastBlockList, BlMaxList } from "../../../api/index";
import { useState, useEffect } from "react";

const LastBLContainer = ({ setClickBlock, clickBlock }) => {
  const [lastBL, setLastBL] = useState([]);
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
    BlMaxList({}).then((maxList) => {
      setMaxnum(maxList);
    });
  });
  useEffect(() => {
    lastBlockList({ offset, limit }).then((lastBLData) => {
      setLastBL(lastBLData);
    });
  }, [offset]);

  return (
    <>
      <LastBLComponents
        lastBL={lastBL}
        offset={offset}
        NextPage={NextPage}
        PrevPage={PrevPage}
        PageMove={PageMove}
        setClickBlock={setClickBlock}
        clickBlock={clickBlock}
      ></LastBLComponents>
    </>
  );
};

export default LastBLContainer;
