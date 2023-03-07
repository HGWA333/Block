const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

const routes = require("./routes");
const db = require("./models");
const Web3 = require("web3");
const CounterContract = require("./build/contracts/Counter.json");

dotenv.config();
const app = express();
const web3 = new Web3("http://127.0.0.1:8545");

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "seed",
  })
);
app.use("/api", routes);

app.use("/", async (req, res, next) => {
  const networkId = await web3.eth.net.getId();

  global.CA = CounterContract.networks[networkId].address;
  const abi = CounterContract.abi;
  global.deployed = new web3.eth.Contract(abi, global.CA);

  next();
});

app.post("/api/count", async (req, res) => {
  console.log("count 들어왔다");
  const count = await global.deployed.methods.getCount().call();
  res.json({ count });
});

app.post("/api/ca", async (req, res) => {
  console.log("ca 들어왔다");
  res.json({ CA: global.CA });
});

app.post("/api/increment", async (req, res) => {
  console.log("increment 들어왔다");
  const from = req.body.from;
  const nonce = await web3.eth.getTransactionCount(from);
  const data = await global.deployed.methods.increment().encodeABI();

  const txObj = {
    nonce,
    from,
    to: global.CA,
    data,
  };
  res.json(txObj);
});

app.post("/api/decrement", async (req, res) => {
  const from = req.body.from;
  const nonce = await web3.eth.getTransactionCount(from);
  const data = await global.deployed.methods.decrement().encodeABI();

  const txObj = {
    nonce,
    from,
    to: global.CA,
    data,
  };

  res.json(txObj);
});

app.post("/api/CounterContract", async (req, res) => {
  const networkId = await web3.eth.net.getId();
  const CA = (global.CA = CounterContract.networks[networkId].address);
  const abi = CounterContract.abi;
  const deployed = (global.deployed = new web3.eth.Contract(abi, global.CA));
  const count = await global.deployed.methods.getCount().call();
  const data = await global.deployed.methods.decrement().encodeABI();
  const globalCA = global.CA;
  const txObj = {
    data,
    count,
    CA,
    networkId,
    abi,
    deployed,
    globalCA,
  };
  res.json(txObj);
});

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(8080, () => {
  console.log(8080 + " server start");
});
