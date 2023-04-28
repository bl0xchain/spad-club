// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.11;

library StringLib {
    function compare(string memory s1, string memory s2)
        public
        pure
        returns (bool)
    {
        return keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2));
    }
}