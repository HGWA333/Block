const router = require("express").Router();
const lastBlock = require("./lastBlock");
const lastTransaction = require("./lastTransaction");
const search = require("./search");

router.use("/lastBlock", lastBlock);
router.use("/lastTransaction", lastTransaction);
router.use("/search", search);

module.exports = router;
