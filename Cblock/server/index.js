const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

const routes = require("./routes");
const db = require("./models");

const LastBlock = require("./models/block");
const LastTransaction = require("./models/transaction");
const Search = require("./models/search");

const Web3 = require("web3");
const web3 = new Web3("http://localhost:8088");

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
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

app.post("/lastblock", async (req, res) => {
  // Last Block DB 생성
  const accounts = await web3.eth.getAccounts();
  try {
    web3.eth.getBlockNumber(async function (err, rtn) {
      let LastBlockNumBer = rtn;

      for (let i = 0; i <= LastBlockNumBer; i++) {
        const LastBlockInfo = await web3.eth.getBlock(i);

        await LastBlock.create({
          difficulty: LastBlockInfo.difficulty,
          extraData: LastBlockInfo.extraData,
          gasLimit: LastBlockInfo.gasLimit,
          gasUsed: LastBlockInfo.gasUsed,
          hash: LastBlockInfo.hash,
          nonce: LastBlockInfo.nonce,
          blockNumber: LastBlockInfo.number,
          parenthash: LastBlockInfo.parenthash,
          size: LastBlockInfo.size,
          timestamps: LastBlockInfo.timestamps,
          totaldifficulty: LastBlockInfo.totaldifficulty,
          transactionsroot: LastBlockInfo.transactionsroot,
        });
        console.log("LastBlockInfo:", LastBlockInfo);
        console.log("i", i);
      }
    });

    res.send({ isError: false });
  } catch (error) {
    res.send({ isError: true });
  }
});

app.post("/lastTransaction", async (req, res) => {
  // Last Transaction DB 생성

  try {
    web3.eth.getBlockNumber(async function (err, rtn) {
      let LastBlockNumBer = rtn;

      for (let i = 0; i <= LastBlockNumBer; i++) {
        const LastBlockInfo = await web3.eth.getTransaction(i);

        await LastTransaction.create({
          transactionHash: LastBlockInfo.difficulty,
          block: LastBlockInfo.extraData,
          timestamp: LastBlockInfo.gasLimit,
          from: LastBlockInfo.gasUsed,
          to: LastBlockInfo.hash,
          value: LastBlockInfo.nonce,
          transactionFee: LastBlockInfo.number,
          gasPrice: LastBlockInfo.parenthash,
        });
        console.log("LastBlockInfo", LastBlockInfo);
      }
    });

    res.send({ isError: false });
  } catch (error) {
    res.send({ isError: true });
  }
});

app.post("/search", async (req, res) => {
  // localhost:3000 접속 했을 때  Last Block 그리고 Last Transaction의 DB 생성

  try {
  } catch (error) {
    res.send({ isError: true });
  }
});

app.listen(8080, () => {
  console.log(8080 + " server start");
});
