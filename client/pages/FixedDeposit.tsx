import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Table } from '../components/Table';
import { useTheme } from '../context/ThemeContext';
import { useAccount, formatCurrency } from '../context/AccountContext';
import Sidebar from '../components/Sidebar';

const INTEREST_RATE = 0.08; // 8.00%

const FixedDeposit = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { fixedDeposits, createFD, balance, withdraw } = useAccount();
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('12');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: theme.colors.base,
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
  };

  const mainContentStyle: React.CSSProperties = {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  };

  const pageHeaderStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const pageTitleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
  };

  const columns = [
    { key: 'amount', label: 'Principal Amount' },
    { key: 'interestRate', label: 'Interest Rate' },
    { key: 'durationInMonths', label: 'Duration' },
    { key: 'maturityAmount', label: 'Maturity Amount' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'Maturity Date' },
  ];

  const calculateMaturity = (p: number, tInMonths: number) => {
    // Simple Interest for this demo: A = P(1 + rt) 
    // where r is annual rate and t is time in years
    const tInYears = tInMonths / 12;
    const maturity = p * (1 + INTEREST_RATE * tInYears);
    return maturity;
  };

  const handleCreateFD = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const amt = parseFloat(amount);
    const dur = parseInt(duration);

    if (isNaN(amt) || amt < 5000) {
      setError('Minimum FD amount is ₹ 5,000.00');
      return;
    }

    if (amt > balance) {
      setError('Insufficient balance in savings account');
      return;
    }

    setIsLoading(true);
    try {
      const maturity = calculateMaturity(amt, dur);
      const start = new Date();
      const end = new Date();
      end.setMonth(start.getMonth() + dur);

      // 1. Create the FD
      createFD({
        amount: amt,
        interestRate: INTEREST_RATE * 100,
        durationInMonths: dur,
        maturityAmount: maturity,
        startDate: start.toLocaleDateString(),
        endDate: end.toLocaleDateString(),
      });

      // 2. Actually deduct balance via a generic withdrawal/payment logic
      await withdraw(amt, 'FD Creation', `Fixed Deposit of ${formatCurrency(amt)} at 8.00% interest`);
      
      setAmount('');
      setDuration('12');
    } catch (err) {
      setError('Failed to create FD. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const tableData = fixedDeposits.map(fd => ({
    ...fd,
    amount: formatCurrency(fd.amount),
    interestRate: `${fd.interestRate.toFixed(2)}%`,
    durationInMonths: `${fd.durationInMonths} Months`,
    maturityAmount: formatCurrency(fd.maturityAmount),
  }));

  return (
    <div style={containerStyle}>
      <Sidebar />

      <div style={mainContentStyle}>
        <div style={pageHeaderStyle}>
          <h1 style={pageTitleStyle}>Fixed Deposits</h1>
          <p style={{ color: theme.colors.textMuted }}>
            Grow your wealth with a guaranteed 8.00% annual interest rate
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px', alignItems: 'start' }}>
          {/* Active Deposits */}
          <div>
            <h3 style={{ marginBottom: '16px', fontWeight: 600 }}>Your Active Deposits</h3>
            {fixedDeposits.length === 0 ? (
              <Card style={{ padding: '48px', textAlign: 'center' }}>
                <p style={{ color: theme.colors.textMuted }}>No active fixed deposits found.</p>
              </Card>
            ) : (
              <Card>
                <Table columns={columns} data={tableData} />
              </Card>
            )}
          </div>

          {/* Create New FD */}
          <Card>
            <form onSubmit={handleCreateFD} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Open New FD</h3>
              <p style={{ color: theme.colors.textMuted, fontSize: '13px' }}>Interest Rate: <strong style={{ color: theme.colors.success }}>8.00% p.a.</strong></p>
              
              <Input 
                label="Amount (INR)" 
                type="number" 
                placeholder="5000" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                error={error}
                required
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', color: theme.colors.textMuted }}>Duration</label>
                <select 
                  value={duration} 
                  onChange={(e) => setDuration(e.target.value)}
                  style={{
                    padding: '12px',
                    backgroundColor: theme.colors.base,
                    color: '#fff',
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: theme.radius.md,
                    fontFamily: theme.font.body,
                    cursor: 'pointer',
                  }}
                >
                  <option value="6">6 Months</option>
                  <option value="12">1 Year</option>
                  <option value="24">2 Years</option>
                  <option value="36">3 Years</option>
                  <option value="60">5 Years</option>
                </select>
              </div>

              {amount && !isNaN(parseFloat(amount)) && (
                <div style={{ 
                  backgroundColor: theme.colors.surfaceAlt, 
                  padding: '16px', 
                  borderRadius: theme.radius.md,
                  border: `1px dashed ${theme.colors.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span>Estimated Maturity</span>
                    <span style={{ color: theme.colors.success, fontWeight: 700 }}>
                      {formatCurrency(calculateMaturity(parseFloat(amount), parseInt(duration)))}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span>Total Interest earned</span>
                    <span>{formatCurrency(calculateMaturity(parseFloat(amount), parseInt(duration)) - parseFloat(amount))}</span>
                  </div>
                </div>
              )}

              <Button type="submit" disabled={isLoading} fullWidth>
                {isLoading ? 'Processing...' : 'Confirm & Open FD'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FixedDeposit;
