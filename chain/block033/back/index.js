// back 설정시 설치 라이브러리 back server 폴더에 설치
// npm i express cors truffle web3
// npm i -D prettier-plugin-solidity
// npm i -D nodemon

// 위 라이브러리 설치 후 아래 명령어 터미널에서 실행
// npx truffle init

const express = require("express");
const cors = require("cors");
const Web3 = require("web3");
const CounterContract = require("./build/contracts/Counter.json");

const app = express();
const web3 = new Web3("http://127.0.0.1:8545");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.post("/api/increment", async (req, res) => {
  const from = req.body.from;

  const nonce = await web3.eth.getTransactionCount(from); // const noce는 블록체인 네트워크에서 받아오는 noce
  // nonce는 트랜잭션 갯 수로 매개변수로 전달된 지갑 주소의 Transaction 갯 수를 다음 트랜잭션에서 확인하기 때문이다. 생성된 트랜잭션들은 순서가 있다.
  // 메타마스크에서 다른 계정에 Ether를 보내고 채굴을 했을 때 정상작동을 하지 않는 경우가 있다. 그것은 그 지갑 주소의 트랜잭션이 순서대로 생성이 되지 않았을 때 발생한다.
  // 메타마스크에서 3개의 트랜잭션을 기억하고 있고 이후 다음 noce로 3 값으로 전달 되었는데, Ganache는 새로 시작해서 그 지갑 주소의 트랜잭션이 없을 때는 nonce가 0이어야 하지만 메타마스크 기준 3의 값으로 전달된다. 이럴 땐 정상적인 트랜잭션이 아니라고 판단하여 블록에 추가되지 않는 것이다.
  // 그래서 noce를 초기화 하여 사용

  // 필요한 것들 만드는 과정
  const networkId = await web3.eth.net.getId();
  const CA = CounterContract.networks[networkId].address;
  const abi = CounterContract.abi;

  const deployed = new web3.eth.Contract(abi, CA);
  const data = await deployed.methods.increment().encodeABI(); // const data는 트랜잭션을 바로 보내는(send) 것이 아닌 bytecode 형식으로 변환하여 data에 포함시킨다.

  // 필요한 것을 만든후 txObj에 객체로 프론트에 보낸다.
  const txObj = {
    nonce,
    from,
    to: CA,
    data,
  };
  // console.log(txObj);
  res.json(txObj);
});

// app.post("/api/decrement", async (req, res) => {
//   const from = req.body.from;

//   const noce = await web3.eth.getTransactionsCOunt(from); // const noce는 블록체인 네트워크에서 받아오는 noce
//   // nonce는 트랜잭션 갯 수로 매개변수로 전달된 지갑 주소의 Transaction 갯 수를 다음 트랜잭션에서 확인하기 때문이다. 생성된 트랜잭션들은 순서가 있다.
//   // 메타마스크에서 다른 계정에 Ether를 보내고 채굴을 했을 때 정상작동을 하지 않는 경우가 있다. 그것은 그 지갑 주소의 트랜잭션이 순서대로 생성이 되지 않았을 때 발생한다.
//   // 메타마스크에서 3개의 트랜잭션을 기억하고 있고 이후 다음 noce로 3 값으로 전달 되었는데, Ganache는 새로 시작해서 그 지갑 주소의 트랜잭션이 없을 때는 nonce가 0이어야 하지만 메타마스크 기준 3의 값으로 전달된다. 이럴 땐 정상적인 트랜잭션이 아니라고 판단하여 블록에 추가되지 않는 것이다.
//   // 그래서 noce를 초기화 하여 사용

//   const networkId = await web3.eth.net.getId();
//   const CA = CounterContract.networks[networkId].address;
//   const abi = CounterContract.abi;
//   const deployed = new web3.eth.Contract(abi, CA);
//   const data = await deployed.methods.increment().encodeABI(); // const data는 트랜잭션을 바로 보내는(send) 것이 아닌 bytecode 형식으로 변환하여 data에 포함시킨다.
//   const txObj = {
//     noce,
//     from,
//     to: CA,
//     data,
//   };
//   res.json(txObj);
// });

app.listen(8080, () => {
  console.log("server 8080");
});
