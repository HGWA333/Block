import axios from "axios";
import { useState, useEffect } from "react";

export const BreadShop = ({ web3, account }) => {
  const [bread, setBread] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [price, setPrice] = useState([1, 1]);
  const [inputPrice, setInputPrice] = useState(1);
  const [CBalance, setCBalance] = useState(0);
  const [buyAmount, setBuyamount] = useState(1);
  const [sellAmount, setSellamount] = useState(0);
  const [deployed, setDeployed] = useState();

  useEffect(() => {
    (async () => {
      const result = await axios.post("http://localhost:8080/api/addBread", {
        method: "getBread",
        account,
      });
      setBread(result.data.getBread);
      setIsOwner(result.data.isOwner);

      const _temp = result.data.getSender;
      const _deployed = result.data.deployed;
      setDeployed(_deployed);

      const _price = result.data.getPrice;
      // console.log(_price);
      _price.map((item) => web3.utils.fromWei(item));
      setPrice(_price);
      setInputPrice(_price[0]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const result = await axios.post("http://localhost:8080/api/isOwner", {
        method: "isOwner",
      });
      console.log(result.data);
      if (isOwner) {
        (async () => {
          setCBalance(result.data.Owner);
        })();
      }
    })();
  }, [isOwner, price]);

  const buyBreadOnClick = async () => {
    const value = web3.utils.toWei((price[0] * buyAmount).toString());
    console.log("value", value);
    const result = await axios.post("http://localhost:8080/api/addBread", {
      method: "buyBread",
      account,
      value,
      buyAmount,
    });
    web3.eth.sendTransaction(result.data);
    setBread(result.data.buyBread);
  };

  const sellBreadOnClick = async () => {
    const result = await axios.post("http://localhost:8080/api/addBread", {
      method: "sellBread",
      account,
      sellAmount,
    });
    web3.eth.sendTransaction(result.data);
    setBread(result.data.sellBread);
  };
  const sendPriceOnClick = async () => {
    const result = await axios.post("http://localhost:8080/api/addBread", {
      method: "sendPrice",
      account,
      inputPrice,
      deployed,
    });
    web3.eth.sendTransaction(result.data);
    setBread(result.data.sendBread);

    const _price = result.data.deployed;
    _price.map((item) => web3.utils.fromWei(item));
    setPrice(_price);
    setInputPrice(_price[0]);
  };

  return (
    <>
      <div>
        <div>현재 빵 갯 수 : {bread}</div>
        {isOwner && (
          <>
            <div>
              <input
                type="number"
                step={1}
                min={0}
                value={inputPrice}
                onInput={(e) => {
                  setInputPrice(e.target.value);
                }}
              />{" "}
              <button onClick={sendPriceOnClick}>가격 조정</button>
            </div>
            <div>{CBalance} Ether 남음</div>
          </>
        )}
      </div>
      <div>
        <Input setState={setBuyamount} value={buyAmount} />{" "}
        {parseInt(price[0] * buyAmount * 10) / 1000} Ether{" "}
        <button onClick={buyBreadOnClick}>구매</button>
      </div>
      <div>
        <Input setState={setSellamount} value={sellAmount} max={bread} />{" "}
        {parseInt(price[1] * sellAmount * 10) / 1000} Ether{" "}
        <button onClick={sellBreadOnClick}>판매</button>
      </div>
    </>
  );
};

const Input = ({ setState, value, max }) => {
  const onInput = (e) => {
    setState(parseInt(e.target.value));
  };

  return (
    <input
      type="number"
      onInput={onInput}
      min={max === undefined ? 1 : 0}
      max={max}
      step={1}
      value={value}
    />
  );
};
