# SPRAI Token Project - Implementation Guide

**CRITICAL RULE #1: NEVER HARDCODE ANY VALUES - ALWAYS USE ENVIRONMENT VARIABLES FROM DAY ONE**

## Project Overview

Client: Alan (A.W.)
Platform: BNB Smart Chain (BSC)
Token Name: SPRAI TOKEN
Token Symbol: SPRAI
Total Supply: 2,000,000 SPRAI (fixed, no minting)
Owner Wallet: 0xCE7Bc99cA0C86Ef55aDF549191b7F498807dE311
Website: https://spraicoin.github.io
Payment Currency: USDT BEP-20 on BSC

### Technology Stack

**Frontend:**
- React 18+ with Vite
- TypeScript
- TailwindCSS for styling
- Redux Toolkit with Redux Slice
- Ethers.js for Web3
- React Router

**Backend:**
- Node.js with Express
- TypeScript
- PostgreSQL database
- Sequelize ORM
- Ethers.js for blockchain validation

**Smart Contracts:**
- Solidity 0.8.20
- Hardhat
- OpenZeppelin contracts

### Tokenomics (Organizational - Manual Distribution)

The client will manage token allocation via on-chain transfers after deployment:
- **50%** (1,000,000 SPRAI) — Liquidity
- **25%** (500,000 SPRAI) — Pre-sale
- **12.5%** (250,000 SPRAI) — Marketing
- **12.5%** (250,000 SPRAI) — Reserve

**Important Note:** These allocations are NOT implemented in the smart contract. The contract remains a simple BEP-20 with all 2,000,000 tokens minted to the owner at deployment.

---

## Project Scope

### Milestone 1: Smart Contract Development
- Simple, secure BEP-20 token contract (OpenZeppelin standard)
- Fixed supply of 2,000,000 tokens
- No fees, no mint function, no pause, no blacklist
- **⚠️ PRESALE SMART CONTRACT for automatic token distribution**
- Deployment scripts with Hardhat

### Milestone 2: Website Integration
- React SPA with Vite + TypeScript + TailwindCSS + Redux
- Web3 wallet connection (MetaMask/WalletConnect)
- Pre-sale purchase interface integrated with presale contract
- **AUTOMATIC SPRAI distribution via smart contract (no manual distribution)**
- USDT payments to owner wallet
- Transaction tracking with Redux state management
- Backend API for transaction logging and validation
- PostgreSQL database for permanent storage

---

## 🚨 CRITICAL: How Presale Works (Automatic Distribution)

The client's requirement is **AUTOMATIC token distribution** - NOT manual:

> "The contract executes the purchase, and the SPRAI token is automatically sent to the buyer's wallet, **without any manual action on my part**"

### Flow:
1. User connects wallet to website
2. User enters USDT amount (min 10, max 10,000)
3. User approves USDT to presale contract
4. User clicks "Buy SPRAI"
5. **PRESALE CONTRACT automatically:**
   - Transfers USDT from buyer to owner's wallet
   - Transfers SPRAI tokens from owner to buyer (**IN SAME TRANSACTION**)
   - Emits event for backend tracking

### Requirements:
- **Owner MUST approve** 500,000 SPRAI tokens to presale contract BEFORE presale starts
- Contract calculates: SPRAI amount = USDT amount / 0.50
- All transactions are atomic (both transfers succeed or both fail)
- Backend tracks transactions via smart contract events

---

## ⚠️ CRITICAL RULES - READ THIS FIRST ⚠️

### RULE #1: ENVIRONMENT VARIABLES ONLY - NO HARDCODED VALUES

**NEVER HARDCODE:**
- ❌ Contract addresses
- ❌ Wallet addresses
- ❌ Token prices
- ❌ API URLs
- ❌ RPC URLs
- ❌ Chain IDs
- ❌ Database credentials
- ❌ ANY configuration value

**ALWAYS USE:**
- ✅ Environment variables in `.env` file
- ✅ `process.env.VARIABLE_NAME` in backend
- ✅ `import.meta.env.VITE_VARIABLE_NAME` in Vite frontend
- ✅ Configuration loaders that read from `.env`

### RULE #2: Configuration Management

1. **Backend:** ALL config from root `.env` file
   ```typescript
   // backend/src/config/index.ts
   import dotenv from 'dotenv';
   dotenv.config({ path: path.resolve(__dirname, '../../.env') });

   export const config = {
     ownerWallet: process.env.OWNER_WALLET || '',
     database: {
       host: process.env.DB_HOST || '',
       port: parseInt(process.env.DB_PORT || '5432'),
       database: process.env.DB_NAME || '',
       username: process.env.DB_USER || '',
       password: process.env.DB_PASSWORD || '',
     }
     // ... ALL from environment variables
   };
   ```

2. **Frontend (Vite):** ALL config from environment variables with VITE_ prefix
   ```typescript
   // frontend/src/config/index.ts
   export const config = {
     usdtContract: import.meta.env.VITE_USDT_CONTRACT || '',
     ownerWallet: import.meta.env.VITE_OWNER_WALLET || '',
     apiUrl: import.meta.env.VITE_API_URL || '',
     chainId: parseInt(import.meta.env.VITE_CHAIN_ID || '56'),
     // ... ALL from environment variables
   };
   ```

3. **Smart Contracts:** Use Hardhat environment variables
   ```javascript
   // hardhat.config.js
   require('dotenv').config();

   module.exports = {
     networks: {
       bscMainnet: {
         url: process.env.BSC_MAINNET_RPC || '',
         accounts: [process.env.DEPLOYER_PRIVATE_KEY || ''],
       }
     }
   };
   ```

### RULE #3: Verification Before Implementation

Before writing ANY code:
1. ✅ Create `.env` file with ALL parameters
2. ✅ Create `.env.example` template
3. ✅ Create config loader that reads from `.env`
4. ✅ Verify config loader works
5. ✅ THEN start implementing features

---

## Implementation Steps

---

## STEP 1: Environment Setup & Configuration

### Objective
Set up project structure and **CENTRALIZED CONFIGURATION MANAGEMENT FROM DAY ONE**.

### Tasks

#### 1.1 Create Project Structure

```
Alan/
├── .env                    # ⚠️ CREATE THIS FIRST
├── .env.example           # ⚠️ CREATE THIS SECOND
├── contracts/
│   ├── contracts/
│   │   ├── SPRAI.sol
│   │   └── SPRAIDistributor.sol
│   ├── scripts/
│   │   ├── deploy.ts
│   │   └── deployDistributor.ts
│   ├── test/
│   ├── hardhat.config.ts
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── index.ts    # ⚠️ CONFIG LOADER - CREATE THIS FIRST
│   │   ├── database/
│   │   │   ├── config.ts
│   │   │   └── models/
│   │   │       └── Transaction.ts
│   │   ├── controllers/
│   │   │   └── transactionController.ts
│   │   ├── routes/
│   │   │   └── transactions.ts
│   │   ├── services/
│   │   │   └── web3Service.ts
│   │   ├── middleware/
│   │   │   ├── cors.ts
│   │   │   └── rateLimit.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── config/
│   │   │   └── index.ts    # ⚠️ CONFIG - CREATE THIS FIRST
│   │   ├── store/
│   │   │   ├── index.ts
│   │   │   └── slices/
│   │   │       ├── walletSlice.ts
│   │   │       └── transactionSlice.ts
│   │   ├── services/
│   │   │   ├── web3Service.ts
│   │   │   └── apiService.ts
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── package.json
│   └── tsconfig.json
└── docs/
```

#### 1.2 Create .env File (ROOT OF PROJECT)

**⚠️ THIS IS THE FIRST FILE YOU MUST CREATE ⚠️**

```env
# ============================================
# NETWORK CONFIGURATION
# ============================================
NETWORK=bsc_mainnet
BSC_MAINNET_RPC=https://bsc-dataseed.binance.org/
BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.binance.org:8545/
CHAIN_ID_MAINNET=56
CHAIN_ID_TESTNET=97

# ============================================
# TOKEN CONFIGURATION
# ============================================
TOKEN_NAME=SPRAI TOKEN
TOKEN_SYMBOL=SPRAI
TOKEN_DECIMALS=18
TOKEN_TOTAL_SUPPLY=2000000
OWNER_WALLET=0xCE7Bc99cA0C86Ef55aDF549191b7F498807dE311

# ============================================
# USDT CONTRACT ADDRESSES (BSC)
# ============================================
# USDT BEP-20 on BSC Mainnet
USDT_CONTRACT_BSC=0x55d398326f99059fF775485246999027B3197955
# USDT on BSC Testnet
USDT_CONTRACT_TESTNET=0x337610d27c682E347C9cD60BD4b3b107C9d34dDd

# ============================================
# PRE-SALE CONFIGURATION
# ⚠️ CRITICAL: Presale uses SMART CONTRACT for automatic distribution
# ============================================
PRESALE_TOKEN_PRICE_USDT=0.50
PRESALE_MIN_PURCHASE_USDT=10
PRESALE_MAX_PURCHASE_USDT=10000

# ============================================
# BACKEND CONFIGURATION
# ============================================
BACKEND_PORT=3000
BACKEND_HOST=localhost
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development

# ============================================
# POSTGRESQL DATABASE CONFIGURATION
# ============================================
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sprai_presale
DB_USER=postgres
DB_PASSWORD=your_postgres_password_here
DB_POOL_MAX=20
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000

# ============================================
# JWT & SECURITY
# ============================================
JWT_SECRET=your_secure_jwt_secret_here_change_in_production
JWT_EXPIRES_IN=7d

# ============================================
# API RATE LIMITING
# ============================================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ============================================
# CONTRACT ADDRESSES (FILL IN AFTER DEPLOYMENT)
# ⚠️ THESE ARE EMPTY UNTIL YOU DEPLOY CONTRACTS
# ============================================
SPRAI_TOKEN_CONTRACT=
PRESALE_CONTRACT=

# ============================================
# DEPLOYMENT SECRETS (NEVER COMMIT TO GIT)
# ============================================
DEPLOYER_PRIVATE_KEY=
BSCSCAN_API_KEY=
```

