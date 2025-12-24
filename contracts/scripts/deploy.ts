import { ethers } from "hardhat";
import hre from "hardhat";

async function main() {
  console.log("\n🚀 Starting SPRAI Project Deployment...\n");

  // ⚠️ GET ALL VALUES FROM ENVIRONMENT VARIABLES
  const ownerWallet = process.env.OWNER_WALLET;
  const network = process.env.NETWORK || 'bsc_testnet';
  const isMainnet = network === 'bsc_mainnet';

  // Token configuration from .env
  const tokenName = process.env.TOKEN_NAME || 'SPRAI TOKEN';
  const tokenSymbol = process.env.TOKEN_SYMBOL || 'SPRAI';
  const tokenTotalSupply = process.env.TOKEN_TOTAL_SUPPLY || '2000000';
  const tokenDecimals = process.env.TOKEN_DECIMALS || '18';

  // Select USDT contract based on network
  const usdtContract = isMainnet
    ? process.env.USDT_CONTRACT_MAINNET
    : process.env.USDT_CONTRACT_TESTNET;

  const tokenPriceUsdt = process.env.PRESALE_TOKEN_PRICE_USDT || '0.50';
  const minPurchase = process.env.PRESALE_MIN_PURCHASE_USDT || '10';
  const maxPurchase = process.env.PRESALE_MAX_PURCHASE_USDT || '10000';

  if (!ownerWallet) {
    throw new Error("Missing required environment variable: OWNER_WALLET");
  }
  if (!usdtContract) {
    throw new Error(`Missing USDT contract for ${network}. Set USDT_CONTRACT_${isMainnet ? 'MAINNET' : 'TESTNET'}`);
  }

  console.log("📋 Deployment Configuration:");
  console.log("   Network:", hre.network.name);
  console.log("   Owner Wallet:", ownerWallet);
  console.log("");
  console.log("   Token Name:", tokenName);
  console.log("   Token Symbol:", tokenSymbol);
  console.log("   Total Supply:", tokenTotalSupply);
  console.log("   Decimals:", tokenDecimals);
  console.log("");
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
  const spraiToken = await SPRAI.deploy(
    tokenName,
    tokenSymbol,
    tokenTotalSupply,
    parseInt(tokenDecimals)
  );
  await spraiToken.waitForDeployment();

  const spraiAddress = await spraiToken.getAddress();
  console.log("✅ SPRAI Token deployed to:", spraiAddress);
  console.log(`   Name: ${tokenName}`);
  console.log(`   Symbol: ${tokenSymbol}`);
  console.log(`   Total Supply: ${tokenTotalSupply} tokens`);

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
  console.log(`   npx hardhat verify --network ${hre.network.name} ${spraiAddress} "${tokenName}" "${tokenSymbol}" ${tokenTotalSupply} ${tokenDecimals}`);
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
