import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { useTheme } from '../context/ThemeContext';
import { useAccount, formatCurrency } from '../context/AccountContext';
import Sidebar from '../components/Sidebar';

const billers = [
  { id: 'elec', name: 'Electricity', icon: '⚡' },
  { id: 'water', name: 'Water', icon: '💧' },
  { id: 'net', name: 'Internet', icon: '🌐' },
  { id: 'mob', name: 'Mobile', icon: '📱' },
];

const operatorsMap: Record<string, string[]> = {
  elec: ['Tata Power', 'Adani Electricity', 'MSEB Limited', 'BESCOM', 'BSES Rajdhani'],
  water: ['BMC Mumbai', 'Delhi Jal Board', 'Bangalore Water (BWSSB)', 'Pune Municipal'],
  net: ['Airtel Fiber', 'Jio Fiber', 'ACT Fibernet', 'Hathway Broadband', 'BSNL Bharat Fiber'],
  mob: ['Jio Prepaid', 'Airtel Prepaid', 'VI (Vodafone Idea)', 'BSNL Mobile'],
};

const Bills = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { balance, payBill } = useAccount();
  const [step, setStep] = useState<'category' | 'operator' | 'details' | 'success'>('category');
  const [selectedBiller, setSelectedBiller] = useState(billers[0]);
  const [selectedOperator, setSelectedOperator] = useState('');
  const [amount, setAmount] = useState('');
  const [consumerId, setConsumerId] = useState('');
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

  const methodsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  };

  const listGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  };

  const handleCategorySelect = (biller: typeof billers[0]) => {
    setSelectedBiller(biller);
    setStep('operator');
  };

  const handleOperatorSelect = (op: string) => {
    setSelectedOperator(op);
    setStep('details');
  };

  const handlePayBill = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const amt = parseFloat(amount);

    if (isNaN(amt) || amt <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (amt > balance) {
      setError('Insufficient balance');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await payBill(amt, selectedOperator, `Bill Payment: ${selectedBiller.name} - ${selectedOperator} (${consumerId})`);
      setStep('success');
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <Sidebar />

      <div style={mainContentStyle}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, fontFamily: theme.font.heading, color: theme.colors.textPrimary }}>
            Bill Payments
          </h1>
          <p style={{ color: theme.colors.textMuted, marginTop: '8px' }}>
            Pay your monthly utility bills securely with VaultEx 24X7
          </p>
        </div>

        {step === 'category' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600 }}>1. Select Bill Category</h3>
            <div style={methodsGridStyle}>
              {billers.map((b) => (
                <Card 
                  key={b.id} 
                  style={{ padding: '24px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onClick={() => handleCategorySelect(b)}
                >
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>{b.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '18px' }}>{b.name}</div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 'operator' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Button variant="secondary" onClick={() => setStep('category')}>← Back</Button>
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>2. Select Operator for {selectedBiller.name}</h3>
            </div>
            <div style={listGridStyle}>
              {operatorsMap[selectedBiller.id].map((op) => (
                <Card 
                  key={op} 
                  style={{ padding: '16px 24px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => handleOperatorSelect(op)}
                >
                  <span style={{ fontWeight: 600 }}>{op}</span>
                  <span style={{ color: theme.colors.accent }}>→</span>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 'details' && (
          <div style={{ maxWidth: '400px' }}>
            <Card style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <span style={{ fontSize: '32px' }}>{selectedBiller.icon}</span>
                <div>
                  <h3 style={{ fontWeight: 700 }}>{selectedOperator}</h3>
                  <p style={{ fontSize: '12px', color: theme.colors.textMuted }}>{selectedBiller.name} Payment</p>
                </div>
              </div>

              <form onSubmit={handlePayBill} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Input 
                  label={selectedBiller.id === 'mob' ? 'Mobile Number' : 'Consumer ID'} 
                  placeholder={selectedBiller.id === 'mob' ? 'e.g. 9876543210' : 'e.g. 123456789'} 
                  value={consumerId} 
                  onChange={(e) => setConsumerId(e.target.value)}
                  required
                />
                <Input 
                  label="Payment Amount (INR)" 
                  type="number" 
                  placeholder="0.00" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  error={error}
                  required
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.6 }}>
                  <span>VaultEx Wallet Balance:</span>
                  <span style={{ fontWeight: 600 }}>{formatCurrency(balance)}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <Button variant="secondary" onClick={() => setStep('operator')} fullWidth type="button">Back</Button>
                  <Button type="submit" disabled={isLoading} fullWidth>
                    {isLoading ? 'Verifying...' : 'Pay Bill'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {step === 'success' && (
          <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <Card style={{ padding: '48px', border: `2px solid ${theme.colors.success}` }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(0, 255, 137, 0.1)', color: theme.colors.success, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 24px' }}>✓</div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Payment Confirmed!</h2>
              <p style={{ color: theme.colors.textMuted, marginBottom: '32px', fontSize: '14px', lineHeight: '1.6' }}>
                Your bill of <strong style={{ color: theme.colors.textPrimary }}>{formatCurrency(parseFloat(amount))}</strong> to <strong style={{ color: theme.colors.textPrimary }}>{selectedOperator}</strong> has been paid successfully.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button fullWidth onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
                <Button variant="secondary" fullWidth onClick={() => setStep('category')}>Pay Another Bill</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bills;
