// ------- Node 기본 모듈 내장 방식 crypto 사용 -----------
// import crypto from "crypto";

// const moduleKey = crypto.randomBytes(32).toString("hex");
// console.log("crypto:", moduleKey);
// console.log("crypto.length:", moduleKey.length);
// ------- Node 기본 모듈 내장 방식 crypto 사용 -----------

// 개인키 만드는 과정

// ------- crypto-js 라이브러리 사용 방식 -----------
import cryptoJS from "crypto-js";

const privateKey: string = cryptoJS.lib.WordArray.random(32).toString();
// random의 매개변수로 몇 byte를 사용할 것인지 전달한다.
// 64자리가 나와야하기 때문에 32byte를 사용한다.

console.log("privateKey:", privateKey);
console.log("privateKey.length:", privateKey.length);
// 0~F -> F를 2진수로 바꾸면 1111다.
// 1111 -> 4bit -> 총 64자 -> 64 * 4 -> 256bit
// 1 byte = 8 bits
// 256 bits = 32 byte

// Double-And-Add 알고리즘을 사용하는 이유
// for(let i = 0; i<Math.pow(2,256); i++){}
// 나타내기 힘든 수 표기할때 사용
