import { List } from "./components/List";
import { Mint } from "./components/Mint";
import { useWeb3 } from "./modules/useWeb3";
import styled from "styled-components";

function App() {
  const { web3, chainId, account, logIn } = useWeb3();
  return (
    <div>
      <div>
        {account && web3 ? (
          <div>
            <div>ChainId : {chainId}</div>
            <div>Account : {account}</div>
            <Mint account={account} web3={web3} />
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                logIn();
              }}
            >
              MetaMask Log In
            </button>
          </div>
        )}
      </div>
      <TestStyle>
        <List account={account} />
      </TestStyle>
    </div>
  );
}

export default App;

export const TestStyle = styled.div`
  margin: auto;
  width: 80%;
`;
