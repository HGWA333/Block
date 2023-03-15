import { LastTRCSS } from "../../../styleCSS/LsatBlockCSS";
const LastTRComponents = ({
  lastTR,
  NextPage,
  PrevPage,
  PageMove,
  offset,
  setClickTR,
  clickTR,
}) => {
  return (
    <>
      <LastTRCSS>
        {lastTR?.map((item, index) => (
          <div
            key={`TR-${index}`}
            className="alignContent"
            onClick={(e) => {
              e.preventDefault();
              console.log("clickBlock", clickTR);
              console.log("item", item);

              setClickTR(item);
            }}
          >
            <span className="SpanText001">Latest Transactions</span>
            <div className="wordBreak">
              Transaction:
              <span> {item.transactionHash}</span>
            </div>
            <div className="wordBreak">
              Fee Recipient:
              <span> {index}</span>
            </div>
            <div className="wordBreak">
              Block Reward:
              <span> {index}</span>
            </div>
            <div className="wordBreak">
              Transactions Block:
              <span> {index}</span>
            </div>
          </div>
        ))}

        <div className="pageButton2">
          <button
            onClick={() => {
              PrevPage();
            }}
          >
            이전
          </button>
          {offset > 1 ? (
            <button
              onClick={() => {
                PageMove(offset - 1);
              }}
            >
              {offset - 1}
            </button>
          ) : (
            <></>
          )}
          {offset > 0 ? (
            <button
              onClick={() => {
                PageMove(offset);
              }}
            >
              {offset}
            </button>
          ) : (
            <></>
          )}
          <button
            onClick={() => {
              PageMove(offset + 1);
            }}
          >
            {offset + 1}
          </button>
          <button
            onClick={() => {
              PageMove(offset + 2);
            }}
          >
            {offset + 2}
          </button>
          <button
            onClick={() => {
              PageMove(offset + 3);
            }}
          >
            {offset + 3}
          </button>
          <button
            onClick={() => {
              NextPage();
            }}
          >
            다음
          </button>
        </div>
      </LastTRCSS>
    </>
  );
};

export default LastTRComponents;
