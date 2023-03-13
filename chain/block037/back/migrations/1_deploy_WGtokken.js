const WGtoken = artifacts.require("WGtoken");

module.exports = function (deployer) {
  deployer.deploy(WGtoken, "WGtoken", "WG", 10000);
};
