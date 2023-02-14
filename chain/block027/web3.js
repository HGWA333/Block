const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

console.log("Web3:", Web3); // Web3는 Class  W는 대문자

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8080")); // Class라 new를 붙혀서 초기화

console.log("web3.eth:", web3.eth);

// forEach 아이템 전역으로 사용
let acc = "";

// then 사용시
web3.eth.getAccounts().then((_account) => {
  acc = _account;

  for (let i = 0; i < _account.length; ++i) {
    console.log(" _account:", _account[i]);
    _account[i];
  }

  //   forEach((item) => {
  //     console.log("getAccounts:", item);

  //     web3.eth.getBalance(item).then((_account) => {
  //       console.log(_account);
  //     });
  //   });
});

web3.eth.getAccounts().then((_account) => {
  _account.forEach((item, idx) => {
    web3.eth.getBalance(item).then((_balance) => {
      console.log(
        "_balance:",
        `(${idx})${item}(${web3.utils.fromWei(_balance)} Eth)`
      );
    });
  });
});

// const accT = async () => {
//   await acc;
// };
// accT();

// async 사용시 함수를 만들어서 async, await 사용
const account = async () => {
  const accounts = await web3.eth.getAccounts();
  //   accounts.forEach((account) => {
  //     console.log("accounts:", account);
  //   });
  // forEach에서는 async await 작동이 정상적으로 작동을 하지 않아  앞에 것을 사용하기 위해선 for문을 작성해서 사용 할 것.

  for (let i = 0; i < accounts.length; ++i) {
    const balanceWei = await web3.eth.getBalance(accounts[i]);
    const balance = web3.utils.fromWei(balanceWei, "ether"); // "wei"
    // utils는 여러가지 편의 메서드들을 가지고 있고 제공을 한다.
    // fromWei 는 Wei 단위의 금액을 다른 단위로 바꿔줌
    // 2번째 매개변수로 변환할 단위를 설정한다. 기본 값은 ether(두번째 매개변수에 값이 없을 경우.)
    console.log("(" + i + ") " + accounts[i] + " (" + balanceWei + " Wei)"); // Wei
    console.log("(" + i + ") " + accounts[i] + " (" + balance + " Eth)"); // Eth
  }

  document.getElementById("transacTion").onclick = async () => {
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "personal_unlockAccount",
        params: [accounts[0], "password"],
      },
    });
    const transaction = await web3.eth.sendTransaction({
      from: accounts[0],
      to: accounts[1],
      value: web3.utils.toWei("1"),
    });
    console.log("transaction:", transaction);
    const transaction1 = await web3.eth.getTransaction(
      transaction.transactionHash
    );
    console.log("transaction1:", transaction1);
  };

  const txpool = (
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "txpool_content",
        params: [],
      },
    })
  ).data.result;
  console.log("txpool:", txpool);

  console.log("web3.eth.txpool:", web3.eth.txpool);

  const transaction = await web3.eth.getTransaction(
    "0xfa82ee607580e41d4ba967e1e1ec5de003f137f7630f11c2cd403428c36136f8"
  );
  console.log("getTransaction(transaction hash):", transaction);

  //   blockHash : 트랜잭션이 포함된 블록의 hash
  //   blockNumber : 트랜잭션이 포함된 블록의 높이
  //   from : 보내는 사람
  //   gas : 가스 수수료
  //   gasPrice :
  //   hash :
  //   input :
  //   nonce : 블록에서는 nonce가 난이도 문제를 풀기 위해 시도한 횟수로 이건 트랜잭션의 nonce로 보낸 사람이 보낸 트랜잭션의 갯 수
  //   r :
  //   s :
  //   to : 받는 사람
  //   transactionIndex : 블록 내의 몇번째 트랜잭션인지
  //   v : RSV 전부 서명 관련 데이터로 sendTransaction 할 때 자동으로 서명을 해준다.
  //       서명을 허가해주는 기준은 unlock 할 때 서명을 허가하는 것으로 간주한다. MetaMask에서 계정을 로그인 했을 때 자동으로 unlock이 된다.
  //       메타마스크에서 보낼 때도 자동으로 서명을 한다.
  //   value : 보낸 코인 값

  document.getElementById("stop").onclick = async function () {
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_stop",
      },
    });
  };
  document.getElementById("start").onclick = async () => {
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_setEtherbase",
        params: [accounts[0]],
      },
    });
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_start",
      },
    });
  };
};
account();

// const transaction = await web3.eth.getTransaction("0x");
// console.log("transaction", transaction);

// Submitted transaction hash 값을 getTransaction에 넣는다.  web3.eth.getTransaction("0x")
