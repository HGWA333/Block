import "./App.css";
import useWeb3 from "./useWeb3";
import { BreadShop } from "./BreadShop";
import { Token } from "./Token";

function App() {
  const [web3, account] = useWeb3();
  if (!account) return <>메타마스크 연결 해주세요</>;
  return (
    <div className="App">
      <BreadShop web3={web3} account={account} />
      <Token web3={web3} account={account} />
    </div>
  );
}

export default App;
