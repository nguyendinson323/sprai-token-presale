# SPRAI Token Presale - Deployment Guide

This guide provides step-by-step instructions for deploying the SPRAI Token presale project.

## Prerequisites

1. Node.js (v18 or higher)
2. PostgreSQL database
3. MetaMask wallet with BNB for gas fees
4. USDT tokens for testing (on BSC Testnet or Mainnet)

## Step 1: Environment Configuration

### Root .env File

Create a `.env` file in the project root with the following variables:

```env
# Network Configuration
NETWORK=bsc_testnet
BSC_MAINNET_RPC=https://bsc-dataseed.binance.org/
BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.binance.org:8545/
CHAIN_ID_MAINNET=56
CHAIN_ID_TESTNET=97

# Token Configuration
TOKEN_NAME=SPRAI TOKEN
TOKEN_SYMBOL=SPRAI
TOKEN_DECIMALS=18
TOKEN_TOTAL_SUPPLY=2000000

# Owner Wallet (YOUR WALLET ADDRESS)
OWNER_WALLET=0xYourWalletAddressHere
OWNER_PRIVATE_KEY=your_private_key_here

# USDT Contracts
USDT_CONTRACT_BSC=0x55d398326f99059fF775485246999027B3197955
USDT_CONTRACT_TESTNET=0x337610d27c682E347C9cD60BD4b3b107C9d34dDd

# Presale Configuration
PRESALE_TOKEN_PRICE_USDT=0.50
PRESALE_MIN_PURCHASE_USDT=10
PRESALE_MAX_PURCHASE_USDT=10000

# Backend Configuration
BACKEND_PORT=3000
BACKEND_HOST=localhost
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development

# PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sprai_presale
DB_USER=postgres
DB_PASSWORD=your_database_password

# Database Pool
DB_POOL_MAX=20
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000

# JWT & Security
JWT_SECRET=your_secure_jwt_secret_here_change_in_production
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Contract Addresses (empty until deployment)
SPRAI_TOKEN_CONTRACT=
PRESALE_CONTRACT=
```

### Frontend .env File

Create `frontend/.env`:

```env
# ⚠️ IMPORTANT: Change VITE_NETWORK to switch between testnet and mainnet
# Set to 'testnet' for testing, 'mainnet' for production
VITE_NETWORK=testnet

# BSC Mainnet Configuration
VITE_BSC_MAINNET_RPC=https://bsc-dataseed.binance.org/
VITE_CHAIN_ID_MAINNET=56
VITE_USDT_CONTRACT_MAINNET=0x55d398326f99059fF775485246999027B3197955

# BSC Testnet Configuration
VITE_BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.binance.org:8545/
VITE_CHAIN_ID_TESTNET=97
VITE_USDT_CONTRACT_TESTNET=0x337610d27c682E347C9cD60BD4b3b107C9d34dDd

# Owner Wallet
VITE_OWNER_WALLET=0xYourWalletAddressHere

# Contract Addresses - Mainnet (Fill after mainnet deployment)
VITE_SPRAI_TOKEN_CONTRACT_MAINNET=
VITE_PRESALE_CONTRACT_MAINNET=

# Contract Addresses - Testnet (Fill after testnet deployment)
VITE_SPRAI_TOKEN_CONTRACT_TESTNET=
VITE_PRESALE_CONTRACT_TESTNET=

# Presale Configuration
VITE_TOKEN_PRICE_USDT=0.50
VITE_MIN_PURCHASE_USDT=10
VITE_MAX_PURCHASE_USDT=10000

# Backend API
VITE_API_URL=http://localhost:3000
```

**To Switch Networks:**
- For **Testnet**: Set `VITE_NETWORK=testnet`
- For **Mainnet**: Set `VITE_NETWORK=mainnet`

The frontend will automatically use the correct RPC URL, chain ID, USDT contract, and deployed contract addresses based on this setting.

## Step 2: Install Dependencies

