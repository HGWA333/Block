import styled from "styled-components";

export const ListBlockFlexCSS = styled.div`
  border-bottom: 7px solid black;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;

  @media screen and (min-width: 1280px) {
  }

  @media screen and (max-width: 1010px) {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }

  @media screen and (max-width: 360px) {
  }

  @media screen and (max-width: 280px) {
  }
`;
