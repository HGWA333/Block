const router = require("express").Router();

router.get("/egoing", async (req, res) => {
  console.log("egoing get 드루와");
  console.log("result 드루와", req.result);
  res.send("");
});
router.post("/egoing", async (req, res) => {
  console.log("egoing post 드루와");
  console.log("value 드루와", req.body.value);
  console.log("test 드루와", req.body.test);
  let data = req.body.value;
  res.send({ msg: "보냈다", data: data });
});

router.get("/jane", async (req, res) => {
  console.log("jane get 드루와");
  res.send("");
});
router.post("/jane", async (req, res) => {
  console.log("jane post 드루와");
  let data = JSON.stringify(req.body.value);
  console.log("data:::", data);
  res.send({ msg: "보냈다", data: data });
});

router.get("/steve", async (req, res) => {
  console.log("steve 드루와");
  res.send("");
});
router.post("/steve", async (req, res) => {
  console.log("steve 드루와");
  let data = req.body.value;
  console.log("data:::", data);
  res.send({ msg: "보냈다", data: data });
});

module.exports = router;
