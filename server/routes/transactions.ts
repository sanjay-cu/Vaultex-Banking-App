import { Router } from 'express';
import { Transaction } from '../models/Transaction';
import mongoose from 'mongoose';
// import { formatCurrency } from '../../client/context/AccountContext';

const router = Router();

// Get transactions and compute balance for a specific user
router.get('/', async (req, res) => {
  try {
    const allTransactionsCount = await Transaction.countDocuments({});
    console.log(`[SYSTEM AUDIT] Total transactions in bank: ${allTransactionsCount}`);

    const userIdStr = req.query.userId?.toString().trim();
    if (!userIdStr) {
      console.warn('GET /api/transactions: Missing userId query param');
      return res.status(400).json({ error: 'User ID is required' });
    }

    const isObjectId = mongoose.Types.ObjectId.isValid(userIdStr);
    const userIdQuery = isObjectId ? new mongoose.Types.ObjectId(userIdStr) : userIdStr;

    console.log(`Fetching transactions for: ${userIdStr} (isObjectId: ${isObjectId})`);
    const transactions = await Transaction.find({ 
      $or: [
        { userId: userIdStr },
        { userId: userIdQuery }
      ]
    }).sort({ createdAt: -1 });
    console.log(`Found ${transactions.length} transactions for user ${userIdStr}`);
    
    const balance = transactions.length > 0 ? transactions[transactions.length - 1].numericBalance : 0;
    // Wait, transactions[0] is the LATEST one because of sort({ createdAt: -1 })
    const currentBalance = transactions.length > 0 ? transactions[0].numericBalance : 0;
    
    res.json({ 
      balance: currentBalance, 
      transactions,
      systemCount: allTransactionsCount // Added for debugging
    });
  } catch (error) {
    console.error('FETCH TRANSACTIONS ERROR:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Create a new transaction
router.post('/', async (req, res) => {
  try {
    const { type, method, description } = req.body;
    const userId = req.body.userId?.toString().trim();
    const amount = parseFloat(req.body.amount); // Force numeric type
    
    if (!userId) {
       return res.status(400).json({ error: 'User ID is required' });
    }

    if (isNaN(amount)) {
      return res.status(400).json({ error: 'Invalid amount provided' });
    }

    const isDeduction = type === 'Withdrawal' || type === 'Transfer' || type === 'Bill Payment';

    // We must find the last transaction for THIS USER to determine the new balance safely
    const isObjectId = mongoose.Types.ObjectId.isValid(userId);
    const userIdQuery = isObjectId ? new mongoose.Types.ObjectId(userId) : userId;

    const latestTx = await Transaction.findOne({ 
       $or: [
        { userId: userId },
        { userId: userIdQuery }
      ]
    }).sort({ createdAt: -1 });
    const currentBalance = latestTx ? latestTx.numericBalance : 0;

    if (isDeduction && amount > currentBalance) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const newBalance = isDeduction ? currentBalance - amount : currentBalance + amount;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    // Formatting currency on server instead of importing to avoid client/server dependency issues
    const formatCurrencyStr = (num: number) => `₹ ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const newTx = new Transaction({
      userId,
      date: today,
      ref: `TXN${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      type,
      description: description || `${type} via ${method?.replace(/_/g, ' ') || 'app'}`,
      amount: formatCurrencyStr(amount),
      numericAmount: amount,
      status: '✓',
      numericBalance: newBalance,
    });

    await newTx.save();
    res.json(newTx);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process transaction' });
  }
});

// DEBUG DUMP: Let's see the LATEST 5 transactions in the DB
router.get('/dump', async (req, res) => {
  try {
    const samples = await Transaction.find({}).sort({ createdAt: -1 }).limit(5);
    res.json(samples.map(t => ({
      _id: t._id,
      userId: t.userId,
      amount: t.amount,
      type: t.type
    })));
  } catch (err) {
    res.status(500).json({ error: 'Dump failed' });
  }
});

export default router;
