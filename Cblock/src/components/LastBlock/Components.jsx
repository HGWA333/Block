import {
  LatestBlockCSS,
  LatestTransactionCSS,
} from "../../styleCSS/LsatBlockCSS";
import { ListBlockFlexCSS2 } from "../../styleCSS/ListBlockFlexCSS";

const BlockListComponents = ({ lastTR, lastBL }) => {
  return (
    <>
      <LatestBlockCSS>
        <p>Latest Blocks Info</p>
        {lastBL.map(({ id, difficulty, hash }) => (
          <div key={id} className="alignContent">
            <p>Latest Blocks</p>
            <div className="wordBreak">
              Block Height:
              <span> {difficulty}</span>
            </div>
            <div className="wordBreak">
              Fee Recipient:
              <span> {hash}</span>
            </div>
            <div className="wordBreak">
              Block Reward:
              <span> {difficulty}</span>
            </div>
            <div className="wordBreak">
              Transactions Block:
              <span> {difficulty}</span>
            </div>
          </div>
        ))}
      </LatestBlockCSS>
      <LatestTransactionCSS>
        <p>Latest TransactionInfo</p>
        {lastTR.map(({ id, transactionHash, from, to, blnum }) => (
          <div key={id}>
            <p>Latest Transactions</p>
            <div className="wordBreak">
              Hash:
              <span> {transactionHash}</span>
            </div>
            <div className="wordBreak">
              From: <span>{from}</span>
            </div>
            <div className="wordBreak">
              To: <span>{to}</span>
            </div>
            <div className="wordBreak">
              BlockNumber: <span>{blnum}</span>
            </div>
          </div>
        ))}
      </LatestTransactionCSS>
    </>
  );
};

export default BlockListComponents;
