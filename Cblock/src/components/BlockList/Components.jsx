import { LatestBlockCSS } from "../../styleCSS/LatestBlockCSS";
import { LatestTransactionCSS } from "../../styleCSS/LatestTransactionCSS";

const BlockListComponents = () => {
  return (
    <>
      <LatestBlockCSS>
        <p>Latest Block Info</p>
        <div>
          Block Height: <span>16662445</span>
          Block Height: <span>16662445</span>
          Block Height: <span>16662445</span>
          Block Height: <span>16662445</span>
          Block Height: <span>16662445</span>
        </div>
      </LatestBlockCSS>
      <LatestTransactionCSS>
        <p>Latest Transaction Info</p>
        <div>
          Block Height: <span>16662445</span>
          Block Height: <span>16662445</span>
          Block Height: <span>16662445</span>
          Block Height: <span>16662445</span>
          Block Height: <span>16662445</span>
        </div>
      </LatestTransactionCSS>
    </>
  );
};

export default BlockListComponents;
