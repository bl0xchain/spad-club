// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.11;

import "./ProxyFactory.sol";
import "./ISpadClub.sol";

contract SpadClubFactory is ProxyFactory {
    address spadClubTemplate;
    address[] public spadClubs;
    mapping(address => address[]) userClubs;
    mapping(address => mapping(address => uint[])) userSpads; // user -> spadClub -> spad[]
    mapping(address => address) public createdClub;

    event SpadClubCreated(address indexed creator, address spadClub);

    constructor(address _spadClubTemplate) {
        spadClubTemplate = _spadClubTemplate;
    }

    function createSpadClub(string memory _name, string memory _description) public {
        require(createdClub[msg.sender] == address(0), "already created");
        bytes memory _data = abi.encodeCall(ISpadClub.initialize, (msg.sender, _name, _description)); 
        address spadClub = deployMinimal(spadClubTemplate, _data);
        spadClubs.push(spadClub);
        createdClub[msg.sender] = spadClub;
        emit SpadClubCreated(msg.sender, spadClub);
    }

    function isValidSpadClub(address _spadClubAddress) public view returns (bool) {
        for(uint i = 0; i < spadClubs.length; i++) {
            if(spadClubs[i] == _spadClubAddress) {
                return true;
            }
        }
        return false;
    }

    function addContribution(address contributor, uint spadId) public {
        // only valid spad club can call this function
        require(isValidSpadClub(msg.sender), "not allowed");
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

