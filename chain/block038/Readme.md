- erc20 설치

```sh
mkdir back
cd back
npm init -y
npm i truffle @openzeppelin/contracts
npm i -D prettier-plugin-solidity
npx truffle init
```

# ERC20 토큰을 라이브러리로 만들기

```js
import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; // ERC20 토큰을 가져온다.

contract B7Token is ERC20 {
  constructor(
    string memory _name,
    string memory _symbol,
    uint256 _amount
  ) ERC20(_name, _symbol) { // ERC20의 constructor를 호출한다. JS의 class에 super와 같다.
    _mint(msg.sender, _amount * 10 ** 18);
  }
}

```

- erc721 설치

```sh
mkdir back
cd back
npm init -y
npm i truffle
npm i -D prettier-plugin-solidity
npx truffle init
```
