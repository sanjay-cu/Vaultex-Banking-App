import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { theme } from '../theme';
import { useAccount, formatCurrency } from '../context/AccountContext';
import Sidebar from '../components/Sidebar';

const Withdraw = () => {
  const navigate = useNavigate();
  const { balance, withdraw, transactions } = useAccount();
  const [step, setStep] = useState<'method' | 'amount' | 'pin' | 'confirm' | 'success'>('method');
  const [method, setMethod] = useState('atm');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: theme.colors.base,
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
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

  const pageSubtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
  };

  const contentMaxWidthStyle: React.CSSProperties = {
    maxWidth: '600px',
  };

  const methodsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  };

  const methodCardStyle = (isSelected: boolean): React.CSSProperties => ({
    padding: '24px',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    border: `2px solid ${isSelected ? theme.colors.accent : theme.colors.border}`,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  });

  const methodTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
    marginBottom: '8px',
  };

  const methodDescStyle: React.CSSProperties = {
    fontSize: '13px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
  };

  const balanceShowStyle: React.CSSProperties = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    border: `1px solid ${theme.colors.border}`,
    padding: '24px',
    marginBottom: '24px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  };

  const balanceItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const balanceLabelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
    textTransform: 'uppercase',
  };

  const balanceValueStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 700,
    fontFamily: theme.font.number,
    color: theme.colors.accent,
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const buttonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
  };

  const handleMethodSelect = (m: string) => {
    setMethod(m);
    setStep('amount');
  };

  const handleAmountSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!amount) newErrors.amount = 'Amount is required';
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < 100)
      newErrors.amount = 'Minimum withdrawal is INR 100';
    if (amountNum > balance)
      newErrors.amount = 'Insufficient balance';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep('pin');
  };

  const handlePinSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!pin) newErrors.pin = 'PIN is required';
    if (pin.length !== 4) newErrors.pin = 'PIN must be 4 digits';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep('confirm');
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await withdraw(parseFloat(amount), method, description);
      setStep('success');
    } catch (error) {
      setErrors({ submit: 'Failed to process withdrawal' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <Sidebar />

      {/* Main Content */}
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={pageHeaderStyle}>
          <h1 style={pageTitleStyle}>Withdraw Money</h1>
          <p style={pageSubtitleStyle}>
            Withdraw funds from your VAULTEX account
          </p>
        </div>

        <div style={contentMaxWidthStyle}>
          {step === 'method' && (
            <div>
              <h2 style={{ ...pageTitleStyle, fontSize: '20px', marginBottom: '16px' }}>
                Choose Withdrawal Method
              </h2>
              <div style={methodsGridStyle}>
                <div
                  style={methodCardStyle(method === 'atm')}
                  onClick={() => handleMethodSelect('atm')}
                >
                  <div style={methodTitleStyle}>ATM Withdrawal</div>
                  <div style={methodDescStyle}>Withdraw at any ATM</div>
                </div>
                <div
                  style={methodCardStyle(method === 'counter')}
                  onClick={() => handleMethodSelect('counter')}
                >
                  <div style={methodTitleStyle}>Bank Counter</div>
                  <div style={methodDescStyle}>Withdraw at branch</div>
                </div>
                <div
                  style={methodCardStyle(method === 'transfer')}
                  onClick={() => handleMethodSelect('transfer')}
                >
                  <div style={methodTitleStyle}>Bank Transfer Out</div>
                  <div style={methodDescStyle}>Transfer to external account</div>
                </div>
                <div
                  style={methodCardStyle(method === 'check')}
                  onClick={() => handleMethodSelect('check')}
                >
                  <div style={methodTitleStyle}>Check Issuance</div>
                  <div style={methodDescStyle}>Request a check</div>
                </div>
              </div>
            </div>
          )}

          {step === 'amount' && (
            <div>
              <Card style={{ marginBottom: '24px' }}>
                <div style={balanceShowStyle}>
                  <div style={balanceItemStyle}>
                    <div style={balanceLabelStyle}>Current Balance</div>
                    <div style={balanceValueStyle}>{formatCurrency(balance)}</div>
                  </div>
                  <div style={balanceItemStyle}>
                    <div style={balanceLabelStyle}>After Withdrawal</div>
                    <div style={balanceValueStyle}>
                      {amount ? formatCurrency(balance - parseFloat(amount)) : formatCurrency(balance)}
                    </div>
                  </div>
                </div>
              </Card>

              <form style={formStyle} onSubmit={(e) => {
                e.preventDefault();
                handleAmountSubmit();
              }}>
                <Input
                  type="number"
                  label="Withdrawal Amount (INR)"
                  placeholder="5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  error={errors.amount}
                  required
                />
                <Input
                  label="Description"
                  placeholder="Optional: e.g., ATM withdrawal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div style={buttonsStyle}>
                  <Button
                    variant="secondary"
                    onClick={() => setStep('method')}
                    fullWidth
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          )}

          {step === 'pin' && (
            <Card>
              <form style={formStyle} onSubmit={(e) => {
                e.preventDefault();
                handlePinSubmit();
              }}>
                <h2 style={{ ...pageTitleStyle, fontSize: '20px', marginBottom: '16px' }}>
                  Enter Transaction PIN
                </h2>
                <Input
                  type="password"
                  label="4-Digit PIN"
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.slice(0, 4))}
                  error={errors.pin}
                  required
                />

                <div style={buttonsStyle}>
                  <Button
                    variant="secondary"
                    onClick={() => setStep('amount')}
                    fullWidth
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                  >
                    Verify PIN
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {step === 'confirm' && (
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{ ...pageTitleStyle, fontSize: '20px' }}>Confirm Withdrawal</h2>

                <div style={balanceShowStyle}>
                  <div style={balanceItemStyle}>
                    <div style={balanceLabelStyle}>Withdrawal Amount</div>
                    <div style={balanceValueStyle}>₹ {parseFloat(amount).toFixed(2)}</div>
                  </div>
                  <div style={balanceItemStyle}>
                    <div style={balanceLabelStyle}>Method</div>
                    <div style={{ ...balanceValueStyle, fontSize: '16px', textTransform: 'capitalize' }}>
                      {method.replace(/_/g, ' ')}
                    </div>
                  </div>
                </div>

                <div style={buttonsStyle}>
                  <Button
                    variant="secondary"
                    onClick={() => setStep('pin')}
                    fullWidth
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    disabled={isLoading}
                    fullWidth
                  >
                    {isLoading ? 'Processing...' : 'Confirm Withdrawal'}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {step === 'success' && (
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '56px' }}>✓</div>
                <h2 style={{ ...pageTitleStyle, color: theme.colors.success }}>Withdrawal Successful!</h2>
                <div style={{ ...balanceShowStyle, gridTemplateColumns: '1fr' }}>
                  <div style={balanceItemStyle}>
                    <div style={balanceLabelStyle}>Withdrawn Amount</div>
                    <div style={balanceValueStyle}>₹ {parseFloat(amount).toFixed(2)}</div>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: theme.colors.textMuted }}>
                  Reference: {transactions.length > 0 ? transactions[0].ref : 'TXN' + Math.random().toString().slice(2, 10)}
                </div>
                <Button fullWidth onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
