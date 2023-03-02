# truffle

- Truffle은 블록체인 스마트 컨트랙트 프레임워크 (리액트와 비슷)

- 컴파일, 배포, 관리, 테스트등을 제공 하는 것으로 가장 많이 사용되는 프레임워크

# Solidity Prettier 설정

- npm i -D prettier-plugin-solidity
  이것을 사용하려면 settings.json에서 수정 후에 사용이 가능하다.

```bash
npm i -D prettier-plugin-solidity
```

# truffle 사용법

- 기본 설치

```sh
npm i truffle
```

- 기본 설정

```sh
npx truffle init # mysql에서 npx sequlize init과 같이 해당 위치 폴더에서 폴더/파일이 자동으로 생성됨
```

# npx truffle init으로 생성 된 폴더/파일 설명

- 생성된 폴더
  - contracts : 스마트 컨트랙트 코드 작성 폴더 (Solidity)
  - migrations : 배포 관련 코드 작성 폴더 (Javascript)
  - test : 테스트 코드 작성 폴더 (Jest)
  - truffle-config : 설정 파일

----------------- 아래 부터 Test.sol을 컴파일 하고 배포하는 과정 -----------------

# npx truffle complie

```sh
npx truffle complie # 이 명령어는 solc와 같이 솔리디티 언어를 컴파일 해주는 명령어
```

- 생성된 폴더

  - build/contracts : compile로 생성된 데이터를 json 형식으로 추출
  - 옵션이 없을 때 수정된 sol 파일만 인식하여 컴파일을 진행 한다.
  - --all 옵션일 시 무조건 전부 진행

```sh
npx truffle complie --all # all 옵션으로 전부 컴파일 진행
```

- 배포

```sh
npx truffle migration # 명령어 실행 전 truffle-config.js 파일 내의 development(66~72번줄) 주석 되어있는 것을 풀고 실행한다.
```

```js
    // development:{옵션들}은 배포 하기 전에 배포할 블록체인 네트워크에 대한 설정 주석 해제
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
```

파일 명은 번호\_내용\_컨트랙트명의 형식을 지켜야한다.

- 파일명 : 1_deploy_Test.js

```js
const test = artifacts.require("test"); // artifacts는  컴파일 후 생성된 Json 파일명을 전달하여 스마트 컨트랙트 데이터를 가져온다.

module.exports = function (deployer) {
  // deployer는 truffle이 제공하는 배포를 위한 객체
  deployer.deploy(test);
};
```

# 배포 (npx truffle migration) 실행 후 CA 결과를 가져온다.

터미널에서 npx truffle migration를 실행 후 터미널에 나오는 출력물

1_deploy_Test.js

- Deploying 'Test'

---

> transaction hash: 0xc54e5cc50d99aa4a96770382f4fe531a7cf4fecb6078e84ca97c4133aedb2eca
> Blocks: 0 Seconds: 0
> contract address: <-------------- CA 결과 0x2C94bfe45EDf93e722F89C337D966ac54A353C1a
> block number: 1
> block timestamp: 1677717371
> account: 0x445F5efaD310175b72926Ec014B1eee9691B4AEd
> balance: 999.998492876875
> gas used: 446555 (0x6d05b)
> gas price: 3.375 gwei
> value sent: 0 ETH
> total cost: 0.001507123125 ETH

> Saving artifacts

---

> Total cost: 0.001507123125 ETH

- Summary

> Total deployments: 1
> Final cost: 0.001507123125 ETH

이 출력물에서 CA 결과 값은 0x2C94bfe45EDf93e722F89C337D966ac54A353C1a

# truffle을 사용해서 확인

```sh
npx truffle console # geth에서 geth console로 사용하는 것과 같은 개념
```

```sh
Test.deployed().then(instance => test = instance)
test.getText.call() # 최초 contracts에 등록된 Test.sol의 내용을 확인할 수 있다.
```

```sh
test.setText.call("hellow")
test.getText.call() # test.setText에서 변경 된 것을 getText.call()로 확인 할 수 있다.
```

# Jest 테스트

- test 폴더 내에 코드 작성

- test 폴더 내의 파일명은 파일명.test.js이 되어야 한다.
- test 폴더에 기본 사용 양식 Test.test.js 참조

- 아래 명령어를 입력

```sh
npx truffle test  # 폴더명 test는 바뀌어서는 안된다.
```

------------- Front --------------------

# React로 Front 작성

1. React 프로젝트 생성

```sh
yarn create react-app front
```

2. web3 설치

```sh
cd front
yarn add web3
```

3. 카운터 스마트 컨트랙트 생성
