const keythereum = require("keythereum");
const path = require("path");

const address = "e968f4cbe4f0a034d5145ff673466364efc94e1d";

const keyObj = keythereum.importFromFile(address, __dirname);

const privateKey = keythereum.recover("1", keyObj);

console.log("privateKey.toString::::", privateKey.toString("hex"));
