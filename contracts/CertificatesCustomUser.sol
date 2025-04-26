// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract CertificateRegistry_userInput {
    // Mapping from user address to certificate hash
    mapping(string => string) public certificates;

    // Event for new certificate registration
    event CertificateRegistered(string indexed user, string certHash);

    function registerCertificate(string memory certHash, string memory user) public {
        certificates[user] = certHash;
        emit CertificateRegistered(user, certHash);
    }

    function getCertificate(string memory user) public view returns (string memory) {
        return certificates[user];
    }
}
