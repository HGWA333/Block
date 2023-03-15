```sh
#Front
yarn create react-app front
cd frount
yarn add web3

#Server
mkdir backnpm
npm init -y
npm i -D prettier-plugin-solidity
npm i truffle
npx truffle
```

# 스마트 컨트랙트의 거래

- CA : Contract Adress로 계정인 지갑 주소 중 하나로 Ether를 갖고 있을 수 있다.
- function의 payable 옵션
  - payable 이름 그대로 거래 가능하도록 해준다.
  - CA 주소로 해당 컨트랙트의 Balance(잔액)을 확인할 수 있다.

```js
  function sellBread() public payable {
    breads[msg.sender] -= 1;
    payable(msg.sender).transfer(10 ** 18);
  }
// msg.sender는 트랜잭션을 보낸 지갑 계정에 Ether를 보낸다.
```

- 이후 migration 파일(1.deploy.BreadShop) 만들고
  npx truffle comfile
  npx truffle migration 실행
