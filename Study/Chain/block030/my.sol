// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

contract Test {
  string text;
  string password;

  constructor() {
    text = "hellow Man";
    password = "1234";
  }

  function getText() public view returns (string memory) {
    return text;
  }

  function setText(string memory _value) public {
    text = _value;
  }
}
