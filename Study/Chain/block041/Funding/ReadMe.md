```sh
npm init -y
npm i truffle @openzeppelin/contracts @remix-project/remixd
npm i -D prettier-plugin-solidity
npx truffle init
```

# Funding Contract

- 소규모 후원이나 다수의 개인으로 부터 자금을 모집하는 행위
- 컨트랙트 기능
  - 후원 기간이 종료 됐을 때
    - 후원 금액이 원하는 이상 모였다면 주최자에게 후원금 전송
    - 후원 금액이 미달됐다면 기존 후원자들에게 원금 돌려주기

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Fundraising {
  uint256 public targetAmount; // 목표 금액
  address public owner; // 펀딩 주최자, 후원을 받는 사람(계정)
  mapping(address => uint256) public donations; // address => uint256는 후원자 => 후원한 돈으로 후원자 목록
  uint256 raisedAmount; // 후원 된 금액
  uint256 public finishTime; // 마감 기간(후원 받는 기간)


  constructor(uint256 _targetAmount, uint _week) {
    targetAmount = _targetAmount;
    owner = msg.sender;
    raisedAmount = 0;
    finishTime = block.timestamp + _week * 1 weeks;
    // (컨트랙트가 저장된 트랜잭션)이 저장된 블록의 정보를 받아올 수 있다.
    // Block : { transactions : bytecode(컨트렉트)}
    // weeks : 주 단위로 시간
  }


  receive() external payable {
// 익명함수, data가 없이 value만 들어왔을 때 실행
// transaction : { data, value }
// 트랜잭션 내의 value(변수명) => 보내는 금액
// 트랜잭션 내의 data(변수명) => 스마트 컨트랙트 사용으로 인한 데이터 변경의 데이터로 스마트 컨트렉트로 발생한 데이터 변경(함수 호출)은 data 변수에 bytecode를 변환하여 담아서 보냈다.


    require(block.timestamp < finishTime, "This funding is over"); // 스마트 컨트렉트 CA 계정으로 돈(이더)를 보냈을 때 실행된다.

    donations[msg.sender] += msg.value; // 후원자에 대한 후원금 추가

    raisedAmount += msg.value; // 총 후원된 금액에 추가
  }

  function withdrawDonations() external {
    // 후원이 종료되 었을 때 트랜잭션 보낸 사람이 주최자인지 확인하여
    // 주최자가 후원금을 받기 위해 실행하는 메서드

    require(msg.sender == owner, "Funds will only be released to the owner"); // 트랜잭션 보낸 계정이 주최자 계정인가?
    require(raisedAmount >= targetAmount, "The Funding did not reach the goal"); // 후원금이 충분히 모였나?
    require(block.timestamp > finishTime, "This funding is not over yet"); // 후원 기간이 종료되었나?

    payable(owner).transfer(raisedAmount); // 기간 만료가 되고 후원금이 다 모였으면 주최자에게 후원금 전송
  }


  function refund() external payable {
    // 후원금이 충분히 모여지 않았을 때 실행하는 메서드
    // 단 후원자가 후원금을 안챙겨갈 수 있음

    require(block.timestamp > finishTime, "This funding is not over yet"); // 후원 기간이 끝났는지 확인
    require(raisedAmount > targetAmount, "The Funding did not reach the goal"); // 후원금이 충분히 모였는가?
    require(donations[msg.sender] > 0, "You did not donate to this funding"); // 후원한 적이 있는가?

    uint256 toRefund = donations[msg.sender];
    donations[msg.sender] = 0;
    payable(msg.sender).transfer(toRefund);
  }


}


```

# REMIX

```sh
npx remixd -s . -u https://remix.ethereum.org
```
