// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Vote {
  string[] public candidateList;
  mapping(string => uint) public votesRecevied;
  event Voted(string candidate, uint votes);

  constructor(string[] memory candidateNames) {
    candidateList = candidateNames;
  }

  function validCandidate(string memory candidate) private view returns (bool) {
    for (uint i = 0; i < candidateList.length; i++) {
      if (
        keccak256(abi.encodePacked(candidateList[i])) ==
        keccak256(abi.encodePacked(candidate))
      ) return true;
    }
    return false;
  }

  function totalVotesFor(string memory candidate) public view returns (uint) {
    require(validCandidate(candidate));
    return votesRecevied[candidate];
  }

  function voteForCandidate(string memory candidate) public {
    require(validCandidate(candidate));
    votesRecevied[candidate] += 1;
    emit Voted(candidate, votesRecevied[candidate]);
  }

  function candidates() public view returns (string[] memory) {
    return candidateList;
  }
}
