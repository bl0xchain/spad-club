// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.11;

library ArrayLib {
    function exists(uint[] memory spadIds, uint spadId)
        public
        pure
        returns (bool)
    {
        for (uint i = 0; i < spadIds.length; i++) {
            if (spadIds[i] == spadId) {
                return true;
            }
        }
        return false;
    }
}