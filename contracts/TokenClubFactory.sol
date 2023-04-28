// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.11;

import "./ProxyFactory.sol";
import "./ITokenClub.sol";

contract TokenClubFactory is ProxyFactory {
    address tokenClubTemplate;
    address[] public tokenClubs;
    mapping(address => mapping(address => uint[])) contributors; // user -> tokenClub -> spad[]

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
        if(! exists(contributors[contributor][msg.sender], spadId)) {
            contributors[contributor][msg.sender].push(spadId);
        }

    }

    function exists(uint[] memory spadIds, uint spadId)
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
}

