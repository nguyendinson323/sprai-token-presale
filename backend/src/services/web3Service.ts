import { ethers } from 'ethers';
import { config } from '../config';

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

  async getPresaleEvents(fromBlock: number, toBlock: number) {
    // Get TokensPurchased events from presale contract
    // This can be used to sync transactions from blockchain
    const presaleABI = [
      'event TokensPurchased(address indexed buyer, uint256 usdtAmount, uint256 spraiAmount, uint256 timestamp)'
    ];

    const contract = new ethers.Contract(
      config.spraiPresaleContract || '',
      presaleABI,
      this.provider
    );

    const filter = contract.filters.TokensPurchased();
    const events = await contract.queryFilter(filter, fromBlock, toBlock);

    return events.map((event: any) => ({
      buyer: event.args.buyer,
      usdtAmount: ethers.formatUnits(event.args.usdtAmount, 18),
      spraiAmount: ethers.formatUnits(event.args.spraiAmount, 18),
      timestamp: new Date(Number(event.args.timestamp) * 1000),
      blockNumber: event.blockNumber,
      transactionHash: event.transactionHash,
    }));
  }
}

export default new Web3Service();
