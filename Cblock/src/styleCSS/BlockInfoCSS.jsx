import styled from "styled-components";

export const BlockInfoCSS = styled.div`
border-bottom: 3.5px solid black;
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  flex-direction: row;
  flex-wrap: nowrap;
    & div {
      font-family: ffProExtraLight;
      font-size: 15px;
      & span {
        font-family: ffProMedium;
        font-size: 15px;
      }
    }
  }
  @media screen and (min-width: 1280px) {
  }

  @media screen and (max-width: 768px) {  
    justify-content: space-evenly;
    align-items: flex-start;
    flex-direction: column;
  }

  @media screen and (max-width: 360px) {
  }

  @media screen and (max-width: 280px) {
  }
`;
