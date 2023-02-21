import SearchContainer from "../Serach/Container";
import EtherInfoContainer from "../EtherInfo/Container";
import BlockInfoContainer from "../BlockInfo/Container";
import BlockListContainer from "../BlockList/Container";
import LastBlContainer from "../LastBL/Container";
import LastTRContainer from "../LastTR/Container";
import FooterContainer from "../Footer/Container";
import { MainPageCSS } from "../../styleCSS/MainPageCSS";
import { ListBlockFlexCSS } from "../../styleCSS/ListBlockFlexCSS";

const MainComponents = () => {
  return (
    <>
      <MainPageCSS>
        <EtherInfoContainer></EtherInfoContainer>
        <SearchContainer></SearchContainer>
        <BlockInfoContainer></BlockInfoContainer>
        <ListBlockFlexCSS>
          <LastBlContainer></LastBlContainer>
          <LastTRContainer></LastTRContainer>
          <BlockListContainer></BlockListContainer>
        </ListBlockFlexCSS>
        <FooterContainer></FooterContainer>
      </MainPageCSS>
    </>
  );
};

export default MainComponents;