#### 1.3 Create .env.example

Copy the `.env` file to `.env.example` - this serves as a template.

#### 1.4 Create .gitignore

```
# Environment Variables
.env
.env.local
.env.production
.env.*.local

# Never commit private keys
*private*key*
*secret*

# Dependencies
node_modules/

# Build outputs
dist/
build/

# Logs
*.log
logs/

# Frontend (Vite)
.vite/

# IDE
.vscode/
.idea/

# Database
*.db
*.sqlite

# OS
.DS_Store
Thumbs.db
```

#### 1.5 Create Backend Configuration Loader

**⚠️ CREATE THIS BEFORE ANY OTHER BACKEND CODE ⚠️**

File: `backend/src/config/index.ts`

```typescript
import dotenv from 'dotenv';
import path from 'path';

// ============================================
// LOAD ENVIRONMENT VARIABLES FROM ROOT .env
// ============================================
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// ============================================
// EXPORT CONFIGURATION OBJECT
// ALL VALUES FROM ENVIRONMENT VARIABLES
// ZERO HARDCODED VALUES
// ============================================
export const config = {
  // Network
  network: process.env.NETWORK || 'bsc_mainnet',
  bscMainnetRpc: process.env.BSC_MAINNET_RPC || '',
  bscTestnetRpc: process.env.BSC_TESTNET_RPC || '',
  chainIdMainnet: parseInt(process.env.CHAIN_ID_MAINNET || '56'),
  chainIdTestnet: parseInt(process.env.CHAIN_ID_TESTNET || '97'),

  // Token
  tokenName: process.env.TOKEN_NAME || 'SPRAI TOKEN',
  tokenSymbol: process.env.TOKEN_SYMBOL || 'SPRAI',
  tokenDecimals: parseInt(process.env.TOKEN_DECIMALS || '18'),
  tokenTotalSupply: parseInt(process.env.TOKEN_TOTAL_SUPPLY || '2000000'),
  ownerWallet: process.env.OWNER_WALLET || '',

  // USDT Contract
  usdtContractBsc: process.env.USDT_CONTRACT_BSC || '',
  usdtContractTestnet: process.env.USDT_CONTRACT_TESTNET || '',

  // Pre-sale
  presaleTokenPriceUsdt: parseFloat(process.env.PRESALE_TOKEN_PRICE_USDT || '0.50'),
  presaleMinPurchaseUsdt: parseFloat(process.env.PRESALE_MIN_PURCHASE_USDT || '10'),
  presaleMaxPurchaseUsdt: parseFloat(process.env.PRESALE_MAX_PURCHASE_USDT || '10000'),

  // Backend
  backendPort: parseInt(process.env.BACKEND_PORT || '3000'),
  backendHost: process.env.BACKEND_HOST || 'localhost',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',

  // PostgreSQL Database
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'sprai_presale',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    pool: {
      max: parseInt(process.env.DB_POOL_MAX || '20'),
      min: parseInt(process.env.DB_POOL_MIN || '0'),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE || '30000'),
      idle: parseInt(process.env.DB_POOL_IDLE || '10000'),
    },
  },

  // JWT & Security
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',

  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),

  // Contract Addresses (empty until deployment)
  spraiTokenContract: process.env.SPRAI_TOKEN_CONTRACT || '',
  spraiPresaleContract: process.env.PRESALE_CONTRACT || '',
};

// ============================================
// VALIDATION - ENSURE REQUIRED VALUES ARE SET
// ============================================
const requiredEnvVars = [
  'OWNER_WALLET',
  'DB_HOST',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} must be set in .env file`);
  }
});

if (!config.jwtSecret || config.jwtSecret === 'your_secure_jwt_secret_here_change_in_production') {
  console.warn('⚠️  WARNING: JWT_SECRET should be changed in production');
}

export default config;
```

#### 1.6 Create Frontend Configuration (Vite)

**⚠️ CREATE THIS BEFORE ANY OTHER FRONTEND CODE ⚠️**

File: `frontend/.env`

```env
# ============================================
# FRONTEND ENVIRONMENT VARIABLES (VITE)
# ALL VARIABLES MUST START WITH VITE_
# ============================================

# USDT Contract Address (BSC Mainnet)
VITE_USDT_CONTRACT=0x55d398326f99059fF775485246999027B3197955

# Owner Wallet (Treasury - receives USDT)
VITE_OWNER_WALLET=0xCE7Bc99cA0C86Ef55aDF549191b7F498807dE311

# Contract Addresses (Fill after deployment)
VITE_SPRAI_TOKEN_CONTRACT=
VITE_PRESALE_CONTRACT=

# Pre-sale Configuration
VITE_TOKEN_PRICE_USDT=0.50
VITE_MIN_PURCHASE_USDT=10
VITE_MAX_PURCHASE_USDT=10000

# BSC Network Configuration
VITE_BSC_RPC_URL=https://bsc-dataseed.binance.org/
VITE_CHAIN_ID=56

# Backend API URL
VITE_API_URL=http://localhost:3000/api
```

File: `frontend/src/config/index.ts`

```typescript
// ============================================
// FRONTEND CONFIGURATION
// ALL VALUES FROM ENVIRONMENT VARIABLES
// ZERO HARDCODED VALUES
// ============================================

export const config = {
  // Network
  bscRpcUrl: import.meta.env.VITE_BSC_RPC_URL || '',
  chainId: parseInt(import.meta.env.VITE_CHAIN_ID || '56'),

  // Contracts
  usdtContract: import.meta.env.VITE_USDT_CONTRACT || '',
  spraiTokenContract: import.meta.env.VITE_SPRAI_TOKEN_CONTRACT || '',
  presaleContract: import.meta.env.VITE_PRESALE_CONTRACT || '',
  ownerWallet: import.meta.env.VITE_OWNER_WALLET || '',

  // Pre-sale
  tokenPriceUsdt: parseFloat(import.meta.env.VITE_TOKEN_PRICE_USDT || '0.50'),
  minPurchaseUsdt: parseFloat(import.meta.env.VITE_MIN_PURCHASE_USDT || '10'),
  maxPurchaseUsdt: parseFloat(import.meta.env.VITE_MAX_PURCHASE_USDT || '10000'),

  // Backend API
  apiUrl: import.meta.env.VITE_API_URL || '',
};

// ============================================
// VALIDATION - ENSURE REQUIRED VALUES ARE SET
// ============================================
const requiredVars = [
  { key: 'VITE_USDT_CONTRACT', value: config.usdtContract },
  { key: 'VITE_OWNER_WALLET', value: config.ownerWallet },
  { key: 'VITE_API_URL', value: config.apiUrl },
  { key: 'VITE_BSC_RPC_URL', value: config.bscRpcUrl },
];

requiredVars.forEach(({ key, value }) => {
  if (!value) {
    throw new Error(`${key} must be set in .env file`);
  }
});

if (config.tokenPriceUsdt === 0) {
  throw new Error('VITE_TOKEN_PRICE_USDT must be set in .env file');
}

export default config;
```

### Validation Checklist for Step 1

Before proceeding to Step 2:
- [ ] `.env` file created in project root
- [ ] `.env.example` created (safe to commit)
- [ ] `frontend/.env` created
- [ ] `.gitignore` includes `.env`
- [ ] Backend config loader created (`backend/src/config/index.ts`)
- [ ] Frontend config created (`frontend/src/config/index.ts`)
- [ ] Config loaders tested and working
- [ ] NO hardcoded values anywhere
- [ ] All values loaded from environment variables

**⚠️ DO NOT PROCEED TO STEP 2 UNTIL ALL CHECKBOXES ARE CHECKED ⚠️**

---

## STEP 2: Smart Contract Development

### Objective
Develop simple, secure BEP-20 token contract with ALL configuration from environment variables.

### Tasks

#### 2.1 Setup Contracts Package

File: `contracts/package.json`

```json
{
  "name": "sprai-contracts",
  "version": "1.0.0",
  "scripts": {
    "compile": "hardhat compile",
    "test": "hardhat test",
    "deploy:testnet": "hardhat run scripts/deploy.ts --network bscTestnet",
    "deploy:mainnet": "hardhat run scripts/deploy.ts --network bscMainnet"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^6.1.0",
    "@openzeppelin/contracts": "^5.4.0",
    "dotenv": "^17.2.3",
    "hardhat": "^2.28.0",
    "typescript": "^5.9.3"
  }
}
```

#### 2.2 Setup Hardhat with Environment Variables

File: `contracts/hardhat.config.ts`

```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import path from "path";

// ⚠️ Load from root .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // ⚠️ ALL VALUES FROM ENVIRONMENT VARIABLES
    bscMainnet: {
      url: process.env.BSC_MAINNET_RPC || '',
      chainId: parseInt(process.env.CHAIN_ID_MAINNET || '56'),
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
    },
    bscTestnet: {
      url: process.env.BSC_TESTNET_RPC || '',
      chainId: parseInt(process.env.CHAIN_ID_TESTNET || '97'),
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      bsc: process.env.BSCSCAN_API_KEY || '',
      bscTestnet: process.env.BSCSCAN_API_KEY || '',
    },
  },
};

