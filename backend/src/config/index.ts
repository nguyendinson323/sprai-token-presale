import dotenv from 'dotenv';
import path from 'path';

// ============================================
// LOAD ENVIRONMENT VARIABLES FROM ROOT .env
// Path: backend/src/config -> backend/src -> backend -> root
// ============================================
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

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
