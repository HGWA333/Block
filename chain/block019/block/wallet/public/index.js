const addressLi = document.getElementById("walletAddress");
const publicKeyLi = document.getElementById("walletPublicKey");
const privateKeyLi = document.getElementById("walletPrivateKey");
const balanceLi = document.getElementById("walletBalance");

const info = (_wallet) => {
  console.log("2-9/4-10 전달받은 지갑 정보(data)를 웹페이지에 출력");

  addressLi.innerHTML = _wallet.address;
  publicKeyLi.innerHTML = _wallet.publicKey;
  privateKeyLi.innerHTML = _wallet.privateKey;
  balanceLi.innerHTML = _wallet.balance;
};

document.getElementById("newWalletAddBtn").onclick = () => {
  // 지갑 클릭 했을 때
  console.log("2-1 지갑 생성 클릭했다.");

  axios.post("/wallet/create").then(({ data }) => {
    info(data);
    console.log("2-8 응답받은 지갑 정보(data)를 info 함수에 전달");
  });
};

const getInfo = async (_address) => {
  console.log("4-1 지갑 주소 목록 중 하나 클릭");

  const wallet = (await axios.get("/wallet/" + _address)).data;
  info(wallet);
  console.log("4-9 응답받은 지갑 정보(data)를 info 함수에 전달");
};

const listUl = document.getElementById("walletList");

document.getElementById("newWalletListBtn").onclick = () => {
  console.log("3-1 목록 가져오기 클릭");
  axios.get("/wallet/list").then(({ data }) => {
    console.log(
      "3-5 파일 목록을 응답 받는다. ul 엘리먼트 내(innerHTML)을 비우고, 받은 파일 목록으로 채운다."
    );
    listUl.innerHTML = "";
    data.forEach((item) => {
      listUl.innerHTML += `<li onclick="getInfo('${item}')">${item}</li>`;
    });
  });
};

// 코인 연결 과정

document.getElementById("transactionFrom");
onsubmit = (e) => {
  e.preventDefault();
  console.log("5-1 전송 버튼 클릭");
  // 사용 조건 : 위에 지갑 데이터 있어야 한다. && received 입력값이 있어야 하며 && amount 입력값이 있어야 됨.
  const publicKey = publicKeyLi.innerHTML;
  const address = addressLi.innerHTML;
  const received = e.target.received.value;
  const amount = e.target.amount.value;

  const req = {
    sender: { publicKey, address },
    received,
    amount,
  };
  console.log(
    "5-2 현재 지갑 정보와 입력된 값으로  /transaction/send 라우터로 요청보냄"
  );

  axios.post("/transaction/send", req);
};
