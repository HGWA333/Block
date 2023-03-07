# MIT 라이센스

- // SPDX-License-Identifier: MIT
  MIT는 미국 메사추세츠 공과대학교(MIT)에서 학교 학생들을 돕기 위해 개발한 라이센스

```sh
npm i init -y
npm i truffle
npm i -D prettier-plugin-solidity
npx truffle init
```

# Solidity 문법

- 타입(자료형)

  - int : 정수
  - string : 문자
  - int[] : 정수 배열
  - string[] : 문자 배열
  - address : 주소(지갑 계정 주소 or CA)

- msg.sender : 보낸 지갑 계정
- mapping : Javascript의 객체와 비슷하다.
  - Javascript의 hashMap과 비슷하며 키는 저장되지 않는다.
  - hashMap은 키를 hash화 하여 해당 메모리 주소에 값을 저장한다.
    형식은 mapping(key => value) public 매핑이름
    예 : mapping(string => uint) public balance;
- hash 방식은 keccak256을 사용

```js
let test = [];
test[3838] = "server";
test["키의 hash"] = "값"; // 최초 hashMap 생성
test["키의 hash"] = "값1"; // 생성된 hashMap 수정가능
```

- constructor에 매개변수 전달

  - 함수의 매개변수 저장 위치
    - 옵션 명
    - storage : 블록체인 네트워크에 저장하여 공유된다.
    - memory : 함수 내에서만 사용하고 버린다.
    - 구조체(struct), 배열(array), 매핑(mapping)에 사용해야 한다.
      - int는 정수형 타입으로 배열로 나타낼 수 없다.
      - string은 문자열로 배열과 같이 메모리를 사용한다.
  - 1_deploy_Test.js에서 매개변수 전달한다.

  - 예시

  ```js
   constructor(string memory _text) {
  }
  ```

  ```js
  const Test = artifacts.require("Test");
  module.exports = function (deployer) {
    deployer.deploy(Test, "TextTest", 10);
  };
  // contract Test = deployer.deploy(Test) , constructor(string memory _text, int _num) = deployer.deploy("TextTest", 10)
  ```

- 배포한 지갑 주소 확인하기

```sh
npx truffle console
Test.deployed().then(instance => test = instance)
test.owner()
web3.eth.getTransactionReceipt("트랜잭션 해시")
```

- web3.eth.getTransactionReceipt("트랜잭션 해시") : ganache or geth에 eth_sendTransaction의 Trasaction 해쉬값

web3.eth.getTransactionReceipt("0x333fa38b3da4177fcd6a58d439e29aef8290472d65d868220d75d3bfc950fe85")

```js
const deployed = new web3.eth.Contract(abi, CA);
// deployed 이미 배포된 스마트 컨트랙트 정보를 가져온다.
```

- Test 객체가 이미 abi와 CA를 가지고 있다.

  - Test의 deployed 메서드를 호출하면 위의 JS 코드처럼 배포된 스마트 컨트랙트 정보를 가져온다. 단, Promise 형식이다. 그래서 Promise 형식에 따라 then을 사용하여 배포된 스마트 컨트랙트를 가져오는 데 성공하면 가져온 객체를 test에 정의한다.
  - 여기서 test는 then(instance => test = instance)의 test로
    test는 이름을 사용자가 원하는대로 지을 수 있다. 즉 .Sol의 contract Test의 이름을 다시 초기화 하여 사용한다는 의미
  - 이후 test로 스마트 컨트랙트의 메서드, 변수들을 호출하여 가져올 수 있다.

# 간단한 토큰 구현

- 토큰은 Ethereum 기반

  - 토큰의 종류 ERC20, ERC721, ERC1155, ERC223, ERC 621, ERC777
  - ERC20(FT) :
  - ERC721(NFT) : 하나의 NFT는 하나의 소유자를 갖는다.
  - ERC1155(NFT) : 하나의 NFT는 다수의 소유자를 갖는다.

- FT / NFT

  - FT : Fungible Tokken / 대체 가능한 토큰
  - NFT : Non Fungible Tokken / 대체 불가능한 토큰

- 아래 코드들은 가장 기본적인 토큰으로 ERC20이라고 한다.
  - Ethereum Request for Comment 20
  - 이더리움 블록체인 네트워크에서 정한 표준 토큰
  - 스마트 컨트랙트로 생성
  - 아래의 코드는 내용을 최소화하여 완벽히 작동되지 않는다.
  - .sol 파일에서 코드 구현

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract TestTokent {
  mapping(address => uint256) public balances;
  string public name;
  string public symbol;
  uint8 public decimals;
  uint public totalSupply;
}
```

- balances : 각 지갑 계정에 대한 잔액
- name : 토큰 이름(Ether)
- symbol : 토큰 단위(ETH)
- decimals : 소수점의 갯수 (10 - 몇 승으로 wei와 ether의 관계)
- totalSupply : 총 발행량

```js
  function balanceOf(address _owner) public view returns (uint balance) {
    return balances[_owner];
  }
```

- view : 함수에서 변수를 호출하지만 수정하지 못하는 것으로 즉 읽기전용 함수로 설정

## 잔액 보내기

```js
 function transfer(address _to, uint _value) public returns (bool success) {
    require(balances[msg.sender] >= _value);
    balances[msg.sender] -= _value; // 문제가 없을 시 트랜잭션을 보낸 사람에게 value만큼 돈을 빼고
    balances[_to] += _value; // to 받는 사람에서 value 만큼 돈을 더한다.
    return true;
  }
```

- require : 조건을 확인하여 에러를 발생을 해도 코드를 계속 진행한다.
  - 첫 번째 매개변수로 존건을 전달하며 해당 조건이 true면 계속 진행, false면 중단을 한다.
  - 두 번째 매개변수로 에러 발생 시 출력할 로그를 전달한다.
    require(첫 번째 매개변수 >= 두 번째 매개변수)
