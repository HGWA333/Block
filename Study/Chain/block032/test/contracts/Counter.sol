// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract Counter {
  int256 private _count;

  constructor() {
    _count = 0;
  }

  function current() public view returns (int256) {
    return _count;
  }

  function increment() public {
    _count += 1;
  }

  function decrement() public {
    _count -= 1;
  }
}
