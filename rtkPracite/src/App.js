import React from "react";
import useWeb3 from "./useWeb3";
import Word from "./components/test/WordTest";
import Counter from "./components/counter/Counter";
function App() {
  const [web3, account] = useWeb3();
  if (!account) return <h1> 메타마스크 설치 및 계정 연결 해주세요</h1>;
  return (
    <>
      <div>
        {/* <h1>Account : {account}</h1> */}
        <Counter web3={web3} account={account} />
      </div>
      <Word></Word>
    </>
  );
}

export default App;
