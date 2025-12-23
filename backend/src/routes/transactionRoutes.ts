import { Router } from 'express';
import {
  submitTransaction,
  getUserTransactions,
  getPresaleStats,
  getAllTransactions,
} from '../controllers/transactionController';

const router = Router();

// ============================================
// TRANSACTION ROUTES
// ============================================

// Submit new transaction
router.post('/', submitTransaction);

// Get user's transactions
router.get('/user/:wallet', getUserTransactions);

// Get presale statistics
router.get('/stats', getPresaleStats);

// Get all transactions (admin)
router.get('/', getAllTransactions);

export default router;
