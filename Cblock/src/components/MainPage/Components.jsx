import SearchContainer from "../Serach/Container";
import EtherInfoContainer from "../EtherInfo/Container";
import BlockInfoContainer from "../BlockInfo/Container";
import BlockListContainer from "../BlockList/Container";
import FooterContainer from "../Footer/Container";
import LastBlockContainer from "../LastBlock/LastBlockContainer";
import { lastBlockList, lastTransactionList } from "../../api/index";
import { MainPageCSS } from "../../styleCSS/MainPageCSS";
import {
  ListBlockFlexCSS,
  ListBlockFlexCSS2,
  ListBlockFlexCSS3,
  ListBlockFlexCSS4,
} from "../../styleCSS/ListBlockFlexCSS";
import { useState, useEffect } from "react";

const MainComponents = () => {
  const [clickBlock, setClickBlock] = useState();
  const [lastBL, setLastBL] = useState([]);
  const [clickTR, setClickTR] = useState();
  const [lastTR, setLastTR] = useState([]);
  useEffect(() => {
    lastBlockList().then((lastBLData) => {
      setLastBL(lastBLData);
    });
  }, []);
  useEffect(() => {
    lastTransactionList().then((lastTRData) => {
      setLastTR(lastTRData);
    });
  }, []);
  return (
    <>
      <MainPageCSS>
        <EtherInfoContainer></EtherInfoContainer>
        <SearchContainer></SearchContainer>
        <BlockInfoContainer></BlockInfoContainer>
        <LastBlockContainer
          setClickBlock={setClickBlock}
          clickBlock={clickBlock}
          setClickTR={setClickTR}
          clickTR={clickTR}
        ></LastBlockContainer>
        <BlockListContainer
          setClickBlock={setClickBlock}
          clickBlock={clickBlock}
          setClickTR={setClickTR}
          clickTR={clickTR}
        ></BlockListContainer>
        <FooterContainer></FooterContainer>
      </MainPageCSS>
    </>
  );
};

export default MainComponents;
