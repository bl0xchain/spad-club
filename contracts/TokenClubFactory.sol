// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.11;

import "./ProxyFactory.sol";
import "./ITokenClub.sol";

contract TokenClubFactory is ProxyFactory {
    address tokenClubTemplate;
    address[] public tokenClubs;
    mapping(address => address[]) userClubs;
    mapping(address => mapping(address => uint[])) userSpads; // user -> tokenClub -> spad[]

    event TokenClubCreated(address creator, address tokenClub);

    constructor(address _tokenClubTemplate) {
        tokenClubTemplate = _tokenClubTemplate;
    }

    function createTokenClub(string memory _name, string memory _description) public {
        bytes memory _data = abi.encodeCall(ITokenClub.initialize, (msg.sender, _name, _description)); 
        address tokenClub = deployMinimal(tokenClubTemplate, _data);
        tokenClubs.push(tokenClub);

        emit TokenClubCreated(msg.sender, tokenClub);
    }

    function isValidTokenClub(address _tokenClubAddress) public view returns (bool) {
        for(uint i = 0; i < tokenClubs.length; i++) {
            if(tokenClubs[i] == _tokenClubAddress) {
                return true;
            }
        }
        return false;
    }

    function addContribution(address contributor, uint spadId) public {
        // only valid token club can call this function
        require(isValidTokenClub(msg.sender), "not allowed");
        if(! spadExists(userSpads[contributor][msg.sender], spadId)) {
            userSpads[contributor][msg.sender].push(spadId);
        }
        if(! clubExists(userClubs[contributor], msg.sender)) {
            userClubs[contributor].push(msg.sender);
        }
    }

    function spadExists(uint[] memory spadIds, uint spadId)
        internal
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

    function clubExists(address[] memory clubAddresses, address clubAddress)
        internal
        pure
        returns (bool)
    {
        for (uint i = 0; i < clubAddresses.length; i++) {
            if (clubAddresses[i] == clubAddress) {
                return true;
            }
        }
        return false;
    }

    function getClubs() public view returns (address[] memory) {
        return userClubs[msg.sender];
    }

    function getSpads(address clubAddress) public view returns (uint[] memory) {
        return userSpads[msg.sender][clubAddress];
    }
}