export default config;
```

#### 2.3 Create SPRAI Token Contract

File: `contracts/contracts/SPRAI.sol`

```solidity
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
```

#### 2.4 Create PRE-SALE Smart Contract

**⚠️ CRITICAL: This contract enables AUTOMATIC token distribution during pre-sale**

The client requirement is clear:
> "The contract executes the purchase, and the SPRAI token is automatically sent to the buyer's wallet, **without any manual action on my part**"

File: `contracts/contracts/SPRAIPresale.sol`

```solidity
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
```

**IMPORTANT NOTES about Presale Contract:**

1. **Automatic Distribution**: When a user buys tokens, SPRAI is automatically sent from owner's wallet to buyer's wallet in the SAME transaction
2. **Owner Must Approve**: Before presale starts, owner must approve SPRAI tokens to the presale contract:
   ```javascript
   // Owner calls this on SPRAI token contract:
   spraiToken.approve(presaleContractAddress, 500000 * 10**18); // Approve 500k tokens for presale
   ```
3. **USDT Flow**: USDT goes directly from buyer to owner's treasury wallet
4. **On-Chain Events**: Every purchase emits an event for tracking
5. **No Custody**: Contract never holds funds - it only facilitates atomic swaps

#### 2.5 Create Deployment Script

**⚠️ CRITICAL: ALL VALUES FROM ENVIRONMENT VARIABLES ⚠️**

File: `contracts/scripts/deploy.ts`

```typescript
import { ethers } from "hardhat";
import hre from "hardhat";

async function main() {
  console.log("\n🚀 Starting SPRAI Project Deployment...\n");

  // ⚠️ GET ALL VALUES FROM ENVIRONMENT VARIABLES
  const ownerWallet = process.env.OWNER_WALLET;
  const usdtContract = process.env.USDT_CONTRACT_BSC;
  const tokenPriceUsdt = process.env.PRESALE_TOKEN_PRICE_USDT || '0.50';
  const minPurchase = process.env.PRESALE_MIN_PURCHASE_USDT || '10';
  const maxPurchase = process.env.PRESALE_MAX_PURCHASE_USDT || '10000';

  if (!ownerWallet || !usdtContract) {
    throw new Error("Missing required environment variables: OWNER_WALLET, USDT_CONTRACT_BSC");
  }

  console.log("📋 Deployment Configuration:");
  console.log("   Network:", hre.network.name);
  console.log("   Owner Wallet:", ownerWallet);
  console.log("   USDT Contract:", usdtContract);
  console.log("   Token Price:", tokenPriceUsdt, "USDT");
  console.log("   Min Purchase:", minPurchase, "USDT");
  console.log("   Max Purchase:", maxPurchase, "USDT");
  console.log("");

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying from:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Balance:", ethers.formatEther(balance), "BNB\n");

  // ============================================
  // STEP 1: Deploy SPRAI Token
  // ============================================
  console.log("📦 [1/2] Deploying SPRAI Token...");
  const SPRAI = await ethers.getContractFactory("SPRAI");
  const spraiToken = await SPRAI.deploy();
  await spraiToken.waitForDeployment();

  const spraiAddress = await spraiToken.getAddress();
  console.log("✅ SPRAI Token deployed to:", spraiAddress);

  // ============================================
  // STEP 2: Deploy Presale Contract
  // ============================================
  console.log("\n📦 [2/2] Deploying Presale Contract...");

  // Convert prices to wei (18 decimals)
  const tokenPriceWei = ethers.parseUnits(tokenPriceUsdt, 18);
  const minPurchaseWei = ethers.parseUnits(minPurchase, 18);
  const maxPurchaseWei = ethers.parseUnits(maxPurchase, 18);

  const Presale = await ethers.getContractFactory("SPRAIPresale");
  const presale = await Presale.deploy(
    spraiAddress,           // SPRAI token address
    usdtContract,           // USDT token address
    ownerWallet,            // Treasury (owner wallet)
    tokenPriceWei,          // Token price in USDT
    minPurchaseWei,         // Min purchase
    maxPurchaseWei          // Max purchase
  );
  await presale.waitForDeployment();

  const presaleAddress = await presale.getAddress();
  console.log("✅ Presale Contract deployed to:", presaleAddress);

  // ============================================
  // POST-DEPLOYMENT INSTRUCTIONS
  // ============================================
  console.log("\n" + "=".repeat(60));
  console.log("🎉 DEPLOYMENT COMPLETE!");
  console.log("=".repeat(60));
  console.log("\n⚠️  CRITICAL: Update your .env files:");
  console.log(`   SPRAI_TOKEN_CONTRACT=${spraiAddress}`);
  console.log(`   PRESALE_CONTRACT=${presaleAddress}`);
  console.log(`   VITE_SPRAI_TOKEN_CONTRACT=${spraiAddress}`);
  console.log(`   VITE_PRESALE_CONTRACT=${presaleAddress}`);

  console.log("\n📝 NEXT STEPS (OWNER MUST DO THIS):");
  console.log("1. Approve SPRAI tokens for presale contract:");
  console.log(`   Call approve() on SPRAI token (${spraiAddress})`);
  console.log(`   Spender: ${presaleAddress}`);
  console.log(`   Amount: 500000000000000000000000 (500,000 tokens with 18 decimals)`);
  console.log("");
  console.log("2. Verify contracts on BSCScan:");
  console.log(`   npx hardhat verify --network ${hre.network.name} ${spraiAddress}`);
  console.log(`   npx hardhat verify --network ${hre.network.name} ${presaleAddress} ${spraiAddress} ${usdtContract} ${ownerWallet} ${tokenPriceWei} ${minPurchaseWei} ${maxPurchaseWei}`);
  console.log("");
  console.log("3. Test the presale with a small amount before going live!");
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Validation Checklist for Step 2

- [ ] Hardhat config uses environment variables
- [ ] NO hardcoded RPC URLs
- [ ] NO hardcoded private keys
- [ ] Deployment script shows which .env variables to update
- [ ] TypeScript compilation successful

---

## STEP 3: Backend Development (Node + Express + PostgreSQL + Sequelize)

### Objective
Build backend API with PostgreSQL database using ONLY environment variables.

### Tasks

#### 3.1 Setup Backend Package

File: `backend/package.json`

```json
{
  "name": "sprai-presale-backend",
  "version": "1.0.0",
  "description": "SPRAI Token Pre-sale Backend API",
  "main": "dist/server.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "ts-node src/server.ts",
    "db:migrate": "sequelize-cli db:migrate",
    "db:migrate:undo": "sequelize-cli db:migrate:undo"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "ethers": "^6.16.0",
    "express": "^4.18.2",
    "express-rate-limit": "^7.1.5",
    "helmet": "^7.1.0",
    "pg": "^8.11.3",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.35.2"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.6",
    "sequelize-cli": "^6.6.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  }
}
```

#### 3.2 Setup Sequelize Configuration

File: `backend/src/database/config.ts`

```typescript
import { Sequelize } from 'sequelize';
import { config } from '../config';

// ============================================
// SEQUELIZE DATABASE CONNECTION
// ALL VALUES FROM ENVIRONMENT VARIABLES
// ============================================

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.database.host,
  port: config.database.port,
  database: config.database.database,
  username: config.database.username,
  password: config.database.password,
  pool: {
    max: config.database.pool.max,
    min: config.database.pool.min,
    acquire: config.database.pool.acquire,
    idle: config.database.pool.idle,
  },
  logging: config.nodeEnv === 'development' ? console.log : false,
});

export default sequelize;
```

#### 3.3 Create Transaction Model

File: `backend/src/database/models/Transaction.ts`

```typescript
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config';

// ============================================
// TRANSACTION MODEL
// ============================================

interface TransactionAttributes {
  id: number;
  transactionHash: string;
  buyerWallet: string;
  usdtAmount: string;
  spraiAmount: string;
  tokenPrice: string;
  blockNumber: number;
  timestamp: Date;
  validated: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: number;
  public transactionHash!: string;
  public buyerWallet!: string;
  public usdtAmount!: string;
  public spraiAmount!: string;
  public tokenPrice!: string;
  public blockNumber!: number;
  public timestamp!: Date;
  public validated!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    transactionHash: {
      type: DataTypes.STRING(66),
      allowNull: false,
      unique: true,
      field: 'transaction_hash',
    },
    buyerWallet: {
      type: DataTypes.STRING(42),
      allowNull: false,
      field: 'buyer_wallet',
    },
    usdtAmount: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      field: 'usdt_amount',
    },
    spraiAmount: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      field: 'sprai_amount',
    },
    tokenPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'token_price',
    },
    blockNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'block_number',
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'transactions',
    timestamps: true,
    underscored: true,
  }
);

export default Transaction;
```

#### 3.4 Create Web3 Service (MUST USE CONFIG)

File: `backend/src/services/web3Service.ts`

```typescript
import { ethers } from 'ethers';
import { config } from '../config';  // ⚠️ IMPORT CONFIG

// ============================================
// WEB3 SERVICE - BLOCKCHAIN VALIDATION
// ALL VALUES FROM CONFIGURATION
// ============================================

class Web3Service {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    // ⚠️ USE CONFIG - NO HARDCODED VALUES
    const rpcUrl = config.network === 'bsc_mainnet'
      ? config.bscMainnetRpc
      : config.bscTestnetRpc;

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  /**
   * ⚠️ CRITICAL: Validate transaction is to PRESALE CONTRACT
   * The presale contract handles both USDT→owner and SPRAI→buyer transfers
   */
  async validateTransaction(txHash: string) {
    try {
      // Get transaction
      const tx = await this.provider.getTransaction(txHash);
      if (!tx) {
        return {
          valid: false,
          error: 'Transaction not found',
        };
      }

      // Wait for confirmation
      const receipt = await this.provider.getTransactionReceipt(txHash);
      if (!receipt) {
        return {
          valid: false,
          error: 'Transaction not confirmed',
        };
      }

      // Check if transaction succeeded
      if (receipt.status !== 1) {
        return {
          valid: false,
          error: 'Transaction failed on-chain',
        };
      }

      // ⚠️ CRITICAL: Validate transaction called PRESALE CONTRACT
      // User should have called presale.buyTokens(), not direct USDT transfer
      const expectedContract = config.spraiPresaleContract?.toLowerCase();
      const actualTo = tx.to?.toLowerCase();

      if (!expectedContract) {
        return {
          valid: false,
          error: 'Presale contract not configured',
        };
      }

      if (actualTo !== expectedContract) {
        return {
          valid: false,
          error: 'Transaction must be to presale contract',
        };
      }

      // Get block details
      const block = await this.provider.getBlock(receipt.blockNumber);

      return {
        valid: true,
        details: {
          blockNumber: receipt.blockNumber,
          timestamp: new Date(block!.timestamp * 1000),
          from: tx.from,
          to: tx.to,
          gasUsed: receipt.gasUsed.toString(),
        },
      };
    } catch (error) {
      console.error('Web3 validation error:', error);
      return {
        valid: false,
        error: 'Blockchain validation failed',
      };
    }
  }
}

export default new Web3Service();
```

#### 3.5 Create Server with Express

File: `backend/src/server.ts`

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config';  // ⚠️ IMPORT CONFIG
import sequelize from './database/config';
import transactionRoutes from './routes/transactions';

const app = express();

// ============================================
// MIDDLEWARE - ALL FROM CONFIG
// ============================================

// ⚠️ USE CONFIG FOR CORS
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

app.use(helmet());
app.use(express.json());

// ⚠️ USE CONFIG FOR RATE LIMITING
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// ============================================
// ROUTES
// ============================================

app.use('/api/transactions', transactionRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// ============================================
// DATABASE CONNECTION & SERVER START
// ============================================

const PORT = config.backendPort;

sequelize.authenticate()
  .then(() => {
    console.log('✅ PostgreSQL connected successfully');

    // Sync database (creates tables if they don't exist)
    return sequelize.sync({ alter: config.nodeEnv === 'development' });
  })
  .then(() => {
    console.log('✅ Database synchronized');

    // Start server
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`📡 CORS origin: ${config.corsOrigin}`);
      console.log(`🔒 Rate limit: ${config.rateLimitMaxRequests} req/${config.rateLimitWindowMs}ms`);
      console.log(`🌍 Environment: ${config.nodeEnv}\n`);
    });
  })
  .catch((error) => {
    console.error('❌ Unable to connect to database:', error);
    process.exit(1);
  });
