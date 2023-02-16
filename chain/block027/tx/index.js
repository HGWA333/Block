// npm i ethereumjs-tx  트랜잭션 관련 라이브러리

// 블록체인을 자체적으로 개발을 한다고 하면, 서명에 관련 된 부분을 꼭 확인 할 수 있도록 설정을 해야 된다.
// 하지만 라이브러리를 사용할 경우 MetaMask나 Geth에서 자체적으로 트랜잭션 발동시 자동으로 서명을 하는 기능이 추가 되어있다.

const ethTx = require("ethereumjs-tx").Transaction; // 트랜잭션을 만들어준 라이브러리로 이것을 사용하면 트랜잭션은 생성이 되지만, 서명이 되지 않는다. rvs는 서명에 관련 된 데이터

const tx = new ethTx({
  from: "0x6aE0C5F3CeDfdA942E35cb5FD9898B7aef297a55", // 보내는 사람 공개키를 적는다.
  to: "0x15e2c5C2f12cE6d32a598F77773DbF53A3460665", // 받는 사람 공개키를 적는다.
  value: "0x" + Math.pow(10, 18).toString(16),
});

// rvs가 서명에 관련된 데이터
console.log("tx:::::::::::::::::", tx);
console.log("r:::::::::::::::::", tx.r);
console.log("v:::::::::::::::::", tx.v);
console.log("s:::::::::::::::::", tx.s);

// sing 메서드는 MetaMask나 Geth 쪽에서 자동으로 서명을 해준다 .
tx.sign(
  Buffer.from(
    "3cf200b11091f2bcb3c9663e4b3096e36d9edb4b836a3ba36e93b00363f2cee7",
    "hex"
  )
);

console.log("tx:::::::::::::::::", tx);
console.log("r:::::::::::::::::", tx.r);
console.log("v:::::::::::::::::", tx.v);
console.log("s:::::::::::::::::", tx.s);

console.log(tx.serialize().toString("hex"));
