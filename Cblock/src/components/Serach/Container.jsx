import SearchComponents from "../Serach/Components";
import { SearchList } from "../../api/index";
import { useState } from "react";
const SearchContainer = () => {
  const [string, setString] = useState();
  const [saveBlock, setSaveBlock] = useState();
  const [saveTx, setSaveTx] = useState([]);

  const onclick = (string) => {
    SearchList({ string }).then((search) => {
      console.log("search", search.BlockNumber);
      if (search.BlockNumber.length == 1) {
        setSaveBlock(search.BlockNumber[0]);
      } else if (search.TransactionHash.length == 1) {
        setSaveTx(search.TransactionHash[0]);
      } else {
        console.log("msg 나중에 추가 ");
      }
    });
  };

  return (
    <>
      <SearchComponents
        onclick={onclick}
        setString={setString}
        string={string}
        saveBlock={saveBlock}
        saveTx={saveTx}
      ></SearchComponents>
    </>
  );
};

export default SearchContainer;
