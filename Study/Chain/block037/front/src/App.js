import "./App.css";
import Web3 from "web3";
import WGtokken from "./contracts/WGtoken.json";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    (async () => {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(WGtokken.abi);
      const [_account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const txObj = {
        data: WGtokken.bytecode,
        arguments: ["WGtoken", "WG", 10000],
      };
      const deployed = await contract.deploy(txObj).send({
        from: _account,
        gas: 2000000,
      });
      console.log(deployed.options.address);
    })();
  }, []);
  return <div className="App"></div>;
}

export default App;
