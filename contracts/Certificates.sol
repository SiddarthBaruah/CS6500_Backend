// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract CertificateRegistry {
    // Mapping from user address to certificate hash
    mapping(address => string) public certificates;

    // Event for new certificate registration
    event CertificateRegistered(address indexed user, string certHash);

    function registerCertificate(string memory certHash) public {
        certificates[msg.sender] = certHash;
        emit CertificateRegistered(msg.sender, certHash);
    }

    function getCertificate(address user) public view returns (string memory) {
        return certificates[user];
    }
}
