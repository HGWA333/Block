import {
  LatestBlockCSS,
  LatestTransactionCSS,
} from "../../styleCSS/LsatBlockCSS";
import { ListBlockFlexCSS2 } from "../../styleCSS/ListBlockFlexCSS";

const BlockListComponents = ({
  setClickBlock,
  clickBlock,
  setClickTR,
  clickTR,
}) => {
  return (
    <>
      <ListBlockFlexCSS2>
        <LatestBlockCSS>
          <p>Latest Blocks Info</p>
          <div>
            Block Height: <span>{clickBlock?.blockNumber}</span>
          </div>
          <div>
            Transactions: <span>{clickBlock?.hash}</span>
          </div>
          <div>
            Extra Data: <span>{clickBlock?.extraData}</span>
          </div>
          <div>
            Gas Price: <span>{clickBlock?.gasLimit}</span>
          </div>
          <div>
            Size: <span>{clickBlock?.size}</span>
          </div>
        </LatestBlockCSS>
        <LatestTransactionCSS>
          <p>Latest TransactionInfo</p>
          <div>
            Transaction Hash: <span>{clickTR?.transactionHash}</span>
          </div>
          <div>
            From: <span>{clickTR?.from}</span>
          </div>
          <div>
            To: <span>{clickTR?.to}</span>
          </div>
          <div>
            BlockNumber: <span>{clickTR?.blnum}</span>
          </div>
        </LatestTransactionCSS>
      </ListBlockFlexCSS2>
    </>
  );
};

export default BlockListComponents;
