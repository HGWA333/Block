import styled from "styled-components";

export const FooterCSS = styled.div`
  border-bottom: 2.1px solid black;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  padding-top: 41px;
  padding-bottom: 41px;
  .footerBox1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    font-size: 15px;
    div {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  .footerBox2 {
    padding-top: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footerItem001 {
      padding-right: 35px;
      font-size: 12px;
      div {
        padding: 3px;
        &:nth-child(1) {
          font-size: 23px;
        }
        &:nth-child(2) {
          font-size: 12px;
        }
      }
    }
  }
  .footerItem002 {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    div {
      padding: 8px;
      div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &:nth-child(1) {
          font-size: 18px;
        }
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5),
        &:nth-child(6),
        &:nth-child(7) {
          font-size: 12px;
        }
      }
    }
  }

  @media screen and (min-width: 1280px) {
  }

  @media screen and (max-width: 1010px) {
    border: 1px solid red;
    flex-direction: column;
    .footerBox1 {
      margin-top: 50px;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      div {
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
      }
    }
    .footerBox2 {
      margin-bottom: 50px;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .footerItem001 {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 10px;
        div {
          &:nth-child(1) {
            font-size: 20px;
          }
          &:nth-child(2) {
            font-size: 12px;
            border: 1px solid red;
          }
        }
      }
    }
    .footerItem002 {
      flex-direction: column;
      div {
        padding: 7px;
        div {
          flex-direction: column;
          &:nth-child(1) {
            font-size: 18px;
          }
          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5),
          &:nth-child(6),
          &:nth-child(7) {
            font-size: 12px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 360px) {
  }

  @media screen and (max-width: 280px) {
  }
`;
