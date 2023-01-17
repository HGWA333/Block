// 설치 명령어  -
// npm i crypto-js
// - 설치 명령어

// 불러 올 것 -
//  crypto-js/sha256
// - 불러 올 것

const SHA256 = require("crypto-js/sha256");

// SHA256은 현재 블록체인에서 가장 많이 보편화 되어있는 암호 방식으로
// 출력 속도가 빠르다는 장점을 가지고 있고, 단방향성 암호화 방법으로 복호화가 불가능 해서 안전성이 크다. 대신 한번 설정 된 암호는 복호화가 불가
// SHA256 알고리즘은 256비트로 구성된 64자리 문자열로 암호화해준다.

const str = "안녕하세요";

console.log("hash:", SHA256(str).toString());
console.log("hash:", SHA256(str).toString().toLocaleUpperCase());
console.log("hash:", SHA256(str).toString().length);
