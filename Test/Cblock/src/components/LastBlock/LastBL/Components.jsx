import { LastBLCSS } from "../../../styleCSS/LsatBlockCSS";
const LastBLComponents = ({
  lastBL,
  NextPage,
  PrevPage,
  PageMove,
  offset,
  setClickBlock,
  clickBlock,
}) => {
  console.log("lastBL", lastBL);

  return (
    <>
      <LastBLCSS>
        {lastBL?.map((item, index) => (
          <div
            key={`BL-${index}`}
            className="alignContent"
            onClick={(e) => {
              e.preventDefault();
              setClickBlock(item);
            }}
          >
            <span className="SpanText001">Latest Blocks</span>
            <div className="wordBreak">
              Block Height:
              <span> {item.blockNumber}</span>
            </div>
            <div className="wordBreak">
              Gas Limit:
              <span> {item.gasLimit}</span>
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
        <div className="pageButton1">
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
          </button>{" "}
          <button
            onClick={() => {
              NextPage();
            }}
          >
            다음
          </button>
        </div>
      </LastBLCSS>
    </>
  );
};

export default LastBLComponents;
