import styled from "styled-components";

export const FooterCSS = styled.div`
  border-top: 2.8px solid black;
  border-bottom: 7px solid black;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 280px;
  .footerBox1 {
    font-size: 15px;
    div {
    }
  }
  .footerBox2 {
    .footerItem001 {
      font-size: 12px;
      div {
        padding: 3px;
        &:nth-child(1) {
          font-family: ffProMedium;
          font-size: 23px;
        }
        &:nth-child(2) {
          font-family: ffProExtraLight;
          font-size: 12px;
        }
      }
    }
  }
  .footerItem002 {
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      margin-right: 185px;
      padding-top: 8px;
      padding-bottom: 8px;

      div {
        cursor: pointer;
        &:nth-child(1) {
          font-family: ffProMedium;
          font-size: 18px;
        }
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5),
        &:nth-child(6),
        &:nth-child(7) {
          font-family: ffProLight;
          font-size: 12px;
        }
      }
    }
  }

  @media screen and (min-width: 1600px) {
  }

  @media screen and (max-width: 1480px) {
  }

  @media screen and (max-width: 360px) {
  }

  @media screen and (max-width: 280px) {
  }
`;
