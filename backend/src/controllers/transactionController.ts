import { Request, Response } from 'express';
import Transaction from '../database/models/Transaction';
import web3Service from '../services/web3Service';
import { Op } from 'sequelize';

// ============================================
// TRANSACTION CONTROLLER
// ALL API ENDPOINTS FOR TRANSACTIONS
// ============================================

/**
 * Submit a new transaction for validation and tracking
 * POST /api/transactions
 */
export const submitTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { transactionHash, buyerWallet } = req.body;

    // Validate input
    if (!transactionHash || !buyerWallet) {
      res.status(400).json({
        success: false,
        message: 'transactionHash and buyerWallet are required',
      });
      return;
    }

    // Check if transaction already exists
    const existing = await Transaction.findOne({
      where: { transactionHash },
    });

    if (existing) {
      res.status(400).json({
        success: false,
        message: 'Transaction already submitted',
        transaction: existing,
      });
      return;
    }

    // Validate transaction on blockchain
    const validation = await web3Service.validateTransaction(transactionHash);

    if (!validation.valid) {
      res.status(400).json({
        success: false,
        message: validation.error || 'Transaction validation failed',
      });
      return;
    }

    // Get transaction details from presale contract events
    const blockNumber = validation.details!.blockNumber;
    const events = await web3Service.getPresaleEvents(blockNumber, blockNumber);

    // Find the event matching this transaction hash
    const event = events.find((e) => e.transactionHash.toLowerCase() === transactionHash.toLowerCase());

    if (!event) {
      res.status(400).json({
        success: false,
        message: 'Transaction not found in presale events',
      });
      return;
    }

    // Calculate token price from event data
    const tokenPrice = (parseFloat(event.usdtAmount) / parseFloat(event.spraiAmount)).toFixed(4);

    // Create transaction record
    const transaction = await Transaction.create({
      transactionHash,
      buyerWallet: buyerWallet.toLowerCase(),
      usdtAmount: event.usdtAmount,
      spraiAmount: event.spraiAmount,
      tokenPrice,
      blockNumber: validation.details!.blockNumber,
      timestamp: validation.details!.timestamp,
      validated: true,
    });

    res.status(201).json({
      success: true,
      message: 'Transaction submitted successfully',
      transaction,
    });
  } catch (error: any) {
    console.error('Error submitting transaction:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

/**
 * Get all transactions for a specific wallet
 * GET /api/transactions/user/:wallet
 */
export const getUserTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { wallet } = req.params;

    if (!wallet) {
      res.status(400).json({
        success: false,
        message: 'Wallet address is required',
      });
      return;
    }

    const transactions = await Transaction.findAll({
      where: {
        buyerWallet: wallet.toLowerCase(),
      },
      order: [['timestamp', 'DESC']],
    });

    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error: any) {
    console.error('Error fetching user transactions:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

/**
 * Get presale statistics
 * GET /api/transactions/stats
 */
export const getPresaleStats = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get all validated transactions
    const transactions = await Transaction.findAll({
      where: { validated: true },
    });

    // Calculate stats
    const totalUsdtRaised = transactions.reduce(
      (sum, tx) => sum + parseFloat(tx.usdtAmount),
      0
    );

    const totalSpraiSold = transactions.reduce(
      (sum, tx) => sum + parseFloat(tx.spraiAmount),
      0
    );

    const totalTransactions = transactions.length;

    const uniqueBuyers = new Set(transactions.map((tx) => tx.buyerWallet)).size;

    res.status(200).json({
      success: true,
      stats: {
        totalUsdtRaised: totalUsdtRaised.toFixed(2),
        totalSpraiSold: totalSpraiSold.toFixed(2),
        totalTransactions,
        uniqueBuyers,
      },
    });
  } catch (error: any) {
    console.error('Error fetching presale stats:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

/**
 * Get all transactions (admin only - for monitoring)
 * GET /api/transactions
 */
export const getAllTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = 100, offset = 0 } = req.query;

    const transactions = await Transaction.findAll({
      limit: Number(limit),
      offset: Number(offset),
      order: [['timestamp', 'DESC']],
    });

    const total = await Transaction.count();

    res.status(200).json({
      success: true,
      transactions,
      total,
      limit: Number(limit),
      offset: Number(offset),
    });
  } catch (error: any) {
    console.error('Error fetching all transactions:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};
