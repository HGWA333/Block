const router = require("express").Router();

const bread = require("./bread");

router.use("/bread", bread);

module.exports = router;
