import { newBlock } from "../../api";
import MainComponents from "./Components";

const MainContaniner = () => {
  newBlock({}).then((data) => {
    console.log(JSON.stringify(data));
  });

  return (
    <>
      <MainComponents />
    </>
  );
};
export default MainContaniner;
