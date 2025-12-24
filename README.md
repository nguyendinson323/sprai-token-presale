# SPRAI Token Pre-Sale Project

## Project Overview

**Token:** SPRAI TOKEN (SPRAI)
**Network:** BNB Smart Chain (BSC)
**Total Supply:** 2,000,000 SPRAI (fixed)
**Pre-sale Price:** $0.2 USDT per SPRAI
**Owner Wallet:** 0xCE7Bc99cA0C86Ef55aDF549191b7F498807dE311

## What This Project Does

**AUTOMATIC token distribution via smart contract** - NOT manual distribution!

When a user buys SPRAI tokens:
1. User approves USDT to presale contract
2. User calls `buyTokens()` on presale contract
3. **PRESALE CONTRACT automatically:**
   - Transfers USDT from buyer to owner wallet
   - Transfers SPRAI from owner to buyer wallet
   - ALL IN ONE TRANSACTION

## Project Structure

```
Alan/
├── contracts/                    # Smart contracts (Hardhat)
│   ├── .env                     # Contracts configuration
│   ├── .env.example
│   ├── contracts/
│   │   ├── SPRAI.sol            # BEP-20 token (2M fixed supply)
│   │   └── SPRAIPresale.sol     # Automatic distribution contract
│   ├── scripts/
│   │   └── deploy.ts
│   └── hardhat.config.ts
│
├── backend/                      # Node + Express + PostgreSQL
│   ├── .env                     # Backend configuration
│   ├── .env.example
│   ├── src/
│   │   ├── config/index.ts      # Config from backend/.env
│   │   ├── database/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
│
├── frontend/                     # React + Vite + TypeScript + Redux
│   ├── .env                     # Frontend configuration
│   ├── .env.example
│   ├── src/
│   │   ├── config/index.ts      # Config from frontend/.env
│   │   ├── store/slices/
│   │   ├── services/
│   │   ├── pages/
│   │   └── components/
│   └── package.json
│
└── overview/
    ├── rule.txt
    └── PROJECT_IMPLEMENTATION_GUIDE.md
```

## Configuration

**Each module has its own `.env` file. Shared values MUST match across all files.**

- `contracts/.env` - Deployment configuration
- `backend/.env` - Server and database configuration
- `frontend/.env` - UI and API configuration

## Quick Start

### 1. Install Dependencies

```bash
cd contracts && npm install
cd ../backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` in each module and fill values.

### 3. Build & Test

```bash
# Contracts
cd contracts && npx hardhat compile

# Backend
cd backend && npx tsc --noEmit

# Frontend
cd frontend && npm run build
```

### 4. Deploy Contracts

```bash
cd contracts
npx hardhat run scripts/deploy.ts --network bscTestnet
```

### 5. Start Development

```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev
```

## Key Configuration Values

| Variable | Value |
|----------|-------|
| Token Price | $0.2 USDT |
| Min Purchase | $10 USDT |
| Max Purchase | $10,000 USDT |
| Presale Allocation | 500,000 SPRAI (25%) |
| Owner Wallet | 0xCE7Bc99cA0C86Ef55aDF549191b7F498807dE311 |

## Network Switching

Set `VITE_NETWORK` in `frontend/.env`:
- `testnet` - BSC Testnet (Chain ID 97)
- `mainnet` - BSC Mainnet (Chain ID 56)

## Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment instructions
- [PROJECT_STATUS.md](PROJECT_STATUS.md) - Current project status
- [overview/PROJECT_IMPLEMENTATION_GUIDE.md](overview/PROJECT_IMPLEMENTATION_GUIDE.md) - Full implementation guide
- [overview/rule.txt](overview/rule.txt) - Development rules
