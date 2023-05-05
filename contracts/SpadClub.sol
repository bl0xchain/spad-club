// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.11;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ISpadClubFactory.sol";

contract SpadClub is Initializable {
    address spadClubFactory;
    address public creator;
    string public name;
    string public description;
    uint public spadCount;
    
    mapping(uint => Spad) spads;

    address constant CURRENCY = 0xd9037B8A07Ec697014E8c94c52Cb41f67132B4a8;

    struct Spad {
        string name; // public
        string description; // public
        string password;
        uint target; // 100
        uint minInvestment;
        uint maxInvestment;
        uint currentInvestment;
        mapping(address => uint) contributions;
        address externalToken; // CLUB
        uint externalTokenAmount;
        uint valuation; // 10000
        uint8 carry; // 15%
        bool externalTokenAdded;
        mapping(address => bool) tokenClaimed;
    }

    event SpadCreated(uint spadId);

    function initialize(address _creator, string memory _name, string memory _description) initializer public {
        spadClubFactory = msg.sender;
        creator = _creator;
        name = _name;
        description = _description;
    }

    function createSpad(string memory _name, string memory _description, string memory _password, uint _target, uint _minInvestment, uint _maxInvestment, address _externalToken, uint _valuation, uint8 _carry) public {
        require(msg.sender == creator, "not allowed");
        require(! compare("", _password), "password missing");
        require(_target > 0, "target missing");
        require(_carry > 0 && _carry < 100, "invalid carry");
        require(_maxInvestment > _minInvestment, "max investment should be more than min investment");
        uint spadId = spadCount + 1;
        spadCount = spadId;
        Spad storage spad = spads[spadId];
        spad.name = _name;
        spad.description = _description;
        spad.password = _password;
        spad.target = _target;
        spad.minInvestment = _minInvestment;
        spad.maxInvestment = _maxInvestment;
        spad.externalToken = _externalToken;
        spad.valuation = _valuation;
        spad.carry = _carry;

        emit SpadCreated(spadId);
    }

    function getSpadInfo(uint _spadId) public view returns (string memory spadName, string memory spadDescription) {
        Spad storage spad = spads[_spadId];
        return (spad.name, spad.description);
    }

    function getSpadDetails(uint _spadId, string memory _password) public view returns (string memory spadName, string memory spadDescription, uint target, uint minInvestment, uint maxInvestment, uint currentInvestment, address externalToken, uint externalTokenAmount, uint valuation, uint8 carry, bool externalTokenAdded) {
        Spad storage spad = spads[_spadId];
        if(spad.contributions[msg.sender] == 0 && creator != msg.sender) {
            require(compare(spad.password, _password), "invalid password");
        }
        return (spad.name, spad.description, spad.target, spad.minInvestment, spad.maxInvestment, spad.currentInvestment, spad.externalToken, spad.externalTokenAmount, spad.valuation, spad.carry, spad.externalTokenAdded);
    }

    function contribute(uint _spadId, string memory _password, uint _amount) public {
        Spad storage spad = spads[_spadId];
        if(spad.contributions[msg.sender] == 0 && creator != msg.sender) {
            require(compare(spad.password, _password), "invalid password");
        }
        require((spad.currentInvestment + _amount) <= spad.target, "target overflow");
        require((spad.contributions[msg.sender] + _amount) <= spad.maxInvestment, "investment overflow");
        require((spad.contributions[msg.sender] + _amount) >= spad.minInvestment, "investment underflow");
        require(IERC20(CURRENCY).transferFrom(msg.sender, address(this), _amount), "invalid amount");
        spad.currentInvestment = spad.currentInvestment + _amount;
        spad.contributions[msg.sender] = spad.contributions[msg.sender] + _amount;
        ISpadClubFactory(spadClubFactory).addContribution(msg.sender, _spadId);
        // on target reached, send target amount to the creator
        if(spad.currentInvestment == spad.target) {
            require(IERC20(CURRENCY).transfer(creator, spad.target), "target transfer fail");
        }
    }

    function getContribution(uint _spadId) public view returns (uint amount) {
        Spad storage spad = spads[_spadId];
        return spad.contributions[msg.sender];
    }

    function addTokensForDistribution(uint _spadId, uint _tokenAmount) public {
        require(msg.sender == creator, "not allowed");
        Spad storage spad = spads[_spadId];
        require(spad.currentInvestment == spad.target, "target not reached");
        require(! spad.externalTokenAdded, "alreaddy added");
        uint amount = _tokenAmount * spad.target * (100 - spad.carry) / (spad.valuation * 100);
        require(IERC20(spad.externalToken).transferFrom(msg.sender, address(this), amount), "invalid token amount");
        spad.externalTokenAmount = _tokenAmount;
        spad.externalTokenAdded = true;
    }

    function claimInvestment(uint _spadId) public {
        Spad storage spad = spads[_spadId];
        require(spad.externalTokenAdded, "external tokens not added");
        require(spad.contributions[msg.sender] > 0, "not an investor");
        require(!spad.tokenClaimed[msg.sender], "already claimed");
        uint amount = (spad.contributions[msg.sender] * spad.externalTokenAmount * (100 - spad.carry) / spad.valuation / 100);
        require(IERC20(spad.externalToken).transfer(msg.sender, amount), "transfer fail");
        spad.tokenClaimed[msg.sender] = true;
    }

    function isInvestmentClaimed(uint _spadId) public view returns (bool) {
        Spad storage spad = spads[_spadId];
        return spad.tokenClaimed[msg.sender];
    }

    function compare(string memory s1, string memory s2)
        internal
        pure
        returns (bool)
    {
        return keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2));
    }

}

