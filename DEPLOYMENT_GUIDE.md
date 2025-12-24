# Smart Contract Deployment Guide

## Prerequisites

### 1. Wallet Setup
- **MetaMask** wallet installed
- Private key exported from MetaMask (Settings > Security & Privacy > Show Private Key)
- Add private key to `contracts/.env` as `DEPLOYER_PRIVATE_KEY`

### 2. Network Configuration
- **Testnet**: BSC Testnet
  - RPC: `https://data-seed-prebsc-1-s1.binance.org:8545/`
  - Chain ID: 97
- **Mainnet**: BSC Mainnet
  - RPC: `https://bsc-dataseed.binance.org/`
  - Chain ID: 56

### 3. Required Balance
- **Testnet**: ~0.1 BNB
- **Mainnet**: ~0.05-0.1 BNB for gas fees

## Deployment Steps

### Testnet Deployment

1. **Deploy contracts**
   ```bash
   cd contracts
   npm run deploy:testnet
   ```

2. **Copy contract addresses from console**
   - After deployment, you'll see:
   ```
   ✅ SPRAI Token deployed to: 0xYourSpraiAddress
   ✅ Presale Contract deployed to: 0xYourPresaleAddress
   ```
   - **Copy both addresses immediately**

3. **Update configuration files**
   - `contracts/.env`:
     ```
     SPRAI_TOKEN_CONTRACT=0xYourSpraiAddress
     PRESALE_CONTRACT=0xYourPresaleAddress
     ```
   - `backend/.env`:
     ```
     SPRAI_TOKEN_CONTRACT=0xYourSpraiAddress
     PRESALE_CONTRACT=0xYourPresaleAddress
     ```
   - `frontend/.env`:
     ```
     VITE_SPRAI_TOKEN_CONTRACT=0xYourSpraiAddress
     VITE_PRESALE_CONTRACT=0xYourPresaleAddress
     ```

### Mainnet Deployment

1. **Prepare wallet**
   - Ensure wallet has at least 0.1 BNB

2. **Deploy contracts**
   ```bash
   cd contracts
   npm run deploy:mainnet
   ```

3. **Copy and update** (same as testnet steps 2-3 above)

## Contract Verification (BscScan)

1. **Get BscScan API Key**
   - Create account at [BscScan](https://bscscan.com/) or [Testnet BscScan](https://testnet.bscscan.com/)
   - Generate API key from account settings
   - Add to `contracts/.env` as `BSCSCAN_API_KEY`

2. **Verify contracts**
   - Commands shown in console output after deployment
   ```bash
   cd contracts
   npx hardhat verify --network bscTestnet <SPRAI_ADDRESS>
   npx hardhat verify --network bscTestnet <PRESALE_ADDRESS> <ARGS...>
   ```

## Where to Find Contract Addresses

**Console Output:** After deployment, look for:

```
🎉 DEPLOYMENT COMPLETE!
============================================================

⚠️  CRITICAL: Update your .env files:
   SPRAI_TOKEN_CONTRACT=0x1234...
   PRESALE_CONTRACT=0x5678...
```

**These addresses** need to be added to:
1. `contracts/.env` - for verification
2. `backend/.env` - for backend API
3. `frontend/.env` - for frontend (with VITE_ prefix)

## Post-Deployment Checklist

- [ ] Copy contract addresses from console output
- [ ] Update all .env files with addresses
- [ ] Owner approves SPRAI tokens for presale contract (call approve() on SPRAI token, amount: 500000000000000000000000)
- [ ] Verify contracts on BscScan

## Important Notes

- **Never commit** `.env` file with real private keys to Git
- **Testnet first**: Always deploy and test on testnet before mainnet
- **Contract ownership**: The deployer address becomes contract owner
