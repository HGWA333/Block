import BreadShopContract from "./contracts/BreadShop.json";
import { useState, useEffect } from "react";

export const BreadShop = ({ web3, account }) => {
  const [bread, setBread] = useState(0);
  const [deployed, setDeployed] = useState();
  const [CA, setCA] = useState();

  const constructor = async () => {
    if (!web3) return;

    const networkdId = await web3.eth.net.getId();
    const _CA = BreadShopContract.networks[networkdId].address;
    const abi = BreadShopContract.abi;
    console.log("_CA", _CA); //  터미널에서 npx truffle console 명령어 실행 후 web3.eth.getBalance('CA주소')

    const _deployed = new web3.eth.Contract(abi, _CA);
    setCA(_CA);
    setDeployed(_deployed);

    const _bread = await _deployed.methods.getBread().call({ from: account });
    setBread(_bread);

    const temp = await _deployed.methods.getSender().call({ from: account }); // 코인베이스 확인
    console.log("temp", temp); // 터미널에서 npx truffle console 명령어 실행 후 web3.eth.getCoinbase()로 확인
  };

  const buy = async () => {
    await deployed.methods
      .buyBread()
      .send({ from: account, to: CA, value: web3.utils.toWei("1") });

    const _bread = await deployed.methods.getBread().call({ from: account });
    setBread(_bread);
  };

  const sell = async () => {
    await deployed.methods.sellBread().send({ from: account, to: CA });

    const _bread = await deployed.methods.getBread().call({ from: account });
    setBread(_bread);
  };

  useEffect(() => {
    constructor();
  }, []);
  return (
    <>
      <div>현재 빵 갯 수 :{bread} </div>
      <button onClick={buy}>구매</button>
      <button onClick={sell}> 판매 </button>
    </>
  );
};
