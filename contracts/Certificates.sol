// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract CertificateRegistry {
    // Mapping from user identifier to certificate bytes
    mapping(string => bytes) public certData;

    // Array to keep track of all registered user identifiers
    string[] private users;

    event CertificateRegistered(
        string indexed user,
        bytes indexed _certBytes,
        uint256 dataLength
    );

    /**
     * @dev Registers a certificate for a given user and stores the data.
     *      Also tracks the user in an array for enumeration.
     * @param _certBytes The certificate data to store.
     * @param user The user identifier (e.g., address or username).
     */
    function registerCertificate(bytes memory _certBytes, string memory user) public {
        // If new user, add to the users array
        if (certData[user].length == 0) {
            users.push(user);
        }

        // Store full data (optional!)
        certData[user] = _certBytes;
        emit CertificateRegistered(user, _certBytes, _certBytes.length);
    }

    /**
     * @dev Returns the certificate data for a given user.
     * @param _user The user identifier.
     * @return The certificate bytes associated with the user.
     */
    function getCertificate(string memory _user) public view returns (bytes memory) {
        return certData[_user];
    }

    /**
     * @dev Returns the list of all users who have registered certificates.
     * @return An array of user identifiers.
     */
    function getAllUsers() public view returns (string[] memory) {
        return users;
    }
}
