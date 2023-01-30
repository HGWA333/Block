// - npm i elliptic 타원곡선 알고리즘 암호화 라이브러리
// - npm i -D @types/elliptic 타원곡선 타입스크립트용

import cryptoJS from "crypto-js";
import elliptic from "elliptic";

// - 01. 개인키 만드는 과정
const privateKey: string = cryptoJS.lib.WordArray.random(32)
  .toString()
  .toUpperCase();

//  Double-And-Add 사용하지 않으면 1.15179238239458248e+77 1.15234..* 10^77 만큼 횟수를 돌린다. 하지만 Double-And-Add를 사용하면 256번 횟수만에 끝냄

// - 02. 공개키 만드는 과정
const ec: elliptic.ec = new elliptic.ec("secp256k1");
// 타원 곡선을 생성한다.
// ec에 전달하는 매개변수 secp256k1는 elliptic에서 제공하는 사전 설정옵션
// elliptic에서 제공하는 사전 옵션 = secp256k1, p192, p224 등등 있다.
// secp256k1로 설정하는 이유는 비트코인과 이더리움에서 사용하는 설정으로
// secp256k1는  y^2 = x^3 + 7 , G = "02...."을 적용시키고, 즉 기준점 G 값을 나타냄.

const keyPair: elliptic.ec.KeyPair = ec.keyFromPrivate(privateKey);
// 개인키를 사용해서 키페어를 생성하는 것으로 공개키를 생성한다.
// keyFromPrivate(개인키) = 개인키를 사용하여 키페어(개인키 + 공개키)를 생성한다.

const publickey = keyPair.getPublic().encode("hex", true).toUpperCase();
// 생성된 키페어(keyPair)를 사용하여 개인키와 공개키를 연결시킨다.
// getPublic()는 키페어에서 공개키를 가져오는 기능
// encode(인코딩 형식, true) 암호문을 저장하기 위해 객체 형식으로 되어있는 데이터를 문자열(hex)로 변환한다.

console.log("privateKey:", privateKey); // 개인키
console.log("privateKey.length:", privateKey.length);
console.log("publickey:", publickey); // 공개키
console.log("publickey.length:", publickey.length);
// 타원곡선에서 공개키는 찾은 점의 좌표로 x와y 두 수로 이루어져 있다.
// 공개키는 문자열로 나타낼 시 "x" + "y" = `{x}${y}` 두 좌표를 문자로써 연결한 문자열(string)이다.
// x, y는 256 bits의 크기를 가진다. 공개키는 (x[25bits] + y[25bits])512 bits의 크기를 가진다. 하지만 x + y는 128자리 수가 너무 길어 (64자 * 2) 너무 길어 압축을 한고, 압축한 자리 수는 64자리 수로 줄인다.
// x의 값은 그대로 가져오고 y의 값은 짝수일 때 "02", 홀수 일때 "03"을 사용하게 된다.

// 예)
// [짝수 y값] / [x값]
//      02 / 4df0ac249c1419e43da3bc74f333d5888131be0357adbbaf70438803bd721554

// [홀수 y값] / [x값]
//      03 / 4df0ac249c1419e43da3bc74f333d5888131be0357adbbaf70438803bd721554
// y가 짝수일 때 02를 추가하고 홀수일 때 03을 앞에 추가를 한다.

// [y값 + x값] 압축 안했을 때 표기
//      04 / fabdf0ac249c1419e43da3bc74f333d5888131be0357adbbaf70438803bd721554
// x + y를 모두 사용할 때 128자가 아니다. 이럴 때는 앞에 04를 붙이고 130자리(520bits / 65 bytes) 수를 가지게 된다.

// - 03.서명에 사용할 데이터 만드는 과정
const data: string = "checking data";
const hash: string = cryptoJS.SHA256(data).toString().toUpperCase();
// 전송할(보낼) 데이터를 Hash로 암호화 하는 과정

console.log("hash:", hash); // 전송할(보낼) 데이터
console.log("hash.length:", hash.length);

const signature: elliptic.ec.Signature = keyPair.sign(hash, "hex");
console.log("signature:", signature);
// 서명 하는 과정
// sign(데이터,인코딩 형식) 키페어를 사용해서 서명을 만든다.

// 위에서 만든 서명을 확인하는 과정
const verify: boolean = ec.verify(
  hash,
  signature,
  ec.keyFromPublic(publickey, "hex")
);
// 첫 번째 매개변수로 hash(해쉬)를 넣어주고 두 번째는 signature(서명), 세 번째는 ec.keyFromPrivate(publickey, "hex")키페어를 넣어준다.

// verify(데이터, 서명, 키퍼에)는 서명은 키페어를 사용해서 복호화를 하고 데이터와 비교한다. 같은 데이터라면 true가 리턴
// keyFromPublic(공개키, 인코딩 형식) 공개키를 사용하여 키페어를 생성한다.

console.log("verify:", verify);
// 정상적으로 복호화되어 hash가 확인된다면 true로 리턴한다.
// 키페어를 사용해서 암호화와 복호화를 한다.

const newPrivateKey: string = cryptoJS.lib.WordArray.random(32)
  .toString()
  .toUpperCase();
const newKeyPair = ec.keyFromPrivate(newPrivateKey);
const newPublicKey = newKeyPair.getPublic().encode("hex", true).toUpperCase();

const newVerify = ec.verify(
  hash,
  signature,
  ec.keyFromPublic(newPublicKey, "hex")
);
console.log("newVerify:", newVerify);
// 새로운 공개키로 확인했기 때문에 false가 반환이 된다.
//  - keyFromPublic에서 'hex' 인코딩이 꼭 있어야 된다. 없으면 코드 터짐
//  - hash(데이터)와 signature(=서명)과 publicKey(=공개키)가 정확히 일치 하지 않는다. 상대가 보낸 것인지 확신할 수 없기 때문

const myWallet = publickey.slice(26);
// 이더리움에서 사용하는 방식으로 뒤에서 부터 40자를 사용
// 66 글자는  02 / 4df0ac249c1419e43da3bc74f333d5888131be0357adbbaf70438803bd721554
// 66 글자라서 slice(26)을 (66-26) 하여 총 40글자로 맞춘다.
// 0xA3e9Ab71E70086fd470587428aF5c9a003CA0338에서 0x는 16진수 라는 표시

console.log("myWallet.length", myWallet);
console.log("myWallet.length", myWallet.length);
