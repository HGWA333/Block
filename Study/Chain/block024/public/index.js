const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8080",
  headers: { "content-type": "application/json" },
});
const walletListElem = document.getElementById("walletList");
const accountElem = document.getElementById("account");
const balanceElem = document.getElementById("balance");
const selectElem = document.getElementById("selectAccount");

let isCreating = false; // 계정 생성 버튼을 계속 눌렀을 때 생성 되는 것을 방지하는 기능 변수
let interval; // 잔액 실시간 업데이트를 위한 기능 변수
let accounts = [];

async function mineStop() {
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "miner_stop",
    },
  });
  clearInterval(interval);
  interval = undefined;
}

async function getBalance(_account) {
  const {
    data: { result },
  } = await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [_account, "latest"],
    },
  });
  balanceElem.innerHTML =
    parseInt(parseInt(result, 16) / Math.pow(10, 15)) / 1000;
}

async function getWallet(_account) {
  if (interval !== undefined) mineStop();
  // interval의 초기 값은 undefined 값이다. 그래서 interval이 undefined 값이 아니면, mineStop()을 한다.
  // 그말은 즉 지갑을 다른 것을 클릭 했을 때 채굴을 멈춘다.
  accountElem.innerHTML = _account;
  await getBalance(_account);
  selectElem.innerHTML = "";
  accounts.forEach((item) => {
    if (item !== _account)
      selectElem.innerHTML += `<option value="${item}">${item}</option>`;
  });
}

async function getAccounts() {
  const {
    data: { result }, // 구조분해 할당으로 데이터에 있는 result 값 만 가져오겠다.
  } = await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "eth_accounts",
    },
  });
  console.log(result);

  walletListElem.innerHTML = ""; // 정상적으로 result 값이 들어 오면 walletListElem의 빈 값을 넣어주고
  result.forEach((item) => {
    walletListElem.innerHTML += `<li onclick="getWallet('${item}')">${item}</li>`; // result의 값만 innerHTML에 넣어준다. // 만약   walletListElem.innerHTML 이것을 빈 값으로 초기화를 하지 않을 경우 함수를 여러번 불렀을 때 result 값이 호출한 만큼 중복 되어 표기를 한다.
  });
  accounts = result; //  빈 배열 accounts에 result를 넣어준다. (데이터를 저장하는 의미)
}

getAccounts();
mineStop();

document.forms["newWallet"].onsubmit = async function (e) {
  e.preventDefault();
  if (e.target["newPw"].value.length < 5 || isCreating) return; // 조건문이 실행이 되면
  isCreating = true; // isCreating는 true 값으로 전환
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "personal_newAccount",
      params: [e.target["newPw"].value],
    },
  });
  e.target["newPw"].value = "";
  await getAccounts();

  isCreating = false; // 계정 생성 이후 false로 전환하여 계정 생성 못하게 한다.
};

document.getElementById("mineStart").onclick = async function () {
  if (accountElem.innerHTML === "") return;
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "miner_setEtherbase",
      params: [accountElem.innerHTML],
    },
  });
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "miner_start",
    },
  });
  interval = setInterval(() => {
    getBalance(accountElem.innerHTML);
  }, 2000);
};
document.getElementById("mineStop").onclick = mineStop;

document.forms["transacTion"].onsubmit = async function (e) {
  e.preventDefault();
  let to = selectElem.value;
  // to는 html의 id selectAccount (받는 사람)의 입력 값으로 초기화
  if (e.target["transacTionAccount"].value)
    // html의 transacTionAccount (보내는 사람)의 입력 값이 들어 왔을 경우
    to = e.target["transacTionAccount"].value;
  // to는 transacTionAccount (보내는 사람)의 입력 값으로 초기화

  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "personal_unlockAccount",
      params: [accountElem.innerHTML, e.target["tranPw"].value],
    },
  });

  const data = await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "eth_sendTransaction",
      params: [
        {
          from: accountElem.innerHTML,
          to: selectElem.value,
          value:
            "0x" + (+e.target["ether"].value * Math.pow(10, 18)).toString(16),
        },
      ],
    },
  });
  console.log("data:", data);
};

document.forms["selectMeta"].onsubmit = function (e) {
  e.preventDefault();
  getWallet(e.target["meta"].value);
};

// ------------------------------metamask 지갑----------------------------

let MetaAccounts;
let MetaArr = [];

const MetaWalletElem = document.getElementById("MetaWalletList");
const BalanceListElem = document.getElementById("BalanceList");
const enableEthElem = document.getElementById("enableEth");
const checkEthBalanceElem = document.getElementById("checkEthBalance");
const sendTransactionElem = document.getElementById("sendTransaction");

window.onload = function () {
  // 지갑 변경 시 handleAccountsChanged 함수 호출,
  if (window.ethereum) {
    this.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum
      .request({ method: "eth_accounts" })
      .then(handleAccountsChanged)
      .catch((err) => {});
  } else {
    alert("메타 마스크 설치 하시오");
  }
};

const handleAccountsChanged = (_acc) => {
  // 변경된 지갑 주소
  MetaAccounts = _acc;

  // 지갑이 연결된 상태인 경우
  if (MetaAccounts && MetaAccounts.length > 0) {
    // connectwallet 버튼 숨김
  } else {
  }
};
// METAMASK 계정 조회
document.getElementById("enableEth").onclick = async function () {
  MetaAccounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      console.log(err.code);
    });

  MetaWalletElem.innerHTML = "";
  console.log(MetaAccounts);
  MetaAccounts.forEach((item) => {
    MetaWalletElem.innerHTML += `<h2 onclick="getWallet('${item}')">${item}</h2>`; // result의 값만 innerHTML에 넣어준다. // 만약   walletListElem.innerHTML 이것을 빈 값으로 초기화를 하지 않을 경우 함수를 여러번 불렀을 때 result 값이 호출한 만큼 중복 되어 표기를 한다.
  });
};

// METAMASK 연결된 계정의 잔액 조회
document.getElementById("checkEthBalance").onclick = async function () {
  let balance = await window.ethereum
    .request({ method: "eth_getBalance", params: [MetaAccounts[0], "latest"] })
    .catch((err) => {
      console.log(err);
    });

  balance = parseInt(parseInt(balance, 16) / Math.pow(10, 15)) / 1000;

  BalanceListElem.innerHTML = "";
  balance =
    BalanceListElem.innerHTML += `<h2 onclick="getWallet('${balance}')">${balance}</h2>`; // result의 값만 innerHTML에 넣어준다. // 만약   walletListElem.innerHTML 이것을 빈 값으로 초기화를 하지 않을 경우 함수를 여러번 불렀을 때 result 값이 호출한 만큼 중복 되어 표기를 한다.
};
