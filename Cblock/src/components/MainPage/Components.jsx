import SearchContainer from "../Serach/Container";
import EtherInfoContainer from "../EtherInfo/Container";
import BlockInfoContainer from "../BlockInfo/Container";
import BlockListContainer from "../BlockList/Container";
import LastBlContainer from "../LastBL/Container";
import LastTRContainer from "../LastTR/Container";
import FooterContainer from "../Footer/Container";
import { MainPageCSS } from "../../styleCSS/MainPageCSS";
import {
  ListBlockFlexCSS,
  ListBlockFlexCSS2,
  ListBlockFlexCSS3,
  ListBlockFlexCSS4,
} from "../../styleCSS/ListBlockFlexCSS";

const MainComponents = () => {
  return (
    <>
      <MainPageCSS>
        <EtherInfoContainer></EtherInfoContainer>
        <SearchContainer></SearchContainer>
        <BlockInfoContainer></BlockInfoContainer>
        <ListBlockFlexCSS3>
          <LastBlContainer></LastBlContainer>
          <LastTRContainer></LastTRContainer>
        </ListBlockFlexCSS3>
        <BlockListContainer></BlockListContainer>
        <FooterContainer></FooterContainer>
      </MainPageCSS>
    </>
  );
};

export default MainComponents;
