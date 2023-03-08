const router = require("express").Router();

// const count = require("./count");
const contract = require("./contract");

// router.use("/count", count);
router.use("/contract", contract);

module.exports = router;
