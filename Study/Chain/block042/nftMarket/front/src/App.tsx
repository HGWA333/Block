import { Mint } from "./component/Mint";
import { List } from "./component/List";
import { useWeb3 } from "./modules/useWeb3";
import styled from "styled-components";

function App() {
  const { chainId, account, logIn } = useWeb3();
  return (
    <>
      <div>
        <div>
          {account ? (
            <div>
              <div>ChainId : {chainId}</div>
              <div>Account : {account}</div>
              <TestStyle>
                <Mint />
              </TestStyle>
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
        <List />
      </div>
    </>
  );
}

export default App;

export const TestStyle = styled.div`
  padding: 50px;
`;
