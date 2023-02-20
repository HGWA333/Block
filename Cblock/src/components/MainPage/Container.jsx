import { lastBlock, lastTransaction, Search } from "../../api";
import MainComponents from "./Components";

const MainContaniner = () => {
  lastBlock({}).then((lastBlockData) => {
    console.log(JSON.stringify(lastBlockData));
  });

  lastTransaction({}).then((lastTransactionData) => {
    console.log(JSON.stringify(lastTransactionData));
  });

  Search({}).then((searchData) => {
    console.log(JSON.stringify(searchData));
  });

  return (
    <>
      <MainComponents />
    </>
  );
};
export default MainContaniner;
