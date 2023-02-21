const router = require("express").Router();
const lastBlock = require("./lastBlock");
const lastTransaction = require("./lastTransaction");

router.use("/lb", lastBlock);
router.use("/lt", lastTransaction);

module.exports = router;
