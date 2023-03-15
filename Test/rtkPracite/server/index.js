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
const VoteContract = require("./build/contracts/Vote.json");
dotenv.config();
const web3 = new Web3("http://127.0.0.1:8545");
const app = express();

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

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.post("/api/send", async (req, res) => {
  console.log("voteSend 들어왔음");
  const networkId = await web3.eth.net.getId();
  const CA = VoteContract.networks[networkId].address;
  const abi = VoteContract.abi;
  const deployed = new web3.eth.Contract(abi, CA);
  const obj = {};
  console.log("totalVotesFor::::", req.body.item);
  switch (req.body.method) {
    case "candidates":
      obj.candidates = await deployed.methods.candidates().call();
      break;

    case "totalVotesFor":
      obj.totalVotesFor = await deployed.methods
        .totalVotesFor(req.body.item)
        .call();
      obj.CA = CA;
      break;

    case "voteForCandidate":
      obj.nonce = await web3.eth.getTransactionCount(req.body.from);
      obj.to = CA;
      obj.from = req.body.from;
      obj.data = await deployed.methods
        .voteForCandidate(req.body.candidate)
        .encodeABI();
      break;

    default:
      break;
  }

  res.json(obj);
});

app.listen(8080, () => {
  console.log(8080 + " server start");
});
