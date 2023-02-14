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
        method: "eth_requestAccounts",
      });

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