```

### Validation Checklist for Step 3

- [ ] PostgreSQL installed and running
- [ ] Database created (`CREATE DATABASE sprai_presale;`)
- [ ] ALL files import from `config/index.ts`
- [ ] NO hardcoded database credentials
- [ ] NO hardcoded wallet addresses
- [ ] NO hardcoded contract addresses
- [ ] Server starts successfully
- [ ] Database connection successful

---

## STEP 4: Frontend Development (React + Vite + TypeScript + TailwindCSS + Redux)

### Objective
Create React SPA with Vite that integrates the existing spraicoin landing page and adds pre-sale functionality, using ONLY environment variables.

### ⚠️ CRITICAL: End-to-End Data Flow Requirements

**RULE #1: Type-Safe Redux Architecture**
- ALL data must flow through Redux with TypeScript interfaces
- NO direct API calls from components - use Redux thunks/middleware
- ALL state must be typed using TypeScript interfaces that match database schema
- Global loading state managed in Redux store

**RULE #2: Data Flow Pattern**
```
Database Schema → Backend Types → API Response → Redux Types → Component Props
```

**RULE #3: Component Structure**
```
pages/
  ├── Home/
  │   ├── index.tsx          # Page component
  │   ├── sections/
  │   │   ├── Header.tsx     # Section components
  │   │   ├── About.tsx
  │   │   └── FAQ.tsx
  │   └── types.ts           # Page-specific types
  └── Presale/
      ├── index.tsx
      ├── sections/
      │   ├── WalletConnect.tsx
      │   ├── PurchaseForm.tsx
      │   └── TransactionHistory.tsx
      └── types.ts
```

**RULE #4: Responsive Design**
- ALL components must be responsive (mobile, tablet, desktop)
- Use TailwindCSS responsive utilities (sm:, md:, lg:, xl:)
- Test on all device sizes

### Important: Existing Website Integration

The client has an existing website in the `spraicoin/` folder with:
- Single-page HTML layout (index.html)
- Green/nature gradient theme
- Logo and banner images (logo.png, banner-dois.jpeg, sprai-banner.png)
- Portuguese/English bilingual content
- Links to PancakeSwap, social media, whitepaper PDFs
- FAQ section
- Environmental campaign information

**Your task:** Convert this existing landing page to React + TailwindCSS components and integrate the pre-sale functionality.

### Design Theme (from existing site)
- **Colors:**
  - Background gradient: Green (#3E7C47) to Brown (#5C3A21)
  - Header gradient: Gold (#FFD700) to Green (#2E8B57)
  - Button color: Nature green (#2E7D32) with dark green border (#1B5E20)
- **Typography:** Arial, sans-serif
- **Layout:** Centered, single-page scrolling design, fully responsive
- **Language:** Portuguese primary, with English whitepaper option

### Tasks

#### 4.1 Setup Frontend Package

File: `frontend/package.json`

```json
{
  "name": "sprai-presale-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^2.0.1",
    "ethers": "^6.10.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^9.0.4",
    "react-router-dom": "^6.21.1",
    "web3modal": "^1.9.12"
  },
  "devDependencies": {
    "@types/react": "^18.2.47",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.33",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.11"
  }
}
```

#### 4.2 Setup Vite Configuration

File: `frontend/vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
```

#### 4.3 Setup TailwindCSS

File: `frontend/tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

File: `frontend/src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 4.4 Create TypeScript Interfaces (Database-Aligned)

**⚠️ CRITICAL: These types MUST match the database schema exactly ⚠️**

File: `frontend/src/types/database.ts`

```typescript
// ============================================
// DATABASE-ALIGNED TYPES
// MUST MATCH backend/src/database/models/Transaction.ts
// ============================================

export interface TransactionDB {
  id: number;
  transactionHash: string;
  buyerWallet: string;
  usdtAmount: string;  // DECIMAL in DB
  spraiAmount: string; // DECIMAL in DB
  tokenPrice: string;  // DECIMAL in DB
  blockNumber: number;
  timestamp: Date;
  validated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionCreateDTO {
  transactionHash: string;
  buyerWallet: string;
}

export interface TransactionResponse {
  success: boolean;
  message: string;
  transaction?: TransactionDB;
}

export interface PresaleStatsDB {
  totalTransactions: number;
  totalUsdtRaised: string;
  totalSpraiSold: string;
  uniqueBuyers: number;
}
```

File: `frontend/src/types/wallet.ts`

```typescript
// ============================================
// WALLET TYPES
// ============================================

export interface WalletState {
  address: string | null;
  chainId: number | null;
  connected: boolean;
  usdtBalance: string;
  spraiBalance: string;
  loading: boolean;
  error: string | null;
}

export interface ConnectWalletPayload {
  address: string;
  chainId: number;
}
```

File: `frontend/src/types/ui.ts`

```typescript
// ============================================
// GLOBAL UI STATE TYPES
// ============================================

export interface GlobalLoadingState {
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}
```

#### 4.5 Create Redux Store with Global Loading

File: `frontend/src/store/index.ts`

```typescript
import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './slices/walletSlice';
import transactionReducer from './slices/transactionSlice';
import uiReducer from './slices/uiSlice'; // ⚠️ GLOBAL LOADING STATE

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    transaction: transactionReducer,
    ui: uiReducer, // ⚠️ GLOBAL UI STATE (loading, errors, notifications)
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ⚠️ Typed hooks for use throughout application
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

#### 4.6 Create Global UI Slice (Loading System)

File: `frontend/src/store/slices/uiSlice.ts`

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalLoadingState, ToastNotification } from '../../types/ui';

// ============================================
// GLOBAL UI STATE - LOADING & NOTIFICATIONS
// ============================================

interface UIState extends GlobalLoadingState {
  notifications: ToastNotification[];
}

