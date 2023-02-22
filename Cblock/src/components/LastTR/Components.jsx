import { LastTRCSS } from "../../styleCSS/LsatBlockCSS";
const LastTRComponents = ({ lastTR }) => {
  console.log("lastTR를 찍었다.", lastTR);

  // let LastTR = JSON.stringify(lastTR);
  // console.log("JSON.stringify(lastTR)를 찍었다.", LastTR);

  return (
    <>
      <LastTRCSS>
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
      </LastTRCSS>
    </>
  );
};

export default LastTRComponents;