```bash
# Install contract dependencies
cd contracts
npm install

# Install backend dependencies
cd ../backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 3: Database Setup

1. Create PostgreSQL database:

```sql
CREATE DATABASE sprai_presale;
```

2. Run migrations from backend directory:

```bash
cd backend
npm run db:migrate
```

This will create the transactions table with the correct schema.

## Step 4: Deploy Smart Contracts

1. Compile contracts:

```bash
cd contracts
npx hardhat compile
```

2. Deploy to BSC Testnet:

```bash
npx hardhat run scripts/deploy.ts --network bsc_testnet
```

3. **IMPORTANT**: Save the contract addresses from the deployment output:
   - SPRAI Token Contract Address
   - Presale Contract Address

4. Update both `.env` files with the deployed contract addresses:
   - Root `.env`: `SPRAI_TOKEN_CONTRACT` and `PRESALE_CONTRACT`
   - Frontend `.env`: `VITE_SPRAI_TOKEN_CONTRACT` and `VITE_PRESALE_CONTRACT`

5. **CRITICAL**: Approve SPRAI tokens to Presale contract:

```bash
# In MetaMask or using Hardhat console:
# Approve 500,000 SPRAI tokens to the presale contract
# This allows the presale contract to distribute tokens automatically
```

## Step 5: Start Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:3000`

Verify backend is running by visiting: `http://localhost:3000/api/transactions/stats`

## Step 6: Start Frontend

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## Step 7: Testing the Presale

1. Open `http://localhost:5173` in your browser
2. Connect MetaMask wallet
3. Make sure you have:
   - BNB for gas fees
   - USDT tokens for testing
4. Enter amount and purchase SPRAI tokens
5. Check your wallet for received SPRAI tokens

## Step 8: Production Deployment

### Smart Contracts to BSC Mainnet

1. Update root `.env`:
   - Set `NETWORK=bsc_mainnet`
   - Update `USDT_CONTRACT_BSC` to mainnet address

2. Deploy to mainnet:

```bash
cd contracts
npx hardhat run scripts/deploy.ts --network bsc_mainnet
```

3. Update both `.env` files with mainnet contract addresses

### Backend Production Deployment

1. Update backend `.env`:
   - Set `NODE_ENV=production`
   - Update `CORS_ORIGIN` to your frontend domain
   - Use production database credentials
   - Change `JWT_SECRET` to a secure value

2. Build backend:

```bash
cd backend
npm run build
```

3. Deploy to your server (Heroku, AWS, DigitalOcean, etc.)

4. Start production server:

```bash
npm start
```

### Frontend Production Deployment

1. Update frontend `.env`:
   - Update `VITE_BSC_RPC_URL` to mainnet RPC
   - Set `VITE_CHAIN_ID=56`
   - Update `VITE_API_URL` to your backend domain
   - Update contract addresses to mainnet addresses

2. Build frontend:

```bash
cd frontend
npm run build
```

3. Deploy `dist` folder to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Your web server

## Verification Checklist

Before going live, verify:

- [ ] Smart contracts deployed to BSC Mainnet
- [ ] Owner approved 500,000 SPRAI to presale contract
- [ ] Backend connected to production database
- [ ] Frontend `.env` has correct mainnet contract addresses
- [ ] CORS configured correctly
- [ ] JWT secret changed from default
- [ ] Rate limiting configured
- [ ] Test purchase works end-to-end
- [ ] Tokens are automatically distributed
- [ ] Transaction tracking works in backend
- [ ] Stats display correctly on frontend

## Troubleshooting

### Transaction Fails

- Check USDT balance
- Check BNB balance for gas
- Verify presale contract has approval for owner's SPRAI tokens
- Check that amount is within min/max limits

### Tokens Not Received

- Verify presale contract has approval
- Check transaction on BSCScan
- Add SPRAI token to MetaMask using contract address

### Backend Connection Error

- Verify backend is running
- Check CORS settings
- Verify API_URL in frontend .env
- Check network tab in browser DevTools

### Database Connection Error

- Verify PostgreSQL is running
- Check database credentials in .env
- Verify database exists
- Check firewall settings

## Support

For issues or questions:
- Check BSCScan for transaction details
- Review backend logs
- Check browser console for frontend errors
- Verify all environment variables are set correctly

## Security Notes

- Never commit `.env` files to git
- Keep private keys secure
- Use hardware wallet for mainnet deployment
- Audit smart contracts before mainnet deployment
- Monitor presale transactions regularly
- Set up alerts for unusual activity