const initialState: UIState = {
  isLoading: false,
  loadingMessage: '',
  error: null,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // ⚠️ GLOBAL LOADING CONTROL
    startLoading(state, action: PayloadAction<string>) {
      state.isLoading = true;
      state.loadingMessage = action.payload;
      state.error = null;
    },
    stopLoading(state) {
      state.isLoading = false;
      state.loadingMessage = '';
    },
    setError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    // Notifications
    addNotification(state, action: PayloadAction<Omit<ToastNotification, 'id'>>) {
      const notification: ToastNotification = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.notifications.push(notification);
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const {
  startLoading,
  stopLoading,
  setError,
  clearError,
  addNotification,
  removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
```

#### 4.7 Create Wallet Slice with Redux Thunks (Type-Safe)

**⚠️ CRITICAL: Use Redux Thunks for ALL async operations ⚠️**

File: `frontend/src/store/slices/walletSlice.ts`

```typescript
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WalletState, ConnectWalletPayload } from '../../types/wallet';
import web3Service from '../../services/web3Service';
import { startLoading, stopLoading, setError } from './uiSlice';

// ============================================
// INITIAL STATE - TYPED
// ============================================

const initialState: WalletState = {
  address: null,
  chainId: null,
  connected: false,
  usdtBalance: '0',
  spraiBalance: '0',
  loading: false,
  error: null,
};

// ============================================
// REDUX THUNKS - ASYNC ACTIONS
// ⚠️ ALL WEB3 OPERATIONS GO THROUGH THUNKS
// ============================================

// Connect Wallet Thunk
export const connectWallet = createAsyncThunk(
  'wallet/connect',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading('Connecting wallet...'));

      const { address, chainId } = await web3Service.connectWallet();

      // Get balances
      const usdtBalance = await web3Service.getUsdtBalance(address);

      dispatch(stopLoading());

      return { address, chainId, usdtBalance };
    } catch (error: any) {
      dispatch(setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

// Refresh Balances Thunk
export const refreshBalances = createAsyncThunk(
  'wallet/refreshBalances',
  async (address: string, { dispatch, rejectWithValue }) => {
    try {
      const usdtBalance = await web3Service.getUsdtBalance(address);
      return { usdtBalance };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ============================================
// WALLET SLICE
// ============================================

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // Synchronous actions
    disconnectWallet(state) {
      state.address = null;
      state.chainId = null;
      state.connected = false;
      state.usdtBalance = '0';
      state.spraiBalance = '0';
      state.error = null;
    },
    setChainId(state, action: PayloadAction<number>) {
      state.chainId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ⚠️ Handle async thunk states
    builder
      // Connect Wallet
      .addCase(connectWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(connectWallet.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.address = action.payload.address;
        state.chainId = action.payload.chainId;
        state.usdtBalance = action.payload.usdtBalance;
        state.connected = true;
      })
      .addCase(connectWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Refresh Balances
      .addCase(refreshBalances.fulfilled, (state, action: PayloadAction<any>) => {
        state.usdtBalance = action.payload.usdtBalance;
      });
  },
});

export const { disconnectWallet, setChainId } = walletSlice.actions;
export default walletSlice.reducer;
```

#### 4.8 Create Transaction Slice with Redux Thunks

File: `frontend/src/store/slices/transactionSlice.ts`

```typescript
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TransactionDB, TransactionCreateDTO, PresaleStatsDB } from '../../types/database';
import apiService from '../../services/apiService';
import web3Service from '../../services/web3Service';
import { startLoading, stopLoading, setError, addNotification } from './uiSlice';

// ============================================
// TRANSACTION STATE - TYPED TO MATCH DATABASE
// ============================================

interface TransactionState {
  transactions: TransactionDB[];
  stats: PresaleStatsDB | null;
  currentTransaction: TransactionDB | null;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  stats: null,
  currentTransaction: null,
  loading: false,
  error: null,
};

// ============================================
// REDUX THUNKS - ASYNC ACTIONS
// ⚠️ ALL API CALLS GO THROUGH THUNKS
// ============================================

// Submit Purchase Transaction Thunk
export const submitPurchase = createAsyncThunk(
  'transaction/submitPurchase',
  async (
    { usdtAmount, address }: { usdtAmount: string; address: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(startLoading('Processing purchase...'));

      // ⚠️ CRITICAL: Call PRESALE CONTRACT for AUTOMATIC distribution
      // This calls presale.buyTokens() which:
      // 1. Transfers USDT from buyer to owner
      // 2. Transfers SPRAI from owner to buyer (AUTOMATIC)
      const tx = await web3Service.buyTokens(usdtAmount);

      dispatch(startLoading('Waiting for transaction confirmation...'));
      await tx.wait();

      // 2. Submit to backend for tracking
      const dto: TransactionCreateDTO = {
        transactionHash: tx.hash,
        buyerWallet: address,
      };

      const response = await apiService.submitTransaction(dto.transactionHash, dto.buyerWallet);

      dispatch(stopLoading());
      dispatch(addNotification({
        type: 'success',
        message: 'Purchase successful! SPRAI tokens sent to your wallet.',
        duration: 5000,
      }));

      return response.transaction;
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(addNotification({
        type: 'error',
        message: error.message,
        duration: 5000,
      }));
      return rejectWithValue(error.message);
    }
  }
);

// Fetch User Transactions Thunk
export const fetchUserTransactions = createAsyncThunk(
  'transaction/fetchUserTransactions',
  async (walletAddress: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading('Loading transactions...'));
      const transactions = await apiService.getTransactionsByWallet(walletAddress);
      dispatch(stopLoading());
      return transactions;
    } catch (error: any) {
      dispatch(setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Presale Stats Thunk
export const fetchPresaleStats = createAsyncThunk(
  'transaction/fetchPresaleStats',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const stats = await apiService.getPresaleStats();
      return stats;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ============================================
// TRANSACTION SLICE
// ============================================

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    clearCurrentTransaction(state) {
      state.currentTransaction = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Purchase
      .addCase(submitPurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitPurchase.fulfilled, (state, action: PayloadAction<TransactionDB | undefined>) => {
        state.loading = false;
        if (action.payload) {
          state.currentTransaction = action.payload;
          state.transactions.unshift(action.payload); // Add to beginning
        }
      })
      .addCase(submitPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch User Transactions
      .addCase(fetchUserTransactions.fulfilled, (state, action: PayloadAction<TransactionDB[]>) => {
        state.transactions = action.payload;
      })
      // Fetch Presale Stats
      .addCase(fetchPresaleStats.fulfilled, (state, action: PayloadAction<PresaleStatsDB>) => {
        state.stats = action.payload;
      });
  },
});

export const { clearCurrentTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
```

#### 4.6 Create Web3 Service (ENVIRONMENT VARIABLES ONLY)

File: `frontend/src/services/web3Service.ts`

```typescript
import { ethers, BrowserProvider } from 'ethers';
import { config } from '../config';  // ⚠️ IMPORT CONFIG

// ============================================
// WEB3 SERVICE
// ALL CONFIGURATION FROM ENVIRONMENT VARIABLES
// ZERO HARDCODED VALUES
// ============================================

// ⚠️ CRITICAL: ABIs for smart contract interaction
const USDT_ABI = [
  'function balanceOf(address account) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
];

const PRESALE_ABI = [
  'function buyTokens(uint256 usdtAmount) external',
  'function calculateSpraiAmount(uint256 usdtAmount) view returns (uint256)',
  'function getConfig() view returns (uint256 price, uint256 minPurchase, uint256 maxPurchase, bool active)',
];

class Web3Service {
  private provider: BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;

  async connectWallet(): Promise<{ address: string; chainId: number }> {
    if (!window.ethereum) {
      throw new Error('Please install MetaMask');
    }

    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    this.provider = new BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();

    const address = accounts[0];
    const network = await this.provider.getNetwork();
    const chainId = Number(network.chainId);

    // ⚠️ USE CONFIG FOR CHAIN ID
    if (chainId !== config.chainId) {
      await this.switchToBSC();
    }

    return { address, chainId };
  }

  async switchToBSC() {
    if (!window.ethereum) return;

    // ⚠️ USE CONFIG FOR CHAIN ID
    const chainIdHex = '0x' + config.chainId.toString(16);

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
    } catch (error: any) {
      // Chain not added, add it
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: chainIdHex,
            chainName: 'BNB Smart Chain',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18,
            },
            rpcUrls: [config.bscRpcUrl],
            blockExplorerUrls: ['https://bscscan.com/'],
          }],
        });
      }
    }
  }

  async getUsdtBalance(address: string): Promise<string> {
    if (!this.provider) throw new Error('Wallet not connected');

    // ⚠️ USE CONFIG FOR CONTRACT ADDRESS
    const usdtContract = new ethers.Contract(
      config.usdtContract,
      USDT_ABI,
      this.provider
    );

    const balance = await usdtContract.balanceOf(address);
    return ethers.formatUnits(balance, 18);
  }

  /**
   * ⚠️ CRITICAL: Buy SPRAI tokens through PRESALE CONTRACT
   * This triggers AUTOMATIC token distribution
   *
   * FLOW:
   * 1. Approve USDT to presale contract
   * 2. Call presale.buyTokens()
   * 3. Contract automatically transfers USDT to owner and SPRAI to buyer
   */
  async buyTokens(usdtAmount: string): Promise<ethers.TransactionResponse> {
    if (!this.signer) throw new Error('Wallet not connected');
    if (!config.presaleContract) throw new Error('Presale contract not configured');

    const amountInWei = ethers.parseUnits(usdtAmount, 18);

    // Get contracts
    const usdtContract = new ethers.Contract(
      config.usdtContract,
      USDT_ABI,
      this.signer
    );

    const presaleContract = new ethers.Contract(
      config.presaleContract,
      PRESALE_ABI,
      this.signer
    );

    // Check current allowance
    const currentAllowance = await usdtContract.allowance(
      await this.signer.getAddress(),
      config.presaleContract
    );

    // Approve USDT if needed
    if (currentAllowance < amountInWei) {
      console.log('Approving USDT for presale contract...');
      const approveTx = await usdtContract.approve(config.presaleContract, amountInWei);
      await approveTx.wait();
      console.log('USDT approved');
    }

    // Call presale contract to buy tokens (AUTOMATIC DISTRIBUTION)
    console.log('Buying SPRAI tokens...');
    const tx = await presaleContract.buyTokens(amountInWei);
    return tx;
  }

  /**
   * Get presale configuration from smart contract
   */
  async getPresaleConfig() {
    if (!this.provider) throw new Error('Wallet not connected');
    if (!config.presaleContract) throw new Error('Presale contract not configured');

    const presaleContract = new ethers.Contract(
      config.presaleContract,
      PRESALE_ABI,
      this.provider
    );

    const [price, minPurchase, maxPurchase, active] = await presaleContract.getConfig();

    return {
      tokenPriceUsdt: ethers.formatUnits(price, 18),
      minPurchaseUsdt: ethers.formatUnits(minPurchase, 18),
      maxPurchaseUsdt: ethers.formatUnits(maxPurchase, 18),
      presaleActive: active,
    };
  }

  calculateSpraiAmount(usdtAmount: number): string {
    // ⚠️ USE CONFIG FOR TOKEN PRICE
    return (usdtAmount / config.tokenPriceUsdt).toFixed(2);
  }
}

export default new Web3Service();
```

#### 4.7 Create API Service (ENVIRONMENT VARIABLES ONLY)

File: `frontend/src/services/apiService.ts`

```typescript
import { config } from '../config';  // ⚠️ IMPORT CONFIG

// ============================================
// API SERVICE
// ALL CONFIGURATION FROM ENVIRONMENT VARIABLES
// ============================================

