import axios from "axios";
import { useEffect, useState } from "react";
export const Token = ({ web3, account }) => {
  const [contract, setContract] = useState();

  //   console.log(account);
  useEffect(() => {
    (async () => {
      const result = await axios.post("http://localhost:8080/api/token", {
        method: "token",
        account,
      });
      console.log(result.data);
      await web3.eth.sendTransaction(result.data);
    })();
  }, []);

  return (
    <>
      <div />
    </>
  );
};

export default Token;
