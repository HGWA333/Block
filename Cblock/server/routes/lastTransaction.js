const router = require("express").Router();
const db = require("../models/index");

router.post("/trList", async (req, res) => {
  console.log("trList실행예정", req);
  const LastTransactionList = await db.LastTransaction.findAll({
    include: [
      {
        model: db.LastBlock,
        order: [["id", "ASC"]],
      },
    ],
    offset: 5,
    limit: 5,
  });
  console.log("LastTransaction::::", LastTransactionList);
  console.log("trList실행했다.");
  res.send({
    msg: "LastTransactionList 보냄",
    lastTRData: LastTransactionList,
  });
});

module.exports = router;
