// npm i ethereumjs-tx  트랜잭션 관련 라이브러리

const ethTx = require("ethereumjs-tx").Transaction;

const tx = new ethTx({
  from: "0x6aE0C5F3CeDfdA942E35cb5FD9898B7aef297a55", // 공개키를 적는다.
  to: "0x15e2c5C2f12cE6d32a598F77773DbF53A3460665",
  value: "0x" + Math.pow(10, 18).toString(16),
});

console.log("tx", tx);
console.log("r", tx.r);
console.log("v", tx.v);
console.log("s", tx.s);

tx.sign(
  Buffer.from(
    "3cf200b11091f2bcb3c9663e4b3096e36d9edb4b836a3ba36e93b00363f2cee7",
    "hex"
  )
);

console.log("tx", tx);
console.log("r", tx.r);
console.log("v", tx.v);
console.log("s", tx.s);

console.log(tx.serialize().toString("hex"));
