const express = require("express");
const Web3 = require("web3");

const app = express();
const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8088")
);

web3.eth.subscribe("newBlockHeaders", (err, result) => {
  if (!err) {
    console.log(result);
  }
});

app.listen(8080, () => {
  console.log("blcok client 8080 server open");
});
