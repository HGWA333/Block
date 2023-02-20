const router = require("express").Router();
const { LastBlock } = require("../models/block");

router.post("/number", async (req, res) => {
  const LastBlock = await LastBlock.findOne({ hash });
});

module.exports = router;
