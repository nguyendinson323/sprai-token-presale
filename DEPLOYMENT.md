# SPRAI Token Presale - Deployment Guide

## Prerequisites

1. Node.js (v18 or higher)
2. PostgreSQL database
3. MetaMask/Trust Wallet with BNB for gas fees
4. USDT tokens for testing

## Configuration Structure

**Each module has its own `.env` file. Shared values MUST match across all files.**

```
contracts/.env      # Contract deployment config
backend/.env        # Backend server config
frontend/.env       # Frontend UI config
```

## Step 1: Configure Environment Files

### contracts/.env

```env
NETWORK=bsc_testnet
BSC_MAINNET_RPC=https://bsc-dataseed.binance.org/
BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.binance.org:8545/
CHAIN_ID_MAINNET=56
CHAIN_ID_TESTNET=97

TOKEN_NAME=SPRAI TOKEN
TOKEN_SYMBOL=SPRAI
TOKEN_DECIMALS=18
TOKEN_TOTAL_SUPPLY=2000000
OWNER_WALLET=0xCE7Bc99cA0C86Ef55aDF549191b7F498807dE311

USDT_CONTRACT_MAINNET=0x55d398326f99059fF775485246999027B3197955
USDT_CONTRACT_TESTNET=0x337610d27c682E347C9cD60BD4b3b107C9d34dDd

PRESALE_TOKEN_PRICE_USDT=0.25
PRESALE_MIN_PURCHASE_USDT=10
PRESALE_MAX_PURCHASE_USDT=10000

SPRAI_TOKEN_CONTRACT=
PRESALE_CONTRACT=

DEPLOYER_PRIVATE_KEY=
BSCSCAN_API_KEY=
```

### backend/.env

```env
BACKEND_PORT=3000
BACKEND_HOST=localhost
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_NAME=sprai_presale
DB_USER=postgres
DB_PASSWORD=your_password_here

DB_POOL_MAX=20
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000

JWT_SECRET=your_secure_jwt_secret_here
JWT_EXPIRES_IN=7d

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Shared values (MUST MATCH contracts/.env and frontend/.env)
NETWORK=bsc_testnet
TOKEN_NAME=SPRAI TOKEN
TOKEN_SYMBOL=SPRAI
TOKEN_DECIMALS=18
TOKEN_TOTAL_SUPPLY=2000000
OWNER_WALLET=0xCE7Bc99cA0C86Ef55aDF549191b7F498807dE311

USDT_CONTRACT_MAINNET=0x55d398326f99059fF775485246999027B3197955
USDT_CONTRACT_TESTNET=0x337610d27c682E347C9cD60BD4b3b107C9d34dDd

PRESALE_TOKEN_PRICE_USDT=0.25
PRESALE_MIN_PURCHASE_USDT=10
PRESALE_MAX_PURCHASE_USDT=10000

SPRAI_TOKEN_CONTRACT=
PRESALE_CONTRACT=
```

### frontend/.env

