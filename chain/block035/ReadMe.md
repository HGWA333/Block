# Truffle, React, Express 기본 세팅

```sh
yarn create react-app front
cd front
yarn add web3 axios

cd back
npm init -y
npm i -D prettier-plugin-solidity
npm i truffle express
npm i web3 cors
npx truffle init
```

## -y

- npm init 에서 -y를 붙일 경우 생성에 필요한 것들을 자동으로 기본 값을 적용시켜 완성시킴
- apt-get install -y의 경우 프로그램 설치 시 사용자의 동의가 필요하지만 해당 동의를 미리 -y 옵션으로 추가하여 중간에 멈추지 않고 설치를 완료한다.

## Front에서 web3 연결

- useWeb3.js 파일 작성
- Custom Hook으로 사용(useWeb3.js 파일에 Custom Hook 함수 만듬)

## Back에서 express 작성

```js
const express = require("express");
const web3 = require("web3");
const cors = require("cors");

const app = express();
const web3 = new Web3("http://127.0.0.1:8545");

app.use(cors({ origin: true, credentials: true }));
// origin: true 모든 주소에 대해서 cors를 무시한다.

app.use(express.json());

app.listen(8080, () => {
  console.log("8080 server open");
});
```

# 투표 DApp

- back/contracts에 Vote.sol 파일 작성

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Vote {
  string[] public candidateList; // 투표 목록
  mapping(string => uint) public votesRecevied; // 투표 목록에 대한 투표 수

  constructor(string[] memory candidateNames) {
    candidateList = candidateNames;
  }


  function totalVotesFor(string memory candidate) public view returns (uint) { // 투표수 받아오기
    return votesRecevied[candidate];
  }

  function voteForCandidate(string memory candidate) public { // 투표 하기
    votesRecevied[candidate] += 1;
  }


  function candidates() public view returns (string[] memory) { // 투표 전체 목록 받아오기
    return candidateList;
  }
```

- mapping(키 => 값) 옵션 이름으로 형태는 이름[키]= 값
- mapping(키 => 값)은 Javascript에서 아래와 같다.

```js
const 이름 = { 키: 값 };
```

- Truffle 사용하여 Compile, Migration

- FrontEnd에서 App.js 작성

## 솔리디티 작성 시 주의사항

- string과 string은 비교가 안된다.

```js
  function validCandidate(string memory candidate) private view returns (bool) {
    for (uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) return true; // string과 string은 비교가 안된다. 그래서 if (candidateList[i] == candidate) return true; 여기서 에러가 발생한다.
    }
    return false;
    // 그래서 keccak256으로 해시화 하여 비교를 진행 해야 한다.
  }
```

```js
if (
  keccak256(abi.encodePacked(candidateList[i])) ==
  keccak256(abi.encodePacked(candidate))
  //   keccak256(abi.encodePacked(목적물)
) {
  return true;
}
```

- keccak256을 해시화 하여 비교를 진행
- string을 keccak256의 매개변수로 바로 전달하면 유니코드를 제대로 인식하지 못하여 오류를 발생한다.
- 그래서 abi.encodePacked메서드를 사용하여 16진수로 변환 후 해시화 하여 사용한다.

- require

```js
require(validCandidate(candidate)); // require는 먼저 실행한다.
```
