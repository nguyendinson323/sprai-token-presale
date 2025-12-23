// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SPRAI Token
 * @dev Simple BEP-20 token with fixed supply
 */
contract SPRAI is ERC20, Ownable {
    constructor() ERC20("SPRAI TOKEN", "SPRAI") Ownable(msg.sender) {
        // Mint 2,000,000 tokens to deployer
        _mint(msg.sender, 2_000_000 * 10**18);
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
