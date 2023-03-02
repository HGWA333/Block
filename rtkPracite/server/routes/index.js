const router = require("express").Router();

const count = require("./count");

router.use("/count", count);

module.exports = router;
