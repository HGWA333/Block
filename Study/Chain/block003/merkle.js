// 설치 명령어  -
// npm i merkle
// - 설치 명령어

const merkle = require("merkle");
//  merkle 라이브러리가 머클 트리를 쉽게 사용할 수 있게 도와준다.

const data = ["123", "asd", "321", "dsa"];
// 머클 트리
const merkleTree = merkle("sha256").sync(data);
// 인자값 : 암호화 방법 (첫 번째 매개변수로 sha256과 같은 암호화 알고리즘을 넣어 줌)
// sync(data) 함수로 트리를 만들어 준다. 동기 매서드로 버퍼 처리 해줌. 순차적

const Root = merkleTree.root();

// 머클 트리에서 sha256 알고리즘을 사용하는데 문자열로 변환과 대문자로 변환을 둘다 해주고 값을 반환해준다.

// 예) 2c68318e352971113645cbc72861e1ec23f48d5baa5f9b405fed9dddca893eb4   =  SHA256(data).toString()
// 예) 3EFE9F9BEF9718AF7B61DF9A52E8EEC106FF4DDABDB2E7BCE9CB9F5C2313C9A9 = SHA256(data).toString().toLocaleUpperCase() = merkle("sha256").sync(data);
console.log(Root);
console.log(Root.length);
