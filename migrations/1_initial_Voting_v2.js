const VotingV2 = artifacts.require("votingV2.sol");

module.exports = function (deployer) {
  deployer.deploy(VotingV2);
};
