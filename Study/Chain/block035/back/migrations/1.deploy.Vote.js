const Vote = artifacts.require("Vote");

module.exports = function (deployer) {
  deployer.deploy(Vote, ["햇밥", "냉면", "단식", "컵라면"]);
};
