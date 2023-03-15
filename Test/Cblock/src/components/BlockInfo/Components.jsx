import { BlockInfoCSS } from "../../styleCSS/HeaderCSS";

const BlockInfoComponents = () => {
  return (
    <>
      <BlockInfoCSS>
        <div>
          ETHER PRICE: <span> 150ETH </span>
        </div>
        <div>
          TRANSACTIONS: <span> 1000 </span>
        </div>
        <div className="test">
          LAST FINALIZED BLOCK: <span> 1000 </span>
        </div>
      </BlockInfoCSS>
    </>
  );
};

export default BlockInfoComponents;
