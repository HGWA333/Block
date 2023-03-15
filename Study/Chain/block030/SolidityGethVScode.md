# npm init 설정

```sh
npm init -y
```

# Solidity prettier 설정

```sh
npm i -D prettier-plugin-solidity
```

# VSCODE 자체의 settings.json에 아래 명령어를 추가한다.

```json
{
  "prettier.documentSelectors": ["**/*.sol"]
}
```

- setting.json에 해당 아래 내용을 추가
- "prettier.documentSelectors": ["**/*.sol"] 는 .sol 파일 확장자명이 붙은 파일에 프리티어를 자동으로 설정하겠다는 설정의 의미

# Solidity 작성 .sol 파일에서 작성

```js
// SPDX-License-Identifier: MIT  <- 라이선스 표기로 어떤 라이선스를 사용하는 것을 묻는 것으로 필수적으로 꼭 필요하다.

pragma solidity ^0.8.15;  // 솔리디티 버전 설정으로 크립토 좀비 0.5.15 버전

contract Test { // contract는 JS의 class와 같다.
  string text;

  constructor() {
    text = "Hi Block7";
  }

  function getText() public view returns (string memory) {
    // public : 외부에서 사용 가능한 공개 데이터
    // view : 읽기 전용 데이터 처리 / pure도 있음 (없어도 됨)
    // returns : 반환하는 데이터
    // memory : 함수 내에서만 변수 사용하는 것으로 데이터를 외부에 저장하지 않는다. (지역 변수 처리) (string memory)중 memory는 (없어도 됨)

    return text;
  }

  function setText(string memory _value) public {
    text = _value;
  }
}


```

# 컴파일

```sh
npm i solc
npx solc --bin --abi ./test.sol
```

- solc : Solidity Compiler
- --bin : Binary로 Transaction에 저장되는 실제 ByteCode
  - Solidity 등 우리가 작성한 코드를 EVM에서 실행할 수 있는 ByteCode로 변환(컴파일 하는 것)
  - 해당 ByteCode는 트랜잭션에 저장이 된다.
  - 해당 코드를 찾는 방법은 Receipt 내의 ContractAddress로 찾음
  - EVM이 알아서 코드를 실행
- --abi : Application Binary InterFace, 스마트 컨트랙트 내의 함수와 매개변수 등을 json 형식으로 표기
  - abi는 데이터의 정확한 매칭(인코딩)을 위해서 사용한다.
  - 어떤 데이터(변수, 함수, 메서드, 프로퍼티)가 있는지 미리 정해두고 맞춘다.

------- 솔리디티 .sol 작성하고 npx solc --bin --abi ./test.sol 솔리디티를 컴파일 하고 파일 생성후 아래 진행하여 스마트 컨트랙트를 등록한다. -------

# 스마트 컨트랙트를 트랜잭션에 등록

1. 편의를 위해 변수를 선언한다. (우분투 geth를 실행하고 아래 명령어를 작성한다.)

```sh
data = "0x"
```

2. 변수를 선언 한 "0x"의 x 뒤에 .bin 파일에 있는 값을 붙혀 넣는다.

```sh
//우분투에 geth 실행 후 우분투 창에 아래 형태와 같은 명령어를 입력 한다.

data = "0x6080604052348015...6200001157600080"
// "0x"에서 x뒤에 solc로 생성된 bin 파일 내의 모든 데이터를 복사해서 붙혀 넣는다.
txObj = { from: eth.accounts[0], data, gas: 1000000 }
```

3. 스마트컨트랙트 트랜잭션 등록

```sh
eth.sendTransaction(txObj)
# "0xf68590947fff46a602627103018bfa9e72badae33cc1e44d2afba538ed17d34c" 값이 나온다.
# 스마트컨트랙트를 등록하는 과정이라고 보면 된다.
```

4. 등록 된 스마트컨트랙트 트랜잭션 확인하기

```sh
eth.getTransaction("0xf68590947fff46a602627103018bfa9e72badae33cc1e44d2afba538ed17d34c")
# 확인한 트랜잭션의 값 중에서의 transactionIndex는 블록내의 트랜잭션의 인덱스가 몇번째인지 확인
eth.getTransactionReceipt("0xf68590947fff46a602627103018bfa9e72badae33cc1e44d2afba538ed17d34c")
```

5. eth.getTransaction의 결과

