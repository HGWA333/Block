# 0. Truffle 이란?

- Truffle은 블록체인 스마트 컨트랙트 프레임워크 (리액트와 비슷)

- 컴파일, 배포, 관리, 테스트등을 제공 하는 것으로 가장 많이 사용되는 프레임워크

# 0-1. Solidity Prettier 설정

## 1. VSCODE 자체의 설정 옵션인 settings.json 에 아래 명령어를 추가한다.

```json
{
  "prettier.documentSelectors": ["**/*.sol"] // setting.json에 해당 아래 내용을 추가
}
```

- "prettier.documentSelectors": ["**/*.sol"] 는 .sol 파일 확장자명이 붙은 파일에 프리티어를 자동으로 설정하겠다는 설정 의미다.

## 2. 작업을 할 루트 폴더에 prettier-plugin-solidity 설치

- npm i -D prettier-plugin-solidity
  이것을 사용하려면 settings.json에서 수정 후에 사용이 가능하다.

# 1. Truffle 설치 및 사용 방법

## 1. Truffle 기본 설치

## 2. Truffle 설치 후 기본 설정

## 2-1. npx truffle init으로 생성 된 폴더/파일 설명

- 생성된 폴더
  - contracts : 스마트 컨트랙트 코드 작성 폴더 (Solidity)
  - migrations : 배포 관련 코드 작성 폴더 (Javascript)
  - test : 테스트 코드 작성 폴더 (Jest)
  - truffle-config : 설정 파일

## 3. Truffle Complie(컴파일) 및 배포 하는 방법

- 컴파일

  ```sh
  npx truffle complie # 이 명령어는 solc와 같이 솔리디티 언어를 컴파일 해주는 명령어다.
  ```

  - npx truffle complie 명령어 실행 후 생성 된 폴더 설명
  - build/contracts : compile로 생성된 데이터를 json 형식으로 추출한다.
  - 옵션이 없을 때 수정된 sol 파일만 인식하여 컴파일을 진행 한다.
  - --all 옵션일 시 무조건 전부 진행

  ```sh
  npx truffle complie --all # all 옵션으로 전부 컴파일 진행
  ```

- 배포 순서

1. truffle-config.js 파일 내의 주석 풀기

```js
  // development:{옵션들}은 배포 하기 전에 배포할 블록체인 네트워크에 대한 설정 주석 해제를 한다.
  development: {
    host: "127.0.0.1", // Localhost (default: none)
    port: 8545, // Standard Ethereum port (default: none)
    network_id: "*", // Any network (default: none)
  },
```

2. 터미널에서 npx truffle migration 명령어 실행

```sh
npx truffle migration # 명령어 실행 전 truffle-config.js 파일 내의 development(66~72번줄) 주석 되어있는 것을 해제하고 실행한다.
```

3. 컨트랙트 파일 생성
   파일 명은 번호\_내용\_컨트랙트명의 형식을 지켜야한다.

- 파일명 : 1_deploy_Test.js

```js
// 1_deploy_Test.js 파일을 열었을 때 보이는 화면
const test = artifacts.require("test"); // artifacts는  컴파일 후 생성된 Json 파일명을 전달하여 스마트 컨트랙트 데이터를 가져온다.

module.exports = function (deployer) {
  // deployer는 truffle이 제공하는 배포를 위한 객체
  deployer.deploy(test);
};
```

## 4. 배포 후 CA 결과를 가져오기

- 터미널에서 npx truffle migration를 실행 후 터미널에 나오는 출력물

  1_deploy_Test.js

  - Deploying 'Test'

  ***

  > transaction hash: 0xc54e5cc50d99aa4a96770382f4fe531a7cf4fecb6078e84ca97c4133aedb2eca
  > Blocks: 0 Seconds: 0
  > contract address: 0x2C94bfe45EDf93e722F89C337D966ac54A353C1a <-------------- CA 결과값
  > block number: 1
  > block timestamp: 1677717371
  > account: 0x445F5efaD310175b72926Ec014B1eee9691B4AEd
  > balance: 999.998492876875
  > gas used: 446555 (0x6d05b)
  > gas price: 3.375 gwei
  > value sent: 0 ETH
  > total cost: 0.001507123125 ETH

  > Saving artifacts

  ***

  > Total cost: 0.001507123125 ETH

  - Summary

  > Total deployments: 1
  > Final cost: 0.001507123125 ETH

  이 출력물에서 나온 CA 결과 값은 0x2C94bfe45EDf93e722F89C337D966ac54A353C1a

## 5. Truffle을 사용하여 컨트랙트 등록 및 컨트랙트 확인

1. 터미널에서 truffle console 명령어 실행

```sh
npx truffle console # geth에서 geth console로 사용하는 것과 같은 개념
```

2. 터미널에서 컨트랙트 등록

```sh
Test.deployed().then(instance => test = instance) # 이시점이 컨트랙트 등록이 된 시점
test.getText.call() # 최초 contracts에 등록된 Test.sol의 내용을 확인할 수 있다.
```

3. 터미널에서 등록된 컨트랙트 내용 변경

```sh
test.setText.call("hellow") # 컨트랙트 내용 변경 하는 과정
test.getText.call() # test.setText에서 변경 된 것을 getText.call()로 확인 할 수 있다.
```

# 2. Jest 테스트

- 1. test 폴더 내에 코드 작성한다.

  - test 폴더 내의 파일명은 파일명.test.js이 되어야 한다.
  - test 폴더에 기본 사용 양식 Test.test.js 참조

- 2. 코드 작성이후 터미널에서 아래 명령어 실행

```sh
npx truffle test  # 폴더명 test는 바뀌어서는 안된다.
```

# 3. Front 설정

## 1. React로 Front 작성

```sh
yarn create react-app front # React 프로젝트 생성
```

## 2. web3 설치

```sh
cd front
yarn add web3
```

## 3. 스마트 컨트랙트 생성
