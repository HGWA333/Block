import LastBLContainer from "./LastBL/Container";
import LastTRContainer from "./LastTR/Container";
import { ListBlockFlexCSS3 } from "../../styleCSS/ListBlockFlexCSS";

const LastBlockContainer = ({
  clickBlock,
  setClickBlock,
  setClickTR,
  clickTR,
}) => {
  return (
    <>
      <ListBlockFlexCSS3>
        <LastBLContainer
          clickBlock={clickBlock}
          setClickBlock={setClickBlock}
        />
        <LastTRContainer setClickTR={setClickTR} clickTR={clickTR} />
      </ListBlockFlexCSS3>
    </>
  );
};

export default LastBlockContainer;
