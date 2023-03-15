const Vote = artifacts.require("Vote");

module.exports = function (deployer) {
  deployer.deploy(Vote, ["hackRice", "nucleusRice", "DanSik", "Cub Ramen"]);
};
