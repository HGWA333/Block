const router = require("express").Router();
const db = require("../models/index");

router.post("/trList", async (req, res) => {
  const LastTransactionList = await db.LastTransaction.findAll({
    include: [
      {
        model: db.LastBlock,
        order: [["id", "ASC"]],
      },
    ],
    offset: req.body.offset,
    limit: req.body.limit,
  });

  res.send({
    msg: "LastTransactionList 보냄",
    lastTRData: LastTransactionList,
  });
});

router.post("/maxtr", async (req, res) => {
  const LastTransactionList = await db.LastTransaction.findAll({});
  res.send({
    msg: "LastTransactionList 보냄",
    lastTRData: LastTransactionList,
  });
});

module.exports = router;
