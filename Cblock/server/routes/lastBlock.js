const router = require("express").Router();
const db = require("../models/index");

router.post("/blList", async (req, res) => {
  const LastBlockList = await db.LastBlock.findAll({
    order: [["id", "DESC"]],
    offset: req.body.offset,
    limit: req.body.limit,
  });
  res.send({
    msg: "LastBlockList 보냄",
    lastBLData: LastBlockList,
  });
});

router.post("/maxtr", async (req, res) => {
  const LastBlock = await db.LastBlock.findAll();
  res.send({
    msg: "LastTransactionList 보냄",
    lastBLData: LastBlock,
  });
});

router.post("/search", async (req, res) => {
  console.log("stringstringstring:L::", +req.body.string);
  const BlockNumber = await db.LastBlock.findAll({
    where: { blockNumber: req.body.string },
  });
  const TransactionHash = await db.LastTransaction.findAll({
    where: { transactionHash: req.body.string },
  });
  console.log("TransactionHash:::::::::", TransactionHash);
  res.send({
    msg: "LastTransactionList 보냄",
    search: { BlockNumber, TransactionHash },
  });
});

module.exports = router;
