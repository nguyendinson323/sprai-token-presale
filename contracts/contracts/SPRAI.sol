// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SPRAI Token
 * @dev Simple BEP-20 token with fixed supply (all configuration from .env)
 */
contract SPRAI is ERC20, Ownable {
    uint8 private immutable _decimals;

    /**
     * @dev Constructor accepts all parameters from deployment script (.env)
     * @param name Token name from TOKEN_NAME
     * @param symbol Token symbol from TOKEN_SYMBOL
     * @param totalSupply Total supply from TOKEN_TOTAL_SUPPLY
     * @param decimals_ Token decimals from TOKEN_DECIMALS
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint8 decimals_
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _decimals = decimals_;
        // Mint total supply to deployer (with decimals)
        _mint(msg.sender, totalSupply * 10**decimals_);
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }
}
