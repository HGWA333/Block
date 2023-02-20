import MainComponents from "../Main/Components";
import { useEffect, useState } from "react";
import { getBlock, getBlockNumber } from "../../eth/web3";
const MainContainer = () => {
  const [blockNumber, setBlockNumber] = useState(-1);

  useEffect(() => {
    let tempArr = [];
    for (let i = blockNumber; i > -1; --i) {
      let test = tempArr.push(getBlockNumber(i));
      console.log("test", test);
    }
  }, []);
  return (
    <>
      <MainComponents blockNumber={blockNumber}></MainComponents>
    </>
  );
};

export default MainContainer;
