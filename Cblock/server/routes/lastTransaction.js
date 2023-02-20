const router = require("express").Router();
const { LastTransaction } = require("../models/transaction");

router.post("/hash", async (req, res) => {
  const LastTransaction = await LastTransaction.findOne({ transactionHash });
});

module.exports = router;
