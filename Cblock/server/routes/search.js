const router = require("express").Router();
const { Search } = require("../models/search");

router.post("/address", async (req, res) => {
  const address = await Search.findOne({ address });
});
router.post("/token", async (req, res) => {
  const token = await Search.findOne({ token });
});
router.post("/nametag", async (req, res) => {
  const nametag = await Search.findOne({ nametag });
});

module.exports = router;
