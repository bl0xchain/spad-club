// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.11;

interface ITokenClub {
    function initialize(address initiator, string memory _name, string memory _description) external;
}