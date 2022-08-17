// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract SimpleStorage {
    uint256 public favoriteNumber;

    function setNumber(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieveNumber() public view returns (uint256) {
        return favoriteNumber;
    }
}

// we use returns when we want to see something from the state variable or result;
// after the contract is complied then we have the ABI and address