- getTransaction은 블록채굴(마이닝)을 하지 않아도 txpool에서 contractAddress에 값을 찾을 수 있다.

```js
// eth.getTransaction("0x") 실행한 결과
{
  blockHash: "0xbb3436271f59dd779082fb7b3ae5e280a2b73a0a95001daf8d19af14a9d70195",
  blockNumber: 17,
  chainId: "0x32de305",
  from: "0xe968f4cbe4f0a034d5145ff673466364efc94e1d",
  gas: 1000000,
  gasPrice: 1000000000,
  hash: "0xf68590947fff46a602627103018bfa9e72badae33cc1e44d2afba538ed17d34c",
  input: "0x608060405234801562...00001157600080fd5",
  nonce: 0,
  r: "0xcb1fd7621e614b9cbd3b7abafce9a6d07f711eefbefd2d77e433162e6e903463",
  s: "0x3ccbe3e874e136d3e095f1370f53ae0388c2f7f0f453d965ff8b4537e3b958f4",
  to: null,
  transactionIndex: 0,
  type: "0x0",
  v: "0x65bc62e",
  value: 0
}
```

6. eth.getTransactionReceipt의 결과

- getTransactionReceipt는 영수증 개념으로 블록을 생성(마이닝)을 해야지만 contractAddress에 값이 들어있다.

```js
{
  blockHash: "0xbb3436271f59dd779082fb7b3ae5e280a2b73a0a95001daf8d19af14a9d70195",
  blockNumber: 17,
  contractAddress: "0xe2e715f07965059aeb7cd23d473973037d60197d",
  cumulativeGasUsed: 565399,
  effectiveGasPrice: 1000000000,
  from: "0xe968f4cbe4f0a034d5145ff673466364efc94e1d",
  gasUsed: 565399,
  logs: [],
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  status: "0x1",
  to: null,
  transactionHash: "0xf68590947fff46a602627103018bfa9e72badae33cc1e44d2afba538ed17d34c",
  transactionIndex: 0,
  type: "0x0"
  }

```

7. contractAddress : CA

- CA : 스마트 컨트랙트에 관한 주소
- EOA : Externally Owned Account, 지갑 주소, 메타마스트/Geth 내의 지갑 등을 뜻한다.
- CA/EOA 둘 다 계정으로 분류 된다.

8. 컨트랙트 생성(연결)

```sh
contract=eth.contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getText","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_value","type":"string"}],"name":"setText","outputs":[],"stateMutability":"nonpayable","type":"function"}]);
```

- 매개변수로서 .abi 파일 확장자명으로 추출된 데이터를 입력한다.

9. 컨트랙트에 CA 연결

```sh
instance=contract.at("0xe2e715f07965059aeb7cd23d473973037d60197d")
```

- ContractAddress는 eth.getTransactionReceipt("값")에 있음
- at 메서드를 호출하며 ContractAddress를 매개변수로 전달
- 앞으로 스마트 컨트랙트 실행 시 instance 변수를 사용한다.

10. 컨트랙트를 실행하여 확인 (getText 메서드확인)

```sh
instance.getText.call()
```

- Solidity에서 작성해둔 getText 메서드를 호출

11. 컨트랙트를 실행하여 확인 (setText 메서드확인)

```sh
instance.setText("why so serious",{from:eth.accounts[0]}) # 기존 데이터 "Hi Block7"을 "why so serious"으로 변경을 한다. from은 바꾸려고 하는 사람이 한다. 바뀐 데이터를 입력을 하면 "0x08301bfbf3317a4d3acc29e671fc1b4a422acf6499760777e02380e7bfde6d19" 바뀐 트랜잭션 값이 나온다.
```

- 데이터를 바꾸고 난 이후에 블록생성 miner.start()를 한다.

```sh
instance.getText.call() # 바뀐 getText 데이터를 확인한다.
```

- 첫 매개변수로 값을 보내고 두 번째 매개변수로 트랜잭션의 내용을 전달
- 데이터가 바뀌었기 때문에 채굴을 통해서 블록을 생성하여 적용한다.

# EVM이 무료인 이유

- 유료이기 때문에 gas가 필요하다.
- EVM이 유료인 이유는 잦은 데이터 변경을 막기 위해 타인의 컴퓨터를 사용하기 때문에 유료이다.
- 이더리움 블록체인 네트워크에 노드(peer)는 매우 많다.