```env
VITE_NETWORK=testnet

# BSC Mainnet
VITE_BSC_MAINNET_RPC=https://bsc-dataseed.binance.org/
VITE_CHAIN_ID_MAINNET=56
VITE_CHAIN_NAME_MAINNET=BNB Smart Chain
VITE_BLOCK_EXPLORER_MAINNET=https://bscscan.com/
VITE_USDT_CONTRACT_MAINNET=0x55d398326f99059fF775485246999027B3197955

# BSC Testnet
VITE_BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.binance.org:8545/
VITE_CHAIN_ID_TESTNET=97
VITE_CHAIN_NAME_TESTNET=BNB Smart Chain Testnet
VITE_BLOCK_EXPLORER_TESTNET=https://testnet.bscscan.com/
VITE_USDT_CONTRACT_TESTNET=0x337610d27c682E347C9cD60BD4b3b107C9d34dDd

# Token Info (MUST MATCH contracts/.env and backend/.env)
VITE_TOKEN_NAME=SPRAI TOKEN
VITE_TOKEN_SYMBOL=SPRAI
VITE_TOKEN_DECIMALS=18
VITE_TOKEN_TOTAL_SUPPLY=2000000

VITE_OWNER_WALLET=0xCE7Bc99cA0C86Ef55aDF549191b7F498807dE311

# Contract Addresses (fill after deployment)
VITE_SPRAI_TOKEN_CONTRACT_MAINNET=
VITE_PRESALE_CONTRACT_MAINNET=
VITE_SPRAI_TOKEN_CONTRACT_TESTNET=
VITE_PRESALE_CONTRACT_TESTNET=

# Pre-sale (MUST MATCH contracts/.env and backend/.env)
VITE_TOKEN_PRICE_USDT=0.25
VITE_MIN_PURCHASE_USDT=10
VITE_MAX_PURCHASE_USDT=10000

VITE_API_URL=http://localhost:3000

# Social Links
VITE_TELEGRAM_URL=
VITE_TWITTER_URL=
VITE_DISCORD_URL=
VITE_WEBSITE_URL=
```

## Step 2: Install Dependencies

```bash
cd contracts && npm install
cd ../backend && npm install
cd ../frontend && npm install
```

## Step 3: Database Setup

```sql
CREATE DATABASE sprai_presale;
```

```bash
cd backend
npm run db:migrate
```

## Step 4: Deploy Smart Contracts

### Option A: Deploy via Hardhat (requires private key)

```bash
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.ts --network bscTestnet
```

### Option B: Deploy via Remix (recommended - no private key in file)

1. Open [Remix IDE](https://remix.ethereum.org)
2. Create `SPRAI.sol` and `SPRAIPresale.sol` files
3. Compile with Solidity 0.8.20
4. Connect MetaMask/Trust Wallet
5. Deploy SPRAI token first
6. Deploy SPRAIPresale with parameters:
   - `_spraiToken`: SPRAI token address
   - `_usdtToken`: 0x337610d27c682E347C9cD60BD4b3b107C9d34dDd (testnet)
   - `_treasury`: 0xCE7Bc99cA0C86Ef55aDF549191b7F498807dE311
   - `_tokenPrice`: 250000000000000000 (0.25 with 18 decimals)
   - `_minPurchase`: 10000000000000000000 (10 USDT)
   - `_maxPurchase`: 10000000000000000000000 (10000 USDT)

## Step 5: Post-Deployment

1. **Update all .env files** with deployed contract addresses
2. **Approve SPRAI tokens** to presale contract:
   - Call `approve()` on SPRAI token
   - Spender: Presale contract address
   - Amount: 500000000000000000000000 (500,000 tokens)

## Step 6: Start Services

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

## Step 7: Test Purchase

1. Open http://localhost:5173
2. Connect wallet
3. Enter USDT amount (min $10)
4. Approve USDT
5. Buy SPRAI
6. Verify tokens received

## Network Switching

**Testnet (testing):**
```env
VITE_NETWORK=testnet
```

**Mainnet (production):**
```env
VITE_NETWORK=mainnet
```

## Production Checklist

- [ ] Deploy contracts to BSC Mainnet
- [ ] Update all .env files with mainnet addresses
- [ ] Owner approved 500,000 SPRAI to presale contract
- [ ] Change `NODE_ENV=production` in backend
- [ ] Change `VITE_NETWORK=mainnet` in frontend
- [ ] Update `CORS_ORIGIN` to production domain
- [ ] Update `VITE_API_URL` to production backend URL
- [ ] Change `JWT_SECRET` to secure value
- [ ] Test end-to-end purchase flow
- [ ] Verify automatic token distribution

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Transaction fails | Check BNB balance for gas, USDT balance, approval status |
| Tokens not received | Verify presale has SPRAI approval, check BSCScan |
| Backend error | Check database connection, verify .env values |
| Wrong network | Verify VITE_NETWORK setting matches deployment |
| Price mismatch | Ensure all .env files have same PRESALE_TOKEN_PRICE_USDT |
