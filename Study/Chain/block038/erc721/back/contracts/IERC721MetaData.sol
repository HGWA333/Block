// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC721MetaData {
  function name() external view returns (string memory);

  function symbol() external view returns (string memory);

  function tokenURI(uint tokenId) external view returns (string memory);

  event Transfer(address indexed from, address indexed to, uint amount);
  event Approval(address indexed owner, address indexed spender, uint amount);
}
