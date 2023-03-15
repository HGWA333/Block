import { SerachCSS } from "../../styleCSS/HeaderCSS";
const SearchComponents = ({
  onclick,
  setString,
  string,
  saveTx,
  saveBlock,
}) => {
  return (
    <>
      <SerachCSS>
        <input
          className="Text001"
          type="text"
          placeholder="입력"
          onChange={(e) => {
            setString(e.target.value);
            console.log(string);
          }}
        />
        <button
          className="Text002"
          onClick={() => {
            onclick(string);
          }}
        >
          Search
        </button>
      </SerachCSS>
      {saveBlock && saveTx ? (
        <SerachCSS>
          {saveBlock ? (
            <div className="Text001">
              Block Number:
              <span className="Text004">{saveBlock.blockNumber}</span>
            </div>
          ) : (
            <div></div>
          )}
          {saveTx ? (
            <div className="Text001">
              Transaction Hash:
              <span className="Text004">{saveTx.transactionHash}</span>
            </div>
          ) : (
            <div></div>
          )}
        </SerachCSS>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default SearchComponents;
