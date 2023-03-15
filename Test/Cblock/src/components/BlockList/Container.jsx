import BlockListComponents from "../BlockList/Components";
import { lastTransactionList, lastBlockList } from "../../api/index";
import { useState, useEffect } from "react";

const BlockListContainer = ({
  setClickBlock,
  clickBlock,
  clickTR,
  setClickTR,
}) => {
  return (
    <>
      <BlockListComponents
        clickBlock={clickBlock}
        setClickBlock={setClickBlock}
        setClickTR={setClickTR}
        clickTR={clickTR}
      ></BlockListComponents>
    </>
  );
};

export default BlockListContainer;
