import LastBlComponents from "../LastBL/Components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useState } from "react";
const LastBlContainer = () => {
  const [lastBlock, setLastBlock] = useState("");

  const lastBlockHandle = () => {};

  return (
    <>
      <LastBlComponents></LastBlComponents>
    </>
  );
};

export default LastBlContainer;
