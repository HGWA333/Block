const router = require("express").Router();
const db = require("../models/index");

router.post("/blList", async (req, res) => {
  console.log("blList실행예정", req);

  const LastBlockList = await db.LastBlock.findAll({
    order: [["id", "DESC"]],
    offset: 5,
    limit: 5,
  });
  console.log("LastBlock::::", LastBlockList);
  console.log("blList실행했다.");
  res.send({
    msg: "LastBlockList 보냄",
    lastBLData: LastBlockList,
  });
});

module.exports = router;
