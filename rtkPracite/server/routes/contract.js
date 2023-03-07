const router = require("express").Router();

router.post("/CounterContract", async (req, res) => {
  console.log("CounterContract 들어왔다.");
  //   console.log("CounterContract", CounterContract);
  //   const networkId = await web3.eth.net.getId();
  //   const CA = CounterContract.networks[networkId].address;
  //   const abi = CounterContract.abi;
  //   const deployed = new web3.eth.Contract(abi, CA);
  //   console.log("CA:::::", CA);
  //   console.log("abi:::::", abi);
  //   console.log("deployed:::::", deployed);
  //   const txObj = {
  //     networkId,
  //     abi,
  //     to: CA,
  //     deployed,
  //   };

  //   res.json(txObj);
});

module.exports = router;