class ApiService {
  private baseUrl: string;

  constructor() {
    // ⚠️ USE CONFIG FOR API URL
    this.baseUrl = config.apiUrl;
  }

  async submitTransaction(transactionHash: string, buyerWallet: string) {
    const response = await fetch(`${this.baseUrl}/transactions/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionHash, buyerWallet }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit transaction');
    }

    return await response.json();
  }

  async getTransactionsByWallet(wallet: string) {
    const response = await fetch(`${this.baseUrl}/transactions/wallet/${wallet}`);

    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    return await response.json();
  }

  async getPresaleStats() {
    const response = await fetch(`${this.baseUrl}/transactions/stats`);

    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }

    return await response.json();
  }
}

export default new ApiService();
```

#### 4.8 Copy Assets from Existing Website

**⚠️ IMPORTANT: Copy images and PDFs from spraicoin folder ⚠️**

```bash
# Create assets directory
mkdir -p frontend/public/assets

# Copy images
cp spraicoin/logo.png frontend/public/assets/
cp spraicoin/banner-dois.jpeg frontend/public/assets/
cp spraicoin/sprai-banner.png frontend/public/assets/

# Copy whitepapers
cp spraicoin/Whitepaper_SPRAI_EN.pdf frontend/public/assets/
cp spraicoin/Whitepaper_SPRAI_PT.pdf frontend/public/assets/
```

#### 4.9 Create Landing Page Components (Responsive)

**⚠️ IMPORTANT: All components must be responsive using TailwindCSS breakpoints (sm:, md:, lg:, xl:)**

File: `frontend/src/components/Header.tsx`

```typescript
import { Link } from 'react-router-dom';

// ============================================
// HEADER COMPONENT - RESPONSIVE
// ============================================

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-yellow-400 to-green-700 py-8 px-4 sm:py-12 sm:px-5 text-center">
      {/* Logo - Responsive sizing */}
      <img
        src="/assets/logo.png"
        alt="SPRAI Logo"
        className="max-w-[40%] sm:max-w-[30%] md:max-w-[20%] h-auto mx-auto mb-4 sm:mb-5"
      />

      {/* Title - Responsive text size */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
        SPRAI TOKEN
      </h1>

      {/* Subtitle - Responsive text size and padding */}
      <p className="text-base sm:text-lg text-white max-w-md sm:max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
        A CRIPTOMOEDA PARA UM FUTURO SUSTENTÁVEL E DIGITAL.
      </p>

      {/* Banner Image - Responsive sizing */}
      <img
        src="/assets/banner-dois.jpeg"
        alt="SPRAI Banner"
        className="max-w-[90%] sm:max-w-[75%] md:max-w-[60%] h-auto mx-auto my-4 sm:my-5 rounded-sm"
      />

      {/* Action Buttons - Responsive layout and sizing */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-2">
        <Link
          to="/presale"
          className="bg-green-700 text-white py-2 px-4 sm:py-3 sm:px-8 rounded-sm border-2 border-green-900 font-bold shadow-md hover:bg-green-600 hover:shadow-lg transition-all text-sm sm:text-base"
        >
          💰 Comprar PRE-SALE SPRAI
        </Link>
        <a
          href="https://pancakeswap.finance/swap?outputCurrency=0x7C7e518D6d91498BbD850a834e36a96661ac9B1B"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-700 text-white py-2 px-4 sm:py-3 sm:px-8 rounded-sm border-2 border-green-900 font-bold shadow-md hover:bg-green-600 hover:shadow-lg transition-all text-sm sm:text-base"
        >
          🥞 Comprar PancakeSwap
        </a>
        <a
          href="/assets/Whitepaper_SPRAI_PT.pdf"
          target="_blank"
          className="bg-green-700 text-white py-2 px-4 sm:py-3 sm:px-8 rounded-sm border-2 border-green-900 font-bold shadow-md hover:bg-green-600 hover:shadow-lg transition-all text-sm sm:text-base"
        >
          📄 Ver Whitepaper (PT)
        </a>
        <a
          href="/assets/Whitepaper_SPRAI_EN.pdf"
          target="_blank"
          className="bg-green-700 text-white py-2 px-4 sm:py-3 sm:px-8 rounded-sm border-2 border-green-900 font-bold shadow-md hover:bg-green-600 hover:shadow-lg transition-all text-sm sm:text-base"
        >
          📄 View Whitepaper (EN)
        </a>
      </div>
    </header>
  );
};

export default Header;
```

File: `frontend/src/pages/Home/index.tsx`

**⚠️ IMPORTANT: Following pages/sections pattern with responsive design**

```typescript
import Header from '../../components/Header';
import AboutSection from './sections/AboutSection';
import CampaignSection from './sections/CampaignSection';
import FAQSection from './sections/FAQSection';
import LinksSection from './sections/LinksSection';

// ============================================
// HOME PAGE - MAIN LANDING PAGE
// ============================================

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-yellow-900 text-white">
      <Header />
      <AboutSection />
      <CampaignSection />
      <FAQSection />
      <LinksSection />

      {/* Banner - Responsive */}
      <img
        src="/assets/sprai-banner.png"
        alt="SPRAI Banner"
        className="max-w-[90%] sm:max-w-[70%] md:max-w-[50%] h-auto rounded-2xl sm:rounded-3xl mx-auto my-6 sm:my-8"
      />

      {/* Footer - Responsive */}
      <footer className="text-center py-6 sm:py-8 text-gray-300 text-xs sm:text-sm px-4">
        &copy; 2025 SPRAI Token – Todos os direitos reservados.<br/>
        Contato: support@spraicoin.net
      </footer>
    </div>
  );
};

export default Home;
```

File: `frontend/src/pages/Home/sections/AboutSection.tsx`

```typescript
import { FC } from 'react';

// ============================================
// ABOUT SECTION - RESPONSIVE
// ============================================

const AboutSection: FC = () => {
  return (
    <section className="text-center py-8 sm:py-12 px-4 sm:px-5">
      <p className="text-base sm:text-lg mb-4 sm:mb-6 max-w-3xl mx-auto">
        🌱 <strong>SPRAI</strong> é um token brasileiro construído na{' '}
        <strong>BNB Smart Chain</strong> com o objetivo de unir tecnologia,
        cultura local e sustentabilidade.
      </p>

      {/* Token Info Grid - Responsive */}
      <div className="max-w-2xl mx-auto space-y-2 text-sm sm:text-lg">
        <p>
          📊 <strong>Supply:</strong> 2.000.000,00 SPRAI
        </p>
        <p>
          🔗 <strong>Blockchain:</strong> BNB Smart Chain
        </p>
        <p>
          🌱 <strong>Utilidade:</strong> Incentivo ambiental + comunidade token com propósito.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
```

File: `frontend/src/pages/Home/sections/CampaignSection.tsx`

```typescript
import { FC } from 'react';

// ============================================
// CAMPAIGN SECTION - RESPONSIVE
// ============================================

const CampaignSection: FC = () => {
  return (
    <section className="text-center py-8 sm:py-10 px-4 sm:px-5">
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
        🌱 Campanhas Ambientais
      </h2>
      <p className="text-base sm:text-lg max-w-xl sm:max-w-2xl mx-auto px-4">
        Participe da campanha "Plante e Ganhe SPRAI". Incentive a preservação
        plantando uma Árvore!
      </p>
    </section>
  );
};

export default CampaignSection;
```

File: `frontend/src/pages/Home/sections/FAQSection.tsx`

```typescript
import { FC } from 'react';

// ============================================
// FAQ SECTION - RESPONSIVE
// ============================================

const FAQSection: FC = () => {
  return (
    <section className="text-center py-8 sm:py-10 px-4 sm:px-5">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        ❓ FAQ (Perguntas Frequentes)
      </h2>

      {/* FAQ Items - Responsive */}
      <div className="max-w-xl sm:max-w-2xl mx-auto text-left space-y-3 sm:space-y-4 px-4">
        <div className="bg-white/5 rounded-sm p-3 sm:p-4">
          <p className="font-bold text-sm sm:text-base mb-1">Q: A SPRAI é segura?</p>
          <p className="text-sm sm:text-base text-gray-200">
            R: Sim, nosso contrato é verificado e a liquidez está travada na Mudra.
          </p>
        </div>

        <div className="bg-white/5 rounded-sm p-3 sm:p-4">
          <p className="font-bold text-sm sm:text-base mb-1">Q: Como compro SPRAI?</p>
          <p className="text-sm sm:text-base text-gray-200">
            R: Basta clicar no botão "Comprar SPRAI", conectar sua MetaMask e
            confirmar a transação via PancakeSwap.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
```

File: `frontend/src/pages/Home/sections/LinksSection.tsx`

```typescript
import { FC } from 'react';

// ============================================
// LINKS SECTION - RESPONSIVE
// ============================================

const LinksSection: FC = () => {
  return (
    <section className="text-center py-8 sm:py-10 px-4 sm:px-5">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        🔗 Links Oficiais
      </h2>

      {/* BscScan Link - Full width on mobile */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 max-w-4xl mx-auto">
        <a
          href="https://bscscan.com/address/0x8e1d34a80ad9ca7f8393a204ca618e59c54fc363"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-sm border-2 border-green-900 font-bold shadow-md hover:bg-green-600 transition-all text-xs sm:text-base"
        >
          ✅ Contrato Verificado (BscScan)
        </a>
      </div>

      {/* Social Media Links - Responsive grid */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
        <a
          href="https://www.instagram.com/sprai.token"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-sm border-2 border-green-900 font-bold shadow-md hover:bg-green-600 transition-all text-xs sm:text-base"
        >
          📸 Instagram
        </a>
        <a
          href="https://www.facebook.com/spraitoken"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-sm border-2 border-green-900 font-bold shadow-md hover:bg-green-600 transition-all text-xs sm:text-base"
        >
          📘 Facebook
        </a>
        <a
          href="https://twitter.com/spraitoken"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-sm border-2 border-green-900 font-bold shadow-md hover:bg-green-600 transition-all text-xs sm:text-base"
        >
          🐦 Twitter (X)
        </a>
        <a
          href="https://t.me/spraitoken"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-sm border-2 border-green-900 font-bold shadow-md hover:bg-green-600 transition-all text-xs sm:text-base"
        >
          💬 Telegram
        </a>
      </div>
    </section>
  );
};

export default LinksSection;
```

#### 4.10 Create Presale Page with Redux Integration

**⚠️ CRITICAL: This component follows the proper data flow pattern:**
- Uses typed Redux hooks (`useAppDispatch`, `useAppSelector`)
- Dispatches Redux thunks instead of direct API calls
- Accesses global loading state from Redux UI slice
- Properly typed with TypeScript interfaces
- Responsive design with TailwindCSS breakpoints

File: `frontend/src/pages/Presale/index.tsx`

```typescript
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { connectWallet, refreshBalances } from '../../store/slices/walletSlice';
import { submitPurchase, fetchPresaleStats } from '../../store/slices/transactionSlice';
import web3Service from '../../services/web3Service';
import WalletInfo from './sections/WalletInfo';
import PurchaseForm from './sections/PurchaseForm';
import PresaleStats from './sections/PresaleStats';

// ============================================
// PRESALE PAGE - MAIN COMPONENT
// ⚠️ NO DIRECT API CALLS - ONLY REDUX THUNKS
// ============================================

const Presale = () => {
  const dispatch = useAppDispatch();

  // ⚠️ Typed Redux selectors - data comes from Redux store
  const { address, connected, usdtBalance } = useAppSelector((state) => state.wallet);
  const { currentTransaction } = useAppSelector((state) => state.transaction);
  const { isLoading, loadingMessage } = useAppSelector((state) => state.ui);

  // Local UI state (not in Redux - only UI-specific)
  const [usdtAmount, setUsdtAmount] = useState('');
  const [spraiAmount, setSpraiAmount] = useState('0');

  // Load presale stats on mount
  useEffect(() => {
    dispatch(fetchPresaleStats());
  }, [dispatch]);

  // Calculate SPRAI amount when USDT input changes
  useEffect(() => {
    if (usdtAmount) {
      const amount = web3Service.calculateSpraiAmount(parseFloat(usdtAmount));
      setSpraiAmount(amount);
    } else {
      setSpraiAmount('0');
    }
  }, [usdtAmount]);

  // ⚠️ Dispatch Redux thunk for wallet connection
  const handleConnect = async () => {
    await dispatch(connectWallet());
  };

  // ⚠️ Dispatch Redux thunk for purchase
  const handlePurchase = async () => {
    if (!connected || !address) {
      return;
    }

    if (!usdtAmount || parseFloat(usdtAmount) < 10) {
      return;
    }

    // ⚠️ Dispatch thunk - NO direct API call
    const result = await dispatch(submitPurchase({ usdtAmount, address }));

    if (result.meta.requestStatus === 'fulfilled') {
      // Clear form on success
      setUsdtAmount('');
      setSpraiAmount('0');

      // Refresh balances
      await dispatch(refreshBalances(address));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-yellow-900 text-white py-8 px-4 sm:py-12 sm:px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header - Responsive */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8">
          🌱 SPRAI Pre-sale
        </h1>

        {/* Global Loading Indicator */}
        {isLoading && (
          <div className="fixed top-4 right-4 bg-green-700 text-white px-6 py-3 rounded-sm shadow-lg z-50 animate-pulse">
            {loadingMessage || 'Loading...'}
          </div>
        )}

        {/* Main Content - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Wallet & Purchase Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Wallet Connection or Info */}
            {!connected ? (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center">
                <p className="mb-6 text-base sm:text-lg">
                  Connect your wallet to participate in the pre-sale
                </p>
                <button
                  onClick={handleConnect}
                  disabled={isLoading}
                  className="bg-green-700 text-white py-3 sm:py-4 px-8 sm:px-10 rounded-sm border-2 border-green-900 font-bold shadow-md hover:bg-green-600 transition-all disabled:opacity-50 text-sm sm:text-base"
                >
                  {isLoading ? 'Connecting...' : '🔗 Connect Wallet'}
                </button>
              </div>
            ) : (
              <>
                {/* Wallet Info Component */}
                <WalletInfo address={address!} usdtBalance={usdtBalance} />

                {/* Purchase Form Component */}
                <PurchaseForm
                  usdtAmount={usdtAmount}
                  spraiAmount={spraiAmount}
                  onUsdtAmountChange={setUsdtAmount}
                  onPurchase={handlePurchase}
                  isLoading={isLoading}
                  currentTransaction={currentTransaction}
                />
              </>
            )}
          </div>

          {/* Right Column - Stats & Info */}
          <div className="lg:col-span-1">
            <PresaleStats />
          </div>
        </div>

        {/* Info Section - Responsive */}
        <div className="mt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-300">
            Pre-sale tokens will be distributed to your wallet after the pre-sale ends.
          </p>
          <p className="text-xs sm:text-sm text-gray-300 mt-2">
            For questions, contact: support@spraicoin.net
          </p>
        </div>
      </div>
    </div>
  );
};

export default Presale;
```

#### 4.11 Create Presale Page Sections

File: `frontend/src/pages/Presale/sections/WalletInfo.tsx`

```typescript
import { FC } from 'react';

// ⚠️ Typed props interface
interface WalletInfoProps {
  address: string;
  usdtBalance: string;
}

// ============================================
// WALLET INFO COMPONENT - RESPONSIVE
// ============================================

const WalletInfo: FC<WalletInfoProps> = ({ address, usdtBalance }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6">
      {/* Responsive text sizes */}
      <p className="text-xs sm:text-sm text-gray-300">Connected Wallet:</p>
      <p className="font-mono text-sm sm:text-lg break-all">{address}</p>

      <p className="text-xs sm:text-sm text-gray-300 mt-3 sm:mt-4">USDT Balance:</p>
      <p className="font-bold text-xl sm:text-2xl">{usdtBalance} USDT</p>
    </div>
  );
};

export default WalletInfo;
```

File: `frontend/src/pages/Presale/sections/PurchaseForm.tsx`

```typescript
import { FC } from 'react';
import { TransactionDB } from '../../../types/database';

// ⚠️ Typed props interface
interface PurchaseFormProps {
  usdtAmount: string;
  spraiAmount: string;
  onUsdtAmountChange: (amount: string) => void;
  onPurchase: () => void;
  isLoading: boolean;
  currentTransaction: TransactionDB | null;
}

// ============================================
// PURCHASE FORM COMPONENT - RESPONSIVE
// ============================================

const PurchaseForm: FC<PurchaseFormProps> = ({
  usdtAmount,
  spraiAmount,
  onUsdtAmountChange,
  onPurchase,
  isLoading,
  currentTransaction,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Purchase SPRAI Tokens</h2>

      {/* USDT Input - Responsive */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm mb-2">
          USDT Amount (Min: 10, Max: 10,000)
        </label>
        <input
          type="number"
          value={usdtAmount}
          onChange={(e) => onUsdtAmountChange(e.target.value)}
          placeholder="Enter USDT amount"
          min="10"
          max="10000"
          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-sm bg-white/20 border-2 border-green-700 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 text-sm sm:text-base"
        />
      </div>

      {/* SPRAI Preview - Responsive */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm mb-2">You will receive:</label>
        <div className="bg-green-800/50 rounded-sm p-3 sm:p-4">
          <p className="text-2xl sm:text-3xl font-bold">{spraiAmount} SPRAI</p>
          <p className="text-xs sm:text-sm text-gray-300 mt-2">Price: 0.50 USDT per SPRAI</p>
        </div>
      </div>

      {/* Purchase Button - Responsive */}
      <button
        onClick={onPurchase}
        disabled={isLoading || !usdtAmount || parseFloat(usdtAmount) < 10}
        className="w-full bg-green-700 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-sm border-2 border-green-900 font-bold shadow-md hover:bg-green-600 transition-all disabled:opacity-50 text-sm sm:text-base"
      >
        {isLoading ? 'Processing...' : '💰 Buy SPRAI'}
      </button>

      {/* Transaction Hash Display - Responsive */}
      {currentTransaction && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-900/50 rounded-sm">
          <p className="text-xs sm:text-sm mb-1">Transaction Hash:</p>
          <a
            href={`https://bscscan.com/tx/${currentTransaction.transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs sm:text-sm text-yellow-400 hover:underline break-all"
          >
            {currentTransaction.transactionHash}
          </a>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:text-sm">
            <div>
              <p className="text-gray-300">USDT Paid:</p>
              <p className="font-bold">{currentTransaction.usdtAmount}</p>
            </div>
            <div>
              <p className="text-gray-300">SPRAI Purchased:</p>
              <p className="font-bold">{currentTransaction.spraiAmount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseForm;
```

File: `frontend/src/pages/Presale/sections/PresaleStats.tsx`

```typescript
import { FC } from 'react';
import { useAppSelector } from '../../../store/hooks';

// ============================================
// PRESALE STATS COMPONENT - RESPONSIVE
// ⚠️ Data comes from Redux store
// ============================================

const PresaleStats: FC = () => {
  // ⚠️ Typed Redux selector
  const { stats } = useAppSelector((state) => state.transaction);

  if (!stats) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg sm:text-xl font-bold mb-4">Pre-sale Statistics</h3>
        <p className="text-sm text-gray-300">Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 sticky top-4">
      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Pre-sale Statistics</h3>

      {/* Stats Grid - Responsive */}
      <div className="space-y-4">
        <div className="bg-green-800/30 rounded-sm p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-300">Total USDT Raised</p>
          <p className="text-xl sm:text-2xl font-bold">{stats.totalUsdtRaised}</p>
        </div>

        <div className="bg-green-800/30 rounded-sm p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-300">Total SPRAI Sold</p>
          <p className="text-xl sm:text-2xl font-bold">{stats.totalSpraiSold}</p>
        </div>

        <div className="bg-green-800/30 rounded-sm p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-300">Total Transactions</p>
          <p className="text-xl sm:text-2xl font-bold">{stats.totalTransactions}</p>
        </div>

        <div className="bg-green-800/30 rounded-sm p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-300">Unique Buyers</p>
          <p className="text-xl sm:text-2xl font-bold">{stats.uniqueBuyers}</p>
        </div>
      </div>

      {/* Progress Bar - Optional Enhancement */}
      <div className="mt-6">
        <p className="text-xs sm:text-sm text-gray-300 mb-2">Progress</p>
        <div className="w-full bg-green-900/50 rounded-full h-3 sm:h-4">
          <div
            className="bg-gradient-to-r from-green-500 to-yellow-500 h-3 sm:h-4 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min((parseFloat(stats.totalSpraiSold) / 2000000) * 100, 100)}%`,
            }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1 text-right">
          {((parseFloat(stats.totalSpraiSold) / 2000000) * 100).toFixed(2)}% of 2M SPRAI
        </p>
      </div>
    </div>
  );
};

export default PresaleStats;
```

File: `frontend/src/App.tsx`

```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import Presale from './pages/Presale';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/presale" element={<Presale />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
```

File: `frontend/tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom green/nature colors from existing site
        'sprai-green': '#3E7C47',
        'sprai-brown': '#5C3A21',
        'sprai-gold': '#FFD700',
        'sprai-dark-green': '#2E8B57',
      },
    },
  },
  plugins: [],
}
```

### Validation Checklist for Step 4

- [ ] ALL frontend variables use `VITE_` prefix
- [ ] Config file created and validated
- [ ] NO hardcoded contract addresses
- [ ] NO hardcoded wallet addresses
- [ ] NO hardcoded API URLs
- [ ] Redux store configured
- [ ] TailwindCSS working with custom colors
- [ ] Vite dev server runs
- [ ] Assets copied from spraicoin folder
- [ ] Landing page matches existing design
- [ ] Pre-sale page functional
- [ ] React Router working
- [ ] ALL components are responsive (mobile, tablet, desktop)
- [ ] ALL pages follow pages/sections pattern
- [ ] ALL data flows through Redux with proper TypeScript types

---

## 📱 RESPONSIVE DESIGN REQUIREMENTS

**⚠️ CRITICAL: Every component MUST be responsive for mobile, tablet, and desktop devices**

### TailwindCSS Breakpoints

Use these breakpoints consistently across all components:

```typescript
// Mobile-first approach (default = mobile)
// sm:  640px  - Small tablets and large phones (landscape)
// md:  768px  - Tablets
// lg:  1024px - Desktops
// xl:  1280px - Large desktops
// 2xl: 1536px - Extra large screens
```

### Required Responsive Patterns

#### 1. **Typography - Responsive Text Sizes**

```tsx
// Headings
<h1 className="text-3xl sm:text-4xl lg:text-5xl">Title</h1>
<h2 className="text-2xl sm:text-3xl lg:text-4xl">Subtitle</h2>
<h3 className="text-xl sm:text-2xl lg:text-3xl">Section Title</h3>

