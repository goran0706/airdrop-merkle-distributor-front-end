// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

contract AirdropDistributor is Ownable {
    Token token;
    mapping(address => uint256) recipients;

    constructor(address _token) {
        token = Token(_token);
    }

    event Distribute(address[] recipients, uint256[] amounts);
    event Redeem(address recipient, uint256 amount);

    modifier hasEnoughTokens(uint256[] memory _amounts, uint256 _tokens) {
        uint256 total = 0;
        for (uint i = 0; i < _amounts.length; i++) {
            total += _amounts[i];
        }

        require(_tokens >= total, "Not enough tokens");
        _;
    }

    function distribute(
        address[] memory _recipients,
        uint256[] memory _amounts,
        uint256 _tokens
    ) public onlyOwner hasEnoughTokens(_amounts, _tokens) {
        for (uint i = 0; i < _recipients.length; i++) {
            recipients[_recipients[i]] += _amounts[i];
        }
        emit Distribute(_recipients, _amounts);
        token.transferFrom(msg.sender, address(this), _tokens);
        assert(token.balanceOf(address(this)) >= _tokens);
    }

    function redeem() public {
        require(recipients[msg.sender] > 0, "Nothing to redeem");
        uint256 airdrop = recipients[msg.sender];
        recipients[msg.sender] = 0;
        emit Redeem(msg.sender, airdrop);
        token.transfer(msg.sender, airdrop);
    }
}
