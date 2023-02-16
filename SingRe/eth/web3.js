const web3 = new Web3("http://localhost:8080");

console.log("web3.eth:", web3.eth);

web3.eth.getAccounts().then((_account) => {
  document.getElementById("nowAccount").innerHTML = _account;
  _account.forEach((item, idx) => {
    web3.eth.getBalance(item).then((_balance) => {
      console.log(
        "_balance:",
        `(${idx})${item}(${web3.utils.fromWei(_balance)} Eth)`
      );
    });
  });
});

function test(data) {
  console.log(data);
}

let BlockNum = web3.eth.getBlockNumber().then((_data) => {
  console.log(_data - 1);

  const BlockLi = document.getElementById("BlockNum");
  _data.forEach((item) => {
    console.log("forEach item", item);
    BlockLi.innerHTML += `<a>${item}</a>`;
  });

  web3.eth
    .getBlock(_data, function (err, result) {
      if (!err) console.log(JSON.stringify(result).toString());
      else console.error(err);

      hash = result.hash;
      console.log("hash:", hash);
    })
    .then((result) => {
      (document.getElementById("BlockHeight").innerHTML = JSON.stringify(
        result.number
      )),
        (document.getElementById("Status").innerHTML = JSON.stringify(
          result.stateRoot
        )),
        (document.getElementById("Timestamp").innerHTML = JSON.stringify(
          result.timestamp
        )),
        (document.getElementById("Transactions").innerHTML = JSON.stringify(
          result.transactions
        )),
        (document.getElementById("GasUsed").innerHTML = JSON.stringify(
          result.gasUsed
        )),
        (document.getElementById("GasLimit").innerHTML = JSON.stringify(
          result.gasLimit
        )),
        (document.getElementById("BFPS").innerHTML = JSON.stringify(
          result.difficulty
        )),
        (document.getElementById("BF").innerHTML = JSON.stringify(
          result.difficulty
        )),
        (document.getElementById("ExtraData").innerHTML = JSON.stringify(
          result.extraData
        ));
    });
});

web3.eth.extend({
  property: "txpool",
  methods: [
    {
      name: "content",
      call: "txpool_content",
    },
    {
      name: "inspect",
      call: "txpool_inspect",
    },
    {
      name: "status",
      call: "txpool_status",
    },
  ],
});

web3.eth.txpool
  .status()
  .then(
    (_txPool) =>
      (document.getElementById("txPool").innerHTML = JSON.stringify(_txPool))
  )
  .catch(console.error);

// const account = async () => {
//   const accounts = await web3.eth.getAccounts();

//   for (let i = 0; i < accounts.length; ++i) {
//     const balanceWei = await web3.eth.getBalance(accounts[i]);
//     const balance = web3.utils.fromWei(balanceWei, "ether"); // "wei"

//     console.log("(" + i + ") " + accounts[i] + " (" + balanceWei + " Wei)"); // Wei
//     console.log("(" + i + ") " + accounts[i] + " (" + balance + " Eth)"); // Eth
//   }

//   document.getElementById("transacTion").onclick = async () => {
//     await request({
//       data: {
//         id: 1337,
//         jsonrpc: "2.0",
//         method: "personal_unlockAccount",
//         params: [accounts[0], "password"],
//       },
//     });
//     const transaction = await web3.eth.sendTransaction({
//       from: accounts[0],
//       to: accounts[1],
//       value: web3.utils.toWei("1"),
//     });
//     console.log("transaction:", transaction);
//     const transaction1 = await web3.eth.getTransaction(
//       transaction.transactionHash
//     );
//     console.log("transaction1:", transaction1);
//   };

//   const transaction = await web3.eth.getTransaction(
//     document.getElementById("txPool").innerHTML
//   );

//   console.log("getTransaction(transaction hash):", transaction);

//   document.getElementById("stop").onclick = async function () {
//     await request({
//       data: {
//         id: 1337,
//         jsonrpc: "2.0",
//         method: "miner_stop",
//       },
//     });
//   };
//   document.getElementById("start").onclick = async () => {
//     await request({
//       data: {
//         id: 1337,
//         jsonrpc: "2.0",
//         method: "miner_setEtherbase",
//         params: [accounts[0]],
//       },
//     });
//     await request({
//       data: {
//         id: 1337,
//         jsonrpc: "2.0",
//         method: "miner_start",
//       },
//     });
//   };
// };
// account();
