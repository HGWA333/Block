import { useState, useEffect } from "react";
import CounterContract from "./contracts/Counter.json";
import axios from "axios";
// 0xF1976836a4aB3BF78AF752BA724b5d3E40c150B1   [CA주소]
const Counter = ({ web3, account }) => {
  const [count, setCount] = useState(0);
  const [deployed, setDeployed] = useState();

  useEffect(() => {
    (async () => {
      if (deployed) return;

      const networkId = await web3.eth.net.getId();
      const CA = CounterContract.networks[networkId].address;
      const abi = CounterContract.abi;
      const _deployed = new web3.eth.Contract(abi, CA);
      setDeployed(_deployed);
      console.log("매개변수 _deployed", _deployed);

      const _count = await _deployed.methods.current().call();
      setCount(parseInt(_count));
      console.log("매개변수 _count", _count);

      // .sol 에서 등록한 event 사용한 것을 프론트에서 사용 하는 방법
      web3.eth.subscribe("logs", { address: CA }).on("data", (log) => {
        console.log("들어왔다.");
        // subscribe 메서드를 사용해서 블록체인 네트워크에 구독하는 것으로 이벤트 명은 logs이다.
        // Solidity에서 event 이벤트명(로그를 남길 데이터/변수)를 선언하고 로그를 남길 순간에 emit으로 구독한 서버에 알린다.
        // emit으로 전달될 데이터는 log.data에 들어있다.
        // subscribe의 두번째 매개변수에 옵션을 추가할 수 있고, 그 옵션은 address 옵션은 해당 주소에 대해서만 logs를 받는다.
        console.log(log);

        const params = [{ type: "uint256", name: "count" }]; // .sol에 event Count(int256 _count)로 등록한 부분 중 int256 _count에 관한 내용
        // params는 Solidity에서 event 선언 시 전달하는 매개변수이다.
        const value = web3.eth.abi.decodeLog(params, log.data);
        console.log(value);
        setCount(value.count);
      });
    })();
  }, []);

  const increment = async () => {
    {
      // const result = await deployed.methods.increment().send({ from: account });
      // if (!result) return;
      // const _count = await deployed.methods.current().call();
      // setCount(parseInt(_count));
    }
    const data = (
      await axios.post("http://localhost:8080/api/increment", {
        from: account,
      })
    ).data;
    console.log("from : account", data);

    await web3.eth.sendTransaction(data);
  };
  const decrement = async () => {
    {
      // const result = await deployed.methods.decrement().send({ from: account });
      // if (!result) return;
      // const _count = await deployed.methods.current().call();
      // setCount(parseInt(_count));
    }
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
