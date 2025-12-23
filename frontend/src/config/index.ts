// ============================================
// FRONTEND CONFIGURATION
// ALL VALUES FROM ENVIRONMENT VARIABLES
// SUPPORTS BOTH TESTNET AND MAINNET
// ============================================

// Determine which network to use
const network = import.meta.env.VITE_NETWORK || 'testnet';
const isMainnet = network === 'mainnet';

export const config = {
  // Network selection
  network: network as 'mainnet' | 'testnet',
  isMainnet,

  // Network Configuration (based on VITE_NETWORK)
  bscRpcUrl: isMainnet
    ? import.meta.env.VITE_BSC_MAINNET_RPC || 'https://bsc-dataseed.binance.org/'
    : import.meta.env.VITE_BSC_TESTNET_RPC || 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  chainId: isMainnet
    ? parseInt(import.meta.env.VITE_CHAIN_ID_MAINNET || '56')
    : parseInt(import.meta.env.VITE_CHAIN_ID_TESTNET || '97'),

  // Contracts (based on network)
  usdtContract: isMainnet
    ? import.meta.env.VITE_USDT_CONTRACT_MAINNET || ''
    : import.meta.env.VITE_USDT_CONTRACT_TESTNET || '',
  spraiTokenContract: isMainnet
    ? import.meta.env.VITE_SPRAI_TOKEN_CONTRACT_MAINNET || ''
    : import.meta.env.VITE_SPRAI_TOKEN_CONTRACT_TESTNET || '',
  presaleContract: isMainnet
    ? import.meta.env.VITE_PRESALE_CONTRACT_MAINNET || ''
    : import.meta.env.VITE_PRESALE_CONTRACT_TESTNET || '',
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
    console.warn(`⚠️  WARNING: ${key} is not set in .env file`);
  }
});

if (config.tokenPriceUsdt === 0) {
  throw new Error('VITE_TOKEN_PRICE_USDT must be set in .env file');
}

// Log current network
console.log(`🌐 Network: ${isMainnet ? 'BSC Mainnet' : 'BSC Testnet'} (Chain ID: ${config.chainId})`)

export default config;
