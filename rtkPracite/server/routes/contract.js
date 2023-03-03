const router = require("express").Router();
const Web3 = require("web3");
const CounterContract = require("../contracts/Counter.json");
const web3 = new Web3("http://127.0.0.1:8545");

router.post("/CounterContract", async (req, res) => {
  console.log("CounterContract 들어왔다.");

  console.log("CounterContract", CounterContract);
  const networkId = await web3.eth.net.getId();
  const CA = CounterContract.networks[networkId].address;
  const abi = CounterContract.abi;

  const txObj = {
    networkId,
    abi,
    to: CA,
  };

  res.json(txObj);
});

router.post("/increment", async (req, res) => {
  const from = req.body.from;
  const nonce = await web3.eth.getTransactionCount(from);

  const networkId = await web3.eth.net.getId();
  const CA = CounterContract.networks[networkId].address;
  const abi = CounterContract.abi;

  const deployed = new web3.eth.Contract(abi, CA);
  const data = await deployed.methods.increment().encodeABI();

  const txObj = {
    nonce,
    from,
    to: CA,
    data,
  };

  res.json(txObj);
});

module.exports = router;
