# SPRAI Token Pre-Sale Project

## ✅ CLEAN IMPLEMENTATION - ALL BUGS FIXED

This is a **COMPLETE REWRITE** from scratch following the corrected [PROJECT_IMPLEMENTATION_GUIDE.md](PROJECT_IMPLEMENTATION_GUIDE.md).

### 🚨 CRITICAL: What This Project Does

**AUTOMATIC token distribution via smart contract** - NOT manual distribution!

When a user buys SPRAI tokens:
1. User approves USDT to presale contract
2. User calls `buyTokens()` on presale contract
3. **PRESALE CONTRACT automatically:**
   - Transfers USDT from buyer → owner wallet
   - Transfers SPRAI from owner → buyer wallet
   - ALL IN ONE TRANSACTION

### 📁 Project Structure

```
Alan/
├── .env                          # ⚠️ ALL CONFIGURATION HERE
├── contracts/                    # Smart contracts (Hardhat)
│   ├── contracts/
│   │   ├── SPRAI.sol            # BEP-20 token (2M fixed supply)
│   │   └── SPRAIPresale.sol     # ⚠️ AUTOMATIC distribution contract
│   ├── scripts/
│   │   └── deploy.ts            # Deploys both contracts
│   ├── package.json
│   └── hardhat.config.ts
│
├── backend/                      # Node + Express + PostgreSQL
│   ├── src/
│   │   ├── config/index.ts      # ⚠️ All config from .env
│   │   ├── database/
│   │   │   ├── config.ts
│   │   │   └── models/Transaction.ts
│   │   └── services/web3Service.ts
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                     # React + Vite + TypeScript + Redux
    ├── src/
    │   ├── config/index.ts      # ⚠️ All config from .env
    │   ├── store/
    │   │   └── slices/          # Redux with TypeScript
    │   ├── services/
    │   │   ├── web3Service.ts   # ⚠️ Calls presale contract
    │   │   └── apiService.ts
    │   ├── pages/
    │   │   ├── Home/
    │   │   │   ├── index.tsx
    │   │   │   └── sections/    # AboutSection, FAQSection, etc.
    │   │   └── Presale/
    │   │       ├── index.tsx
    │   │       └── sections/    # WalletInfo, PurchaseForm, Stats
    │   └── types/database.ts    # TypeScript types match DB schema
    ├── .env
    ├── package.json
    ├── vite.config.ts
    └── tailwind.config.js
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install contracts dependencies
cd contracts
npm install

# Install backend dependencies
cd ../backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

The root `.env` file is ALREADY configured. After deploying contracts, update:

```env
SPRAI_TOKEN_CONTRACT=<address_from_deployment>
PRESALE_CONTRACT=<address_from_deployment>
```

### 3. Deploy Smart Contracts

```bash
cd contracts
npm run deploy:testnet    # For BSC Testnet
# OR
npm run deploy:mainnet    # For BSC Mainnet
```

**⚠️ IMPORTANT**: After deployment, owner MUST approve 500,000 SPRAI tokens to presale contract!

### 4. Setup Database

```bash
cd backend
# Create PostgreSQL database
createdb sprai_presale

# Run migrations (if you create them)
npm run db:migrate
```

### 5. Start Backend

```bash
cd backend
npm run dev
```

### 6. Start Frontend

```bash
cd frontend
npm run dev
```

Visit http://localhost:5173

### 🔄 Switching Between Testnet and Mainnet

To switch networks, simply update `frontend/.env`:

**For Testnet (Development/Testing):**
```env
VITE_NETWORK=testnet
```

**For Mainnet (Production):**
```env
VITE_NETWORK=mainnet
```

The frontend will automatically:
- Use the correct RPC URL
- Connect to the correct chain ID (97 for testnet, 56 for mainnet)
- Use the correct USDT contract address
- Use the correct deployed SPRAI and Presale contract addresses

A network badge (TESTNET/MAINNET) will be displayed in the header to show which network is active.

## 📋 Implementation Status

| Component | Status | Location |
|-----------|--------|----------|
| SPRAI Token Contract | ✅ Complete | [contracts/contracts/SPRAI.sol](contracts/contracts/SPRAI.sol) |
| **Presale Contract** | ✅ Complete | [contracts/contracts/SPRAIPresale.sol](contracts/contracts/SPRAIPresale.sol) |
| Deployment Script | ✅ Complete | [contracts/scripts/deploy.ts](contracts/scripts/deploy.ts) |
| Backend Config | ✅ Complete | [backend/src/config/index.ts](backend/src/config/index.ts) |
| Database Models | ✅ Complete | [backend/src/database/models/Transaction.ts](backend/src/database/models/Transaction.ts) |
| Backend API | ✅ Complete | [backend/src/controllers/](backend/src/controllers/) |
| Frontend Config | ✅ Complete | [frontend/src/config/index.ts](frontend/src/config/index.ts) |
| Redux Store | ✅ Complete | [frontend/src/store/](frontend/src/store/) |
| Web3 Service | ✅ Complete | [frontend/src/services/web3Service.ts](frontend/src/services/web3Service.ts) |
| API Service | ✅ Complete | [frontend/src/services/apiService.ts](frontend/src/services/apiService.ts) |
| Page Components | ✅ Complete | [frontend/src/pages/](frontend/src/pages/) |
| Header Component | ✅ Complete | [frontend/src/components/Header.tsx](frontend/src/components/Header.tsx) |
| App & Routing | ✅ Complete | [frontend/src/App.tsx](frontend/src/App.tsx) |

## 🔗 Key Integration Points

### Frontend → Presale Contract

```typescript
// ✅ CORRECT - Calls presale contract for automatic distribution
const tx = await web3Service.buyTokens(usdtAmount);
await tx.wait();
// SPRAI tokens automatically sent to buyer!
```

### Backend Validation

```typescript
// ✅ Validates transaction is to PRESALE CONTRACT
const valid = actualTo === config.spraiPresaleContract;
```

## 📖 Next Steps

All implementation is **COMPLETE**! Follow these steps to deploy:

1. **Configure Environment**: Update `.env` files with your values
2. **Deploy Contracts**: Run deployment script on BSC Testnet/Mainnet
3. **Approve Tokens**: Owner approves 500,000 SPRAI to presale contract
4. **Setup Database**: Create PostgreSQL database and run migrations
5. **Test on Testnet**: Test complete purchase flow before mainnet
6. **Deploy to Production**: See [DEPLOYMENT.md](DEPLOYMENT.md) for details

## ⚠️ CRITICAL REMINDERS

- ✅ **NEVER hardcode** contract addresses, prices, or configuration
- ✅ **ALL values** come from `.env` files
- ✅ Presale contract handles **automatic** distribution
- ✅ Owner must **approve SPRAI** tokens to presale contract
- ✅ Backend **only tracks** transactions, never holds funds
- ✅ All components must be **responsive** (mobile, tablet, desktop)
- ✅ TypeScript types must **match database schema**

## 📞 Support

For questions, refer to [PROJECT_IMPLEMENTATION_GUIDE.md](PROJECT_IMPLEMENTATION_GUIDE.md) for complete implementation details.
