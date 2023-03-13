const express = require("express");
const cors = require("cors");

const Web3 = require("web3");
const BreadContract = require("./build/contracts/BreadShop.json");
const WGtokken = require("./build/contracts/WGtoken.json");
const web3 = new Web3("http://127.0.0.1:8545");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.post("/api/addBread", async (req, res) => {
  console.log("getBread 들어왔음");
  const networkId = await web3.eth.net.getId();
  const CA = BreadContract.networks[networkId].address;
  const abi = BreadContract.abi;
  const deployed = new web3.eth.Contract(abi, CA);
  const account = req.body.account;
  const value = req.body.value;
  const buyAmount = req.body.buyAmount;
  const sellAmount = req.body.sellAmount;
  const inputPrice = req.body.inputPrice;
  const priceDeployed = req.body.deployed;
  const obj = {};

  switch (req.body.method) {
    case "getBread":
      obj.getBread = await deployed.methods.getBread().call({ from: account });
      obj.getSender = await deployed.methods
        .getSender()
        .call({ from: account });
      obj.isOwner = await deployed.methods.isOwner().call({ from: account });
      obj.getPrice = await deployed.methods.getPrice().call({ from: account });
      obj.deployed = await deployed.methods;
      obj.CA = CA;
      break;

    case "buyBread":
      obj.nonce = await web3.eth.getTransactionCount(req.body.account);
      obj.to = CA;
      obj.value = value;
      obj.from = req.body.account;
      obj.data = await deployed.methods.buyBread(buyAmount).encodeABI();
      obj.buyBread = await deployed.methods.getBread().call({ from: account });
      break;

    case "sellBread":
      obj.nonce = await web3.eth.getTransactionCount(req.body.account);
      obj.to = CA;
      obj.from = req.body.account;
      obj.data = await deployed.methods.sellBread(sellAmount).encodeABI();
      console.log("sellBread::::", obj.data);
      obj.sellBread = await deployed.methods.getBread().call({ from: account });

      break;

    case "sendPrice":
      obj.nonce = await web3.eth.getTransactionCount(req.body.account);
      obj.to = CA;
      obj.from = req.body.account;
      obj.data = await deployed.methods
        .setPrice(web3.utils.toWei(inputPrice))
        .encodeABI();
      console.log("sendPrice::::", obj.data);
      obj.sendBread = await deployed.methods.getPrice().call({ from: account });
      obj.deployed = priceDeployed;

      break;

    default:
      break;
  }

  res.json(obj);
});

app.post("/api/isOwner", async (req, res) => {
  console.log("isOwner 들어왔음");
  const networkId = await web3.eth.net.getId();
  const CA = BreadContract.networks[networkId].address;

  const obj = {};

  switch (req.body.method) {
    case "isOwner":
      obj.Owner = await web3.utils.fromWei(await web3.eth.getBalance(CA));
      break;

    default:
      break;
  }

  res.json(obj);
});

app.post("/api/token", async (req, res) => {
  console.log("token 들어왔음");
  // const networkId = await web3.eth.net.getId();
  // const CA = WGtokken.networks[networkId].address;
  // const deployed = new web3.eth.Contract(abi, CA);

  // 여기서 하는 동작은 기존에 등록되어있는 CA를 수정하는 것이 아니라(* 기존에 등록되어 CA가 있는 상태면 deploy가 만들어져 있는 상태)
  // deploy를 최초 등록하는 것으로 트랜잭션을 발생 시킬 때 필요한 것은 account, 컨트랙트의 abi(data, arguments) 그리고 트랜잭션 발생 시 수수료 가스가 필요하다.
  // 서버에서 객체형태로 nonce, from, gas, data를 클라이언트에 보낸다. 그리고 클라이언트는 web3.eth.sendTransaction(서버에서 보낸 값)을 실행시키면 된다.

  const account = req.body.account;
  const abi = WGtokken.abi;
  const txObj = {
    data: WGtokken.bytecode,
    arguments: ["WGtoken", "WG", 10000],
  };
  const gas = 2000000;
  const contract = new web3.eth.Contract(WGtokken.abi);

  const obj = {};

  switch (req.body.method) {
    case "token":
      obj.nonce = await web3.eth.getTransactionCount(account);
      obj.from = account;
      obj.gas = gas;
      obj.data = await contract.deploy(txObj).encodeABI();
      break;

    default:
      break;
  }

  res.json(obj);
});

app.listen(8080, () => {
  console.log("8080 server open");
});
