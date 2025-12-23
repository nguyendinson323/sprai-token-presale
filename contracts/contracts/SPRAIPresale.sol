// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title SPRAI Presale Contract
 * @dev Handles automatic SPRAI token distribution when users pay with USDT
 *
 * FLOW:
 * 1. User approves USDT to this contract
 * 2. User calls buyTokens(usdtAmount)
 * 3. Contract transfers USDT from user to owner
 * 4. Contract transfers SPRAI tokens from owner to user (AUTOMATIC)
 * 5. Transaction recorded on-chain
 */
contract SPRAIPresale is Ownable, ReentrancyGuard {

    // ============================================
    // STATE VARIABLES
    // ============================================

    IERC20 public spraiToken;      // SPRAI token contract
    IERC20 public usdtToken;       // USDT token contract (BEP-20)

    uint256 public tokenPriceUsdt; // Price in USDT (with 18 decimals)
    uint256 public minPurchaseUsdt; // Minimum purchase amount
    uint256 public maxPurchaseUsdt; // Maximum purchase amount

    address public treasury;       // Address to receive USDT payments (owner wallet)

    bool public presaleActive;     // Presale status

    // ============================================
    // EVENTS
    // ============================================

    event TokensPurchased(
        address indexed buyer,
        uint256 usdtAmount,
        uint256 spraiAmount,
        uint256 timestamp
    );

    event PresaleStatusChanged(bool active);
    event ConfigUpdated(uint256 tokenPrice, uint256 minPurchase, uint256 maxPurchase);

    // ============================================
    // CONSTRUCTOR
    // ============================================

    constructor(
        address _spraiToken,
        address _usdtToken,
        address _treasury,
        uint256 _tokenPriceUsdt,
        uint256 _minPurchaseUsdt,
        uint256 _maxPurchaseUsdt
    ) Ownable(msg.sender) {
        require(_spraiToken != address(0), "Invalid SPRAI token address");
        require(_usdtToken != address(0), "Invalid USDT token address");
        require(_treasury != address(0), "Invalid treasury address");
        require(_tokenPriceUsdt > 0, "Token price must be greater than 0");

        spraiToken = IERC20(_spraiToken);
        usdtToken = IERC20(_usdtToken);
        treasury = _treasury;
        tokenPriceUsdt = _tokenPriceUsdt;
        minPurchaseUsdt = _minPurchaseUsdt;
        maxPurchaseUsdt = _maxPurchaseUsdt;

        presaleActive = true;
    }

    // ============================================
    // MAIN PURCHASE FUNCTION
    // ============================================

    /**
     * @dev Buy SPRAI tokens with USDT (AUTOMATIC DISTRIBUTION)
     * @param usdtAmount Amount of USDT to spend (with 18 decimals)
     *
     * REQUIREMENTS:
     * - Presale must be active
     * - Amount within min/max limits
     * - User must have approved USDT to this contract
     * - Owner must have approved SPRAI tokens to this contract
     */
    function buyTokens(uint256 usdtAmount) external nonReentrant {
        require(presaleActive, "Presale is not active");
        require(usdtAmount >= minPurchaseUsdt, "Below minimum purchase");
        require(usdtAmount <= maxPurchaseUsdt, "Above maximum purchase");

        // Calculate SPRAI tokens to receive
        uint256 spraiAmount = (usdtAmount * 1e18) / tokenPriceUsdt;
        require(spraiAmount > 0, "Invalid token amount");

        // Transfer USDT from buyer to treasury (owner wallet)
        require(
            usdtToken.transferFrom(msg.sender, treasury, usdtAmount),
            "USDT transfer failed"
        );

        // Transfer SPRAI tokens from owner to buyer (AUTOMATIC)
        require(
            spraiToken.transferFrom(treasury, msg.sender, spraiAmount),
            "SPRAI transfer failed - owner must approve tokens"
        );

        emit TokensPurchased(msg.sender, usdtAmount, spraiAmount, block.timestamp);
    }

    // ============================================
    // OWNER FUNCTIONS
    // ============================================

    /**
     * @dev Enable or disable presale
     */
    function setPresaleStatus(bool _active) external onlyOwner {
        presaleActive = _active;
        emit PresaleStatusChanged(_active);
    }

    /**
     * @dev Update presale configuration
     */
    function updateConfig(
        uint256 _tokenPriceUsdt,
        uint256 _minPurchaseUsdt,
        uint256 _maxPurchaseUsdt
    ) external onlyOwner {
        require(_tokenPriceUsdt > 0, "Token price must be greater than 0");

        tokenPriceUsdt = _tokenPriceUsdt;
        minPurchaseUsdt = _minPurchaseUsdt;
        maxPurchaseUsdt = _maxPurchaseUsdt;

        emit ConfigUpdated(_tokenPriceUsdt, _minPurchaseUsdt, _maxPurchaseUsdt);
    }

    /**
     * @dev Update treasury address
     */
    function updateTreasury(address _newTreasury) external onlyOwner {
        require(_newTreasury != address(0), "Invalid treasury address");
        treasury = _newTreasury;
    }

    // ============================================
    // VIEW FUNCTIONS
    // ============================================

    /**
     * @dev Calculate SPRAI amount for given USDT amount
     */
    function calculateSpraiAmount(uint256 usdtAmount) external view returns (uint256) {
        return (usdtAmount * 1e18) / tokenPriceUsdt;
    }

    /**
     * @dev Get presale configuration
     */
    function getConfig() external view returns (
        uint256 price,
        uint256 minPurchase,
        uint256 maxPurchase,
        bool active
    ) {
        return (tokenPriceUsdt, minPurchaseUsdt, maxPurchaseUsdt, presaleActive);
    }
}
