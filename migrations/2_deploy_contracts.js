const CertificateRegistry_userInput = artifacts.require("CertificateRegistry");

module.exports = function (deployer) {
  deployer.deploy(CertificateRegistry_userInput);
};
