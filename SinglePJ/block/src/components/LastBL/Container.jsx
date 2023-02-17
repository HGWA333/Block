import LastBlComponents from "../LastBL/Components";
import { useEffect, useState } from "react";
import { getBlock, getBlockNumber } from "../../eth/web3";

const LastBlContainer = () => {
  const [blockNumber, setBlockNumber] = useState(-1);
  const [pageNumber, setPageNumber] = useState(0);

  const [block, setBlock] = useState({});
  const LastBlock = { block, blockNumber };

  useEffect(() => {
    let BlockNumber = getBlockNumber().then((_data) => {
      setBlockNumber(_data);

      getBlock(_data, function (err, result) {
        if (!err) console.log(JSON.stringify(result).toString());
        else console.error(err);
      }).then((result) => {
        console.log(result);
        setBlock(result);
      });
    });
  }, []);

  return (
    <>
      <LastBlComponents LastBlock={LastBlock}></LastBlComponents>
    </>
  );
};

export default LastBlContainer;
