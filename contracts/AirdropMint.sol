// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AirdropMint is ERC20, Ownable {
    uint256 mintAmount;
    mapping(address => bool) public recipientsMapping;

    event MintAirdrop(address recipient, uint256 amount);

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 mintAmount_
    ) ERC20(name_, symbol_) {
        mintAmount = mintAmount_;
    }

    function setMintAmount(uint256 value) public onlyOwner {
        mintAmount = value;
    }

    function addRecipients(address[] memory entries) public onlyOwner {
        handleRecipients(entries, true);
    }

    function removeRecipients(address[] memory entries) public onlyOwner {
        handleRecipients(entries, false);
    }

    function mintAirdrop() public {
        require(recipientsMapping[msg.sender], "Not a whitelisted recipient");
        recipientsMapping[msg.sender] = false;
        emit MintAirdrop(msg.sender, mintAmount);
        _mint(msg.sender, mintAmount);
    }

    function handleRecipients(address[] memory entries, bool action) internal {
        for (uint256 i = 0; i < entries.length; i++) {
            address recipient = entries[i];
            if (recipientsMapping[recipient] != action) {
                recipientsMapping[recipient] = action;
            }
        }
    }
}
