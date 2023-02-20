import Web3 from "web3";
import axios from "axios";
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8080"));
const wsWeb3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8088")
);

export default web3;

console.log("web3", web3.eth);

const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

const myRequestArgFunc = (_method, _params) => {
  return {
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: _method,
      params: [..._params],
    },
  };
};

async function getAccounts() {
  const accounts = await web3.eth.getAccounts();
  return accounts;
}

async function getBlock(_blockNum) {
  const curBlock = await web3.eth.getBlock(_blockNum);
  return curBlock;
}

async function getBlockNumber() {
  const blockNumber = await web3.eth.getBlockNumber();
  return blockNumber;
}

async function newBlockHeaders() {
  const newBlockHeader = await wsWeb3.eth
    .subscribe("newBlockHeaders", (error, result) => {
      if (!error) {
        console.log(result);
        return;
      }
      console.error(error);
    })
    .on("data", function (blockHeader) {
      console.log(blockHeader);
    });
}

export { getAccounts, getBlock, getBlockNumber, newBlockHeaders };
