const router = require("express").Router();
const Web3 = require("web3");
const BreadContract = require("../build/contracts/BreadShop.json");
const web3 = new Web3("http://127.0.0.1:8545");

router.post("/addBread", async (req, res) => {
  console.log("getBread 들어왔음");
  const networkId = await web3.eth.net.getId();
  const CA = BreadContract.networks[networkId].address;
  const abi = BreadContract.abi;
  const deployed = new web3.eth.Contract(abi, CA);
  const obj = {};

  //   console.log("deployed::::", deployed);
  console.log("req.body::::", req.body);

  switch (req.body.method) {
    case "getBread":
      obj.getBread = await deployed.methods.getBread().call({ from: account });
      break;

    case "getSender":
      break;

    case "buyBread":
      break;

    case "sellBread":
      break;

    default:
      break;
  }

  res.json(obj);
});

module.exports = router;
