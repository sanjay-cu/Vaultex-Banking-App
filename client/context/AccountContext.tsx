import React, { createContext, useContext, useState, useEffect } from 'react';

export const formatCurrency = (amount: number) => {
  return `₹ ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export interface Transaction {
  id: string;
  date: string;
  ref: string;
  type: string;
  description: string;
  amount: string;
  status: string;
  numericAmount: number;
  numericBalance: number;
}

export interface Card {
  id: string;
  type: 'Debit' | 'Credit';
  brand: 'Visa' | 'Mastercard' | 'Rupay';
  number: string;
  expiry: string;
  cvv: string;
  holderName: string;
  oneTimeLimit: number;
}

export interface FixedDeposit {
  id: string;
  amount: number;
  interestRate: number;
  durationInMonths: number;
  maturityAmount: number;
  startDate: string;
  endDate: string;
}

export interface MoneyRequest {
  id: string;
  from: string;
  phoneOrUpi: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Completed' | 'Rejected';
}

export type User = {
  _id: string;
  fullName: string;
  email: string;
  accountNumber: string;
  kycStatus?: 'not_started' | 'pending' | 'completed' | 'rejected';
  kycLastCompletedAt?: string;
};

interface AccountContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  balance: number;
  transactions: Transaction[];
  systemCount?: number;
  sampleId?: string;
  cards: Card[];
  fixedDeposits: FixedDeposit[];
  moneyRequests: MoneyRequest[];
  deposit: (amount: number, method: string, description?: string) => Promise<void>;
  withdraw: (amount: number, method: string, description?: string) => Promise<void>;
  transfer: (amount: number, to: string, description?: string) => Promise<void>;
  payBill: (amount: number, biller: string, description?: string) => Promise<void>;
  addCard: (card: Omit<Card, 'id'>) => void;
  deleteCard: (id: string) => void;
  updateCardLimit: (id: string, limit: number) => void;
  createFD: (fd: Omit<FixedDeposit, 'id'>) => void;
  requestMoney: (request: Omit<MoneyRequest, 'id' | 'date' | 'status'>) => void;
  downloadTransactions: () => void;
  isLoading: boolean;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [systemCount, setSystemCount] = useState<number>(0);
  const [sampleId, setSampleId] = useState<string>('');
  const [cards, setCards] = useState<Card[]>([]);
  const [fixedDeposits, setFixedDeposits] = useState<FixedDeposit[]>([]);
  const [moneyRequests, setMoneyRequests] = useState<MoneyRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Restore state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage');
        localStorage.removeItem('user');
      }
    }

    const storedCards = localStorage.getItem('cards');
    if (storedCards) setCards(JSON.parse(storedCards));

    const storedFDs = localStorage.getItem('fixedDeposits');
    if (storedFDs) setFixedDeposits(JSON.parse(storedFDs));

    const storedRequests = localStorage.getItem('moneyRequests');
    if (storedRequests) setMoneyRequests(JSON.parse(storedRequests));
    
    // If no user is being restored, we are done loading the session state
    if (!storedUser) {
      setIsLoading(false);
    }
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('fixedDeposits', JSON.stringify(fixedDeposits));
  }, [fixedDeposits]);

  useEffect(() => {
    localStorage.setItem('moneyRequests', JSON.stringify(moneyRequests));
  }, [moneyRequests]);

  const fetchTransactions = async () => {
    if (!user?._id) {
      if (!isLoading) return; // Already stopped loading
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`/api/transactions?userId=${user._id}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setTransactions(data.transactions || []);
      setBalance(data.balance || 0);
      if (data.systemCount !== undefined) {
        setSystemCount(data.systemCount);
      }
      
      // Also fetch a sample for comparison
      const dumpRes = await fetch('/api/transactions/dump');
      const dumpData = await dumpRes.json().catch(() => []);
      if (Array.isArray(dumpData) && dumpData.length > 0) {
         setSampleId(dumpData[0].userId || 'No ID');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const addTransaction = async (
    amount: number,
    type: string,
    method: string,
    description: string
  ) => {
    console.log(`Attempting to add transaction. User ID: ${user?._id || 'MISSING'}`);
    
    if (!user?._id) {
      const error = 'Cannot process transaction: Session missing. Please try logging in again.';
      console.error(error);
      throw new Error(error);
    }

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, type, method, description, userId: user._id })
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const msg = errorData.error || `Server Error ${res.status}`;
        window.alert(`DEPOSIT FAILED: ${msg}`);
        throw new Error(msg);
      }
      
      // Give the database a moment to fully record the transaction before refreshing
      console.log('Transaction posted. Refreshing dashboard in 500ms...');
      setTimeout(async () => {
        await fetchTransactions();
        console.log('Dashboard data refreshed.');
      }, 500);
    } catch (error: any) {
      console.error(error);
      if (!error.message.includes('DEPOSIT FAILED')) {
         window.alert(`ERROR: ${error.message}`);
      }
      throw error;
    }
  };

  const deposit = async (amount: number, method: string, description?: string) => {
    await addTransaction(amount, 'Deposit', method, description || '');
  };

  const withdraw = async (amount: number, method: string, description?: string) => {
    await addTransaction(amount, 'Withdrawal', method, description || '');
  };

  const transfer = async (amount: number, to: string, description?: string) => {
    await addTransaction(amount, 'Transfer', 'transfer', description || `Sent to ${to}`);
  };

  const payBill = async (amount: number, biller: string, description?: string) => {
    await addTransaction(amount, 'Bill Payment', 'bill', description || `Payment to ${biller}`);
  };

  const downloadTransactions = () => {
    if (transactions.length === 0) return;

    // Build CSV Content
    const headers = ['Date', 'Reference', 'Type', 'Description', 'Amount', 'Status', 'Balance'];
    const rows = transactions.map(t => [
      t.date,
      t.ref,
      t.type,
      t.description,
      t.numericAmount,
      t.status,
      t.numericBalance
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create Download Link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Vaultex_Statement_${user?.fullName || 'User'}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addCard = (card: Omit<Card, 'id'>) => {
    const newCard = { ...card, id: Math.random().toString(36).substr(2, 9) };
    setCards([...cards, newCard]);
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter(c => c.id !== id));
  };

  const updateCardLimit = (id: string, limit: number) => {
    setCards(cards.map(c => c.id === id ? { ...c, oneTimeLimit: limit } : c));
  };

  const createFD = (fd: Omit<FixedDeposit, 'id'>) => {
    const newFD = { ...fd, id: Math.random().toString(36).substr(2, 9) };
    setFixedDeposits([...fixedDeposits, newFD]);
  };

  const requestMoney = (request: Omit<MoneyRequest, 'id' | 'date' | 'status'>) => {
    const newRequest: MoneyRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString(),
      status: 'Pending'
    };
    setMoneyRequests([...moneyRequests, newRequest]);
  };

  return (
    <AccountContext.Provider value={{
      user,
      setUser,
      balance,
      transactions,
      cards,
      fixedDeposits,
      moneyRequests,
      deposit,
      withdraw,
      transfer,
      payBill,
      addCard,
      deleteCard,
      updateCardLimit,
      createFD,
      requestMoney,
      downloadTransactions,
      isLoading,
      systemCount,
      sampleId
    }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
