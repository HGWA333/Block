// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract Counter {
  uint256 private count;

  event Count(uint256 count); // 프론트의 web3.eth.subscribe("logs", { address: CA })를 위해 사용

  constructor() {
    count = 0;
  }

  function current() public view returns (uint256) {
    return count;
  }

  function increment() public {
    count += 1;
    emit Count(count);
  }

  function decrement() public {
    count -= 1;
    emit Count(count);
  }
}
