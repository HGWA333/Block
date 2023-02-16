const express = require("express");
const Web3 = require("web3");

const app = express();

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8082") // ws://localhost:PORT 여기서 PORT 번호는 사용자 임의로 설정할 수 있다. 단 기존에 사용하고 있는 PORT랑 연결이 되면 안됨.
);
// 여기서 ws는 nodejs로 연결 하는 것이 아니라 geth로 연결

// geth에서 Websocket 열기
// --ws --ws.port 8082 --ws.addr "0.0.0.0" --ws.origins "*"  geth에 추가

web3.eth.subscribe("newBlockHeaders", (error, result) => {
  // subscribe메서드는 상대방에게 새로운 블록이 바뀌었을 때 현재 상태의 블록을 알려주는 기능 바뀌었을 때 바뀐 블록의 정보를 확인 할 수 있음
  if (!error) {
    console.log(result);
  }
});

app.listen(8000, () => {
  console.log("8000 server open");
});
