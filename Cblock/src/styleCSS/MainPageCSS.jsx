import styled from "styled-components";
import "../fontCSS/Font.css";

export const MainPageCSS = styled.div`
  height: 100vh;
  width: 100vw;
  * {
    margin: 0;
    font-family: ffProBlack;
    box-sizing: border-box;
    background-color: #fbfbf6;
  }

  h1 {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    background-color: transparent;
    border: 0;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  a,
  button {
    cursor: pointer;
  }

  ul,
  ol {
    padding-left: 0;
    list-style: none;
  }

  .flexBlock {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  @media screen and (min-width: 1280px) {
  }

  @media screen and (max-width: 768px) {
    .flexBlock {
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-start;
    }
  }

  @media screen and (max-width: 360px) {
  }

  @media screen and (max-width: 280px) {
  }
`;
