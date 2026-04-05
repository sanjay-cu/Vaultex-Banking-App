import { Router } from 'express';
import { Transaction } from '../models/Transaction';
// import { formatCurrency } from '../../client/context/AccountContext';

const router = Router();

// Get transactions and compute balance
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    const balance = transactions.length > 0 ? transactions[0].numericBalance : 0;
    res.json({ balance, transactions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Create a new transaction
router.post('/', async (req, res) => {
  try {
    const { amount, type, method, description } = req.body;
    const isDeduction = type === 'Withdrawal' || type === 'Transfer' || type === 'Bill Payment';

    // We must find the last transaction to determine the new balance safely
    const latestTx = await Transaction.findOne().sort({ createdAt: -1 });
    const currentBalance = latestTx ? latestTx.numericBalance : 0;

    if (isDeduction && amount > currentBalance) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const newBalance = isDeduction ? currentBalance - amount : currentBalance + amount;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    // Formatting currency on server instead of importing to avoid client/server dependency issues
    const formatCurrencyStr = (num: number) => `₹ ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const newTx = new Transaction({
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

export default router;
