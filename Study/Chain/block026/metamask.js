const nowAccountElem = document.getElementById("nowAccount");
const balanceElem = document.getElementById("balance");
const toElem = document.getElementById("to");
const etherElem = document.getElementById("ether");

console.log(window.ethereum);

if (window.ethereum) {
  const isConnected = window.ethereum.isConnected();
  console.log("javascript 읽자마자 isConnected의 상태:", isConnected);

  const getBalance = async (accounts) => {
    nowAccountElem.innerHTML = accounts[0];
    const balance = await ethereum.request({
      method: "eth_getBalance",
      params: accounts,
    });
    console.log("connect에서의 balance:", parseInt(balance));
    balanceElem.innerHTML = parseInt(balance) / Math.pow(10, 18);
  };

  ethereum.on("connect", async (connectInfo) => {
    console.log("connectInfo", connectInfo);
    console.log("connectInfo.chainId:", parseInt(connectInfo.chainId));

    const isConnected = window.ethereum.isConnected();
    console.log("connect 후 isConnected 가져왔을 때 결과 : ", isConnected);

    try {
      const accounts = await ethereum.request({
        // method: "eth_accounts", -> eth_accounts와 eth_requestAccounts 메소드의 결과는 아래와 같지만 지금은 아래 eth_requestAccounts 메소드로 사용을 한다.
        method: "eth_requestAccounts",
      });
      //   nowAccountElem.innerHTML = accounts[0];

      //   const balance = await ethereum.request({
      //     method: "eth_getBalance",
      //     params: accounts,
      //     // params: ["0xdA1E098081C3C581c4549AA8c972D6C4EF22FA02"],
      //   });
      //   console.log("connect에서의 balance:", parseInt(balance));
      //   balanceElem.innerHTML = parseInt(balance) / Math.pow(10, 18);
      await getBalance(accounts);
    } catch (error) {
      console.log(error);
    }
  });

  ethereum.on("accountsChanged", async (accounts) => {
    console.log("accountsChanged에서의 accounts", accounts);

    nowAccountElem.innerHTML = accounts[0];

    const balance = await ethereum.request({
      method: "eth_getBalance",
      params: accounts,
    });
    console.log(
      "accountsChanged에서의 balance:",
      parseInt(balance) / Math.pow(10, 18)
    );
    balanceElem.innerHTML = parseInt(balance) / Math.pow(10, 18);
  });

  ethereum.on("chainChanged", (chainId) => {
    console.log(chainId);
  });

  document.getElementById("sendTransaction").onclick = () => {
    const from = nowAccountElem.innerHTML;
    const to = toElem.value;
    const value = "0x" + (+etherElem.value * Math.pow(10, 18)).toString(16);
    // value는 ethereum에게 16진수를 받고 있다. 그래서 10진수와 스트링 형식으로 바꾸고 그것을 감싸서 "0x" + 를 해준다.
    console.log("sendTransaction에서의 to:", to);
    console.log("sendTransaction에서의 from:", from);
    console.log("sendTransaction에서의 value:", value);

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [{ from, to, value }],
      })
      .then((result) => {
        console.log("eth_sendTransaction에서의 result:", result);
        getBalance([from]);
      })
      .catch((err) => {
        console.log("eth_sendTransaction에서의 err:", err);
      });
  };
}