// Body Text
<p className="text-sm sm:text-base lg:text-lg">Body text</p>

// Small Text
<span className="text-xs sm:text-sm">Small text</span>
```

#### 2. **Spacing - Responsive Padding and Margins**

```tsx
// Padding
<div className="p-4 sm:p-6 lg:p-8">Content</div>
<div className="py-8 px-4 sm:py-12 sm:px-5">Section</div>

// Margins
<div className="mb-4 sm:mb-6 lg:mb-8">Element</div>
<div className="mt-6 sm:mt-8 lg:mt-10">Element</div>

// Gaps (for flex/grid)
<div className="gap-2 sm:gap-3 lg:gap-4">Items</div>
```

#### 3. **Layout - Responsive Grids and Flex**

```tsx
// Grid - Mobile stack, Desktop columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>

// Flex - Wrap on small screens
<div className="flex flex-wrap gap-2 sm:gap-3">
  {/* Buttons or cards */}
</div>

// Two-column layout (sidebar + main)
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">{/* Main content */}</div>
  <div className="lg:col-span-1">{/* Sidebar */}</div>
</div>
```

#### 4. **Images - Responsive Sizing**

```tsx
// Logo
<img className="max-w-[40%] sm:max-w-[30%] md:max-w-[20%] h-auto" />

