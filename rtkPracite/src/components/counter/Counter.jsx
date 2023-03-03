import { useState, useEffect } from "react";
import axios from "axios";
// 0xF1976836a4aB3BF78AF752BA724b5d3E40c150B1   [CA주소]
const Counter = ({ web3, account }) => {
  const [count, setCount] = useState(0);
  const [deployed, setDeployed] = useState();

  useEffect(() => {
    (async () => {
      if (deployed) return;

      const CounterContract = (
        await axios.post(
          "http://localhost:8080/api/contract/CounterContract",
          {}
        )
      ).data;

      // console.log("CounterContract", CounterContract);
      const networkId = CounterContract.networkId;
      // console.log("networkId", networkId);
      const CA = CounterContract.to;
      const abi = CounterContract.abi;
      const _deployed = new web3.eth.Contract(abi, CA);
      setDeployed(_deployed);
      // console.log("매개변수 _deployed", _deployed);

      const _count = await _deployed.methods.current().call();
      setCount(parseInt(_count));
      // console.log("매개변수 _count", _count);

      web3.eth.subscribe("logs", { address: CA }).on("data", (log) => {
        // console.log("들어왔다.");
        console.log(log);
        const params = [{ type: "uint256", name: "count" }];
        const value = web3.eth.abi.decodeLog(params, log.data);
        console.log(value);
        setCount(value.count);
      });
    })();
  }, []);

  const increment = async () => {
    const data = (
      await axios.post("http://localhost:8080/api/contract/increment", {
        from: account,
      })
    ).data;
    console.log("from : account", data);
    await web3.eth.sendTransaction(data);
  };
  const decrement = async () => {
    const result = await deployed.methods.decrement().send({ from: account });
  };
  return (
    <>
      <div>
        <h2>Count:{count}</h2>
        <button
          onClick={() => {
            increment();
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            decrement();
          }}
        >
          -
        </button>
      </div>
    </>
  );
};

export default Counter;
