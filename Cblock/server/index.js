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

app.post("/", async (req, res) => {
  // Last Block DB 생성
  let LastBlockNumBer = 0;
  let DBLastBlockNumBer = 0;

  try {
    DBLastBlockNumBer = await LastBlock.max("blockNumber");
    // console.log("DBLastBlockNumBer::::", DBLastBlockNumBer);
    LastBlockNumBer = (await web3.eth.getBlock("latest")).number;
    // console.log("LastBlockNumBer:::::", LastBlockNumBer);

    if (LastBlockNumBer > DBLastBlockNumBer) {
      web3.eth.getBlockNumber(async function (err, rtn) {
        let LastBlockNumBer = await rtn;

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
            transactions: LastBlockInfo.transactions,
          });
          console.log("LastBlockInfo:", LastBlockInfo);
          // console.log("i", i);
          // console.log("transactions::::::", LastBlockInfo.transactions);
        }

        await web3.eth.getBlockNumber(async (err, rtn) => {
          // var latestBlockNumber = await rtn;
          // console.log("latestBlockNumber:::::::::::::", latestBlockNumber);
          for (let i = 0; i <= rtn; i++) {
            await web3.eth.getBlockTransactionCount(
              i,
              true,
              async (err, cnt) => {
                // console.log("count:::::::::::::", cnt);
                // console.log("i:::::::::::::", i);
                if (cnt > 0) {
                  for (let j = 0; j < cnt; j++) {
                    await web3.eth.getTransactionFromBlock(
                      i,
                      j,
                      async (err, tx) => {
                        console.log("tx:::::::::::::::::::::::::::", tx);
                        const tempBlock = await db.LastBlock.findOne({
                          where: { blockNumber: tx.blockNumber },
                        });
                        // console.log("tempBlock:::::::::::::::::::::::::::", tempBlock);
                        // console.log(
                        //   "tempBlock.number:::::::::::::::::::::::::::",
                        //   tempBlock.blockNumber
                        // );
                        const checkTx = await db.LastTransaction.findOne({
                          where: { blockHeight: tempBlock.blockNumber },
                        });
                        // console.log("checkTx:::::::::::::::::::::::::::", checkTx);
                        if (!checkTx) {
                          const txAdd = await db.LastTransaction.create({
                            transactionHash: tx.blockHash,
                            blockHeight: tx.blockNumber,
                            from: tx.from,
                            to: tx.to,
                            hash: tx.hash,
                            nonce: tx.nonce,
                            transactionIndex: tx.transactionIndex,
                            value: tx.value,
                            r: tx.r,
                            s: tx.s,
                            v: tx.v,
                          });
                          tempBlock.addTransaction(txAdd);
                        }
                      }
                    );
                  }
                }
              }
            );
          }
        });
      });

      res.send({ isError: false });
    } else {
      console.log("새로고침 시 LastBlockNumBer가 더 큽니다. 예외처리");
    }
  } catch (error) {
    res.send({ isError: true });
  }
});

app.listen(8080, () => {
  console.log(8080 + " server start");
});
