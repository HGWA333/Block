const express = require("express");
const cors = require("cors");

const Web3 = require("web3");
const BreadContract = require("./build/contracts/BreadShop.json");
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
      obj.sellBread = await deployed.methods.getBread().call({ from: account });

      break;

    case "sendPrice":
      obj.nonce = await web3.eth.getTransactionCount(req.body.account);
      obj.to = CA;
      obj.from = req.body.account;
      obj.data = await deployed.methods
        .setPrice(web3.utils.toWei(inputPrice))
        .encodeABI();
      obj.sendBread = await deployed.methods.getPrice().call({ from: account });
      obj.deployed = priceDeployed;

      break;

    default:
      break;
  }

  res.json(obj);
});

app.post("/api/isOwner", async (req, res) => {
  console.log("getBread 들어왔음");
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

app.listen(8080, () => {
  console.log("8080 server open");
});
