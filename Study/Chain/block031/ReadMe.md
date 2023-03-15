# Javascrip에서 Solidity 컴파일 및 스마트컨트랙트 실행 하는 라이브러리

```sh

npm i solc web3

```

```sh
npx solc --bin --abi ./Test.sol  # Solidity를 컴파일 하는 명령어
```

# Geth에서 생성한 지갑 계정 개인키 가져오는 라이브러리

```sh
npm i keythereum
```

# 코드 설명

```js
const solc = require("solc"); // 솔리디티 코드를 바이트코드로 변환시켜주는 컴파일 라이브러리
const fs = require("fs"); // fs는 파일 시스템으로 파일에 접근하여 파일을 가져거나 수정 생성등의 기능을 제공하는 라이브러리
const path = require("path"); // 경로를 설정 하게 할 수 있게한다. 보통 os에 따른 경로 문자열이 다르기 때문에 사용하는 라이브러리

const contractPath = path.join(__dirname, "contracts", "Test.sol"); // path.join(현재 문서의 경로, "폴더명", "파일명");
// __dirname : 현재 문서의 경로(폴더까지만)
// path.join : 경로를 합쳐서 하나의 문자열로 반환
// ES6(import, export) 사용 시 __dirname이 없다.
```

```js
const data = JSON.stringify({
  // solc를 사용하여 솔리디티 코드를 컴파일 시 사용할 설정
  language: "Solidity",
  // language는 솔리디티로 솔리디티 이외에 언어가 있으나 솔리디티가 너무 강해서 다른 언어를 거의 사용하지 않는다.
  sources: {
    // sources는 파일에 대한 설정
    "Test.sol": {
      // Test.sol 파일로 생성되는 솔리디티 객체의 이름을 설정
      content: fs.readFileSync(contractPath, "utf-8"),
      // content는 파일 내용(코드)
    },
  },
  settings: {
    // settings는 추가적인 설정
    outputSelection: {
      // outputSelection는 모든 데이터의 정보를 가져올 것을 설정
      "*": {
        // 파일 이름
        "*": ["*"],
        // 가져올 데이터의 키, 값
        // 여기서 *은 모든 것을 뜻으로 모든 정보를 다 가져온다.
      },
    },
  },
});
```

```js
// 파일 만들어서 작업자가 보기 편하게
fs.writeFileSync(path.join(__dirname, "Test.json"), compiled);

fs.writeFileSync(
  path.join(__dirname, "bytecode.json"),
  JSON.stringify(bytecode)
);
```

```js
// 컴파일 후 데이터를 객체화 하는 작업
const compiled = JSON.parse(solc.compile(data));

// abi와 evm을 추출 하는 과정
const {
  abi,
  evm: { bytecode },
} = compiled.contracts["Test.sol"].Test;

// 위코드를 구조분해 할당을 하면 아래와 같다.

const abi = compiled.contracts["Test.sol"].Test.abi;
const bin = compiled.contracts["Test.sol"].Test.evm.bytecode.object;
```

```js
const keyObj = keythereum.importFromFile(address, __dirname); // 매개변수로 가져올 지갑 주소와 해당 지갑 주소에 대한 key 파일이 있는 keystore 폴더의 위치를 전달한다.

const privateKey = keythereum.recover("1", keyObj);
// 매개변수로 비밀번호와 key 객체를 전달한다.
// 개인키에 대한 객체를 반환받는다.

console.log("privateKey.toString::::", privateKey.toString("hex"));
// 콘솔로그로 나오는 값 afd9c51f5f1aa4a20ac247a295b0f3f5ff388ba2f35091b424f48945a94f7935
// MetaMask 로그인을 하고 계정 가져오기에서 privateKey 앞에 0x를 붙힌다. 그리고 0xafd9c51f5f1aa4a20ac247a295b0f3f5ff388ba2f35091b424f48945a94f7935 이것을 MetaMask 계정 가져오기에서 입력을 하면 계정이 추가 된다.
```
