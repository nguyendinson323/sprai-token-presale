import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import path from "path";

// ⚠️ Load from root .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Check if private key is valid (64 hex chars without 0x, or 66 with 0x)
const isValidPrivateKey = (key: string | undefined): boolean => {
  if (!key) return false;
  const cleanKey = key.startsWith('0x') ? key.slice(2) : key;
  return /^[0-9a-fA-F]{64}$/.test(cleanKey);
};

const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
const accounts = isValidPrivateKey(privateKey) ? [privateKey!] : [];

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
      url: process.env.BSC_MAINNET_RPC || 'https://bsc-dataseed.binance.org/',
      chainId: parseInt(process.env.CHAIN_ID_MAINNET || '56'),
      accounts,
    },
    bscTestnet: {
      url: process.env.BSC_TESTNET_RPC || 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      chainId: parseInt(process.env.CHAIN_ID_TESTNET || '97'),
      accounts,
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