// Banner/Hero images
<img className="max-w-[90%] sm:max-w-[75%] md:max-w-[60%] h-auto" />

// Full-width images
<img className="w-full h-auto rounded-sm sm:rounded-xl lg:rounded-2xl" />
```

#### 5. **Buttons - Responsive Sizing**

```tsx
// Primary buttons
<button className="py-2 px-4 sm:py-3 sm:px-8 text-sm sm:text-base rounded-sm">
  Click Me
</button>

// Full width on mobile, auto on desktop
<button className="w-full sm:w-auto py-3 px-6">
  Submit
</button>
```

#### 6. **Containers - Responsive Max Widths**

```tsx
// Page container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Page content */}
</div>

// Content containers
<div className="max-w-xl sm:max-w-2xl lg:max-w-4xl mx-auto">
  {/* Centered content */}
</div>
```

### Component-Specific Requirements

#### Header Component
- Logo: 40% mobile → 30% tablet → 20% desktop
- Title: 3xl → 4xl → 5xl
- Buttons: Stack on mobile, inline on tablet+
- Padding: 8px → 12px vertical

#### Home Page Sections
- Text: base → lg for body
- Headings: 2xl → 3xl
- Padding: 8px → 10px vertical
- Max width: xl → 2xl for content

#### Presale Page
- Grid: 1 col mobile → 3 cols desktop (2/3 + 1/3 split)
- Form inputs: Full width always
- Stats cards: Stack mobile → Grid desktop
- Loading indicator: Fixed position, responsive size

### Mobile-First Approach

**ALWAYS write mobile styles first, then add responsive classes:**

```tsx
// ✅ CORRECT - Mobile first
<div className="text-sm sm:text-base lg:text-lg">

// ❌ WRONG - Desktop first
<div className="lg:text-lg md:text-base text-sm">
```

### Testing Checklist

Test EVERY page at these viewport widths:
- [ ] **320px** - iPhone SE (mobile portrait)
- [ ] **375px** - iPhone 12/13 (mobile portrait)
- [ ] **768px** - iPad (tablet portrait)
- [ ] **1024px** - iPad Pro (tablet landscape / small desktop)
- [ ] **1440px** - Desktop
- [ ] **1920px** - Large desktop

### Common Responsive Issues to Avoid

1. **Text Overflow**: Always use `break-words` or `break-all` for addresses/hashes
2. **Fixed Heights**: Avoid fixed heights, use `min-h-` instead
3. **Horizontal Scroll**: Always test on 320px width, add `overflow-x-hidden` if needed
4. **Touch Targets**: Buttons must be minimum 44px × 44px on mobile
5. **Image Distortion**: Always use `h-auto` with responsive widths

### Responsive Utility Classes Reference

```tsx
// Display
hidden sm:block         // Hide on mobile, show on tablet+
block sm:hidden         // Show on mobile, hide on tablet+

// Spacing
space-y-3 sm:space-y-4  // Vertical spacing between children

// Width
w-full sm:w-auto        // Full width mobile, auto tablet+
max-w-full sm:max-w-md  // Responsive max-width

// Position
static sm:sticky        // Static mobile, sticky tablet+
top-0 sm:top-4          // Different positioning values
```

### Example: Fully Responsive Component

```tsx
const ResponsiveCard: FC = () => {
  return (
    <div className="bg-white/10 rounded-sm sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8">
      {/* Image - Responsive sizing */}
      <img
        src="/image.png"
        alt="Card"
        className="w-full h-auto rounded-md sm:rounded-sm mb-3 sm:mb-4"
      />

      {/* Title - Responsive text size */}
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">
        Card Title
      </h3>

      {/* Description - Responsive text */}
      <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
        Card description text that adjusts based on screen size.
      </p>

      {/* Button - Responsive sizing */}
      <button className="w-full sm:w-auto py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base bg-green-700 rounded-sm">
        Action
      </button>
    </div>
  );
};
```

---

## FINAL VALIDATION CHECKLIST

Before considering the project complete, verify:

### Configuration
- [ ] `.env` file exists in project root
- [ ] `frontend/.env` exists
- [ ] `.env.example` files exist
- [ ] `.gitignore` includes `.env`
- [ ] All configuration centralized

### Backend
- [ ] PostgreSQL running
- [ ] Sequelize models created
- [ ] ALL files use `config/index.ts`
- [ ] NO hardcoded values
- [ ] Server starts successfully

### Frontend
- [ ] ALL variables use `VITE_` prefix
- [ ] Config validated on startup
- [ ] NO hardcoded values
- [ ] Redux working
- [ ] TailwindCSS working

### Smart Contracts
- [ ] Hardhat config uses environment variables
- [ ] NO hardcoded private keys
- [ ] Tests passing

---

## SUCCESS CRITERIA

The project is complete when:

1. ✅ ALL configuration in `.env` files
2. ✅ ZERO hardcoded values in code
3. ✅ Backend uses PostgreSQL + Sequelize
4. ✅ Frontend uses React + Vite + TypeScript + TailwindCSS + Redux
5. ✅ All environment variables validated on startup
6. ✅ Documentation complete

---

**REMEMBER: CONFIGURATION FIRST, IMPLEMENTATION SECOND. ALWAYS USE ENVIRONMENT VARIABLES.**
