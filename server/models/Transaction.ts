import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  date: string;
  ref: string;
  type: 'Deposit' | 'Withdrawal' | 'Transfer' | 'Bill Payment';
  description: string;
  amount: string; // Formatted
  numericAmount: number;
  status: string;
  numericBalance: number;
}

const TransactionSchema: Schema = new Schema({
  date: { type: String, required: true },
  ref: { type: String, required: true },
  type: { type: String, enum: ['Deposit', 'Withdrawal', 'Transfer', 'Bill Payment'], required: true },
  description: { type: String, required: true },
  amount: { type: String, required: true },
  numericAmount: { type: Number, required: true },
  status: { type: String, required: true, default: '✓' },
  numericBalance: { type: Number, required: true },
}, { timestamps: true });

export const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
