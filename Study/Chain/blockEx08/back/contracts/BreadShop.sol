// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract BreadShop {
  mapping(address => uint) public breads;

  address private owner;
  uint public price;

  constructor(uint _price) {
    owner = msg.sender;
    price = _price;
  }

  function buyBread(uint amount) public payable {
    require(msg.value >= price * amount);
    breads[msg.sender] += amount;
  }

  function sellBread(uint amount) public payable {
    require(amount <= breads[msg.sender]);
    breads[msg.sender] -= amount;
    payable(msg.sender).transfer(amount * uint((price * 9) / 10));
  }

  function getBread() public view returns (uint) {
    return breads[msg.sender];
  }

  function setPrice(uint _price) public {
    require(owner == msg.sender);
    price = _price;
  }

  function getPrice() public view returns (uint[2] memory) {
    return [price, uint((price * 9) / 10)];
  }

  function getSender() public view returns (address) {
    return msg.sender;
  }

  function isOwner() external view returns (bool) {
    if (owner == msg.sender) return true;
    return false;
  }
}
