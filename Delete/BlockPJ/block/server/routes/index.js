const router = require("express").Router();
const lastblock = require("./lastblock");

router.use("/lastblock", lastblock);

module.exports = router;
