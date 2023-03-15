import React from "react";
import useWeb3 from "./useWeb3";
import Counter from "./Counter";

// 0x0657B9520DE293B1261994f719c5BF16810F211e [CA주소]

function App() {
  const [web3, account] = useWeb3();

  if (!account) return <h1> 메타마스크 설치 및 계정 연결 해주세요</h1>;

  return (
    <>
      <div>
        <h1>Account : {account}</h1>
        <Counter web3={web3} account={account} />
      </div>
    </>
  );
}

export default App;
