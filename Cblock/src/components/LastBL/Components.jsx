import { LastBLCSS } from "../../styleCSS/LsatBlockCSS";

const LastBLComponents = ({ lastBL }) => {
  return (
    <>
      <LastBLCSS>
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
      </LastBLCSS>
    </>
  );
};

export default LastBLComponents;
