// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.11;

interface ISpadClubFactory {
    function addContribution(address contributor, uint spadId) external;
}