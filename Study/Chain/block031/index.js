const Compiler = require("./compiler");
const Client = require("./web3");
// const temp = Compiler.compile("Test.sol");
// console.log("temp::::", temp);

const {
  Test: { abi, bytecode },
} = Compiler.compile("Test.sol");

const client = new Client("http://127.0.0.1:8545");

const txObj = { data: bytecode };

const contract = new client.web3.eth.Contract(abi);

// 스마트 컨트랙트 등록하는 과정
async function init() {
  const instance = await contract.deploy(txObj).send({
    from: "0x265D33a41aA3CB62C8CBD6dd6aFaf764c6Aea172",
    gas: 1000000,
  });
  console.log("instance:::::", instance);
  console.log("instance.options.address:::::", instance.options.address); // 콘솔에 찍힌 CA 주소를 찾는다.
  // '0x7cb32621bAAEA812D9308d13Ba5b0349A7b89A44' = CA 주소
}

// init();

async function test() {
  const accounts = await client.web3.eth.getAccounts(); // getAccounts()는 프라미스를 사용한 메서드 호출
  //   console.log("accounts:::", accounts.length);

  const ca = "0x7cb32621bAAEA812D9308d13Ba5b0349A7b89A44";
  const deployed = new client.web3.eth.Contract(abi, ca);

  let text = await deployed.methods.getText().call();
  console.log("Get text:::", text);

  await deployed.methods
    .setText("what is is")
    .send({ from: accounts[1], gas: 1000000 });
  text = await deployed.methods.getText().call();
  console.log("Set -> Get text:::", text);

  const balance = await client.web3.eth.getBalance(accounts[1]);
  console.log("balance:::::::", balance);
}
test();
