const router = require("express").Router();
const db = require("../models/index");

router.get("/test", async (req, res) => {
  console.log("test get 드루와");
  console.log("result 드루와", req.result);
  res.send("");
});
router.post("/test", async (req, res) => {
  console.log("test post 드루와");
  console.log("value 드루와", req.body.value);
  console.log("test 드루와", req.body.test);
  let Rtkdata = req.body.value + req.body.test;

  const RtkList = await db.Rtk.create({ rtkData: Rtkdata });
  const FindRtk = await db.Rtk.findOne({ where: { rtkData: Rtkdata } });

  console.log("FindRtk:::", FindRtk);
  res.send({ msg: "보냈다", FindRtk: FindRtk });
});

router.get("/undefined", async (req, res) => {
  console.log("undefined get 드루와");
  console.log("result 드루와", req.result);
  res.send("");
});
router.post("/undefined", async (req, res) => {
  console.log("undefined post 드루와");
  console.log("value 드루와", req.body.value);
  console.log("undefined 드루와", req.body.test);
  let Rtkdata = req.body.value + req.body.test;

  const RtkList = await db.Rtk.create({ rtkData: Rtkdata });
  const FindRtk = await db.Rtk.findOne({ where: { rtkData: Rtkdata } });

  console.log("FindRtk:::", FindRtk);
  res.send({ msg: "보냈다", FindRtk: FindRtk });
});

module.exports = router;
