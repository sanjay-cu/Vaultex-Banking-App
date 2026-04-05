import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { theme } from '../theme';
import { useAccount, formatCurrency } from '../context/AccountContext';
import Sidebar from '../components/Sidebar';

const Transfer = () => {
  const navigate = useNavigate();
  const { balance, transfer, transactions } = useAccount();
  const [tab, setTab] = useState<'own' | 'other' | 'international'>('other');
  const [step, setStep] = useState<'recipient' | 'amount' | 'pin' | 'confirm' | 'success'>('recipient');

  const [accountNumber, setAccountNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [pin, setPin] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);

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

  const tabsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    borderBottom: `1px solid ${theme.colors.border}`,
  };

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '12px 16px',
    borderBottom: isActive ? `2px solid ${theme.colors.accent}` : 'none',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: theme.font.body,
    color: isActive ? theme.colors.accent : theme.colors.textMuted,
    transition: 'all 0.3s ease',
  });

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
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

  const recipientCardStyle: React.CSSProperties = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    border: `1px solid ${theme.colors.border}`,
    padding: '20px',
    marginBottom: '24px',
  };

  const recipientNameStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
    marginBottom: '4px',
  };

  const recipientAccStyle: React.CSSProperties = {
    fontSize: '13px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
  };

  const buttonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
  };

  const handleLookup = async () => {
    const newErrors: Record<string, string> = {};
    if (!accountNumber) newErrors.accountNumber = 'Account number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLookingUp(true);
    try {
      // Simulate API lookup
      await new Promise((resolve) => setTimeout(resolve, 800));
      // Mock recipient name based on account number
      if (accountNumber.length >= 4) {
        setRecipientName('Recipient - ' + accountNumber.slice(-4));
        setErrors({});
        setStep('amount');
      }
    } catch (error) {
      setErrors({ accountNumber: 'Account not found' });
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleAmountSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!amount) newErrors.amount = 'Amount is required';
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < 100)
      newErrors.amount = 'Minimum transfer is INR 100';
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
      await transfer(parseFloat(amount), recipientName || accountNumber, description);
      setStep('success');
    } catch (error) {
      setErrors({ submit: 'Failed to process transfer' });
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
          <h1 style={pageTitleStyle}>Send Money</h1>
          <p style={pageSubtitleStyle}>
            Transfer funds to other VAULTEX accounts or banks
          </p>
        </div>

        <div style={contentMaxWidthStyle}>
          {step === 'recipient' || step === 'amount' || step === 'pin' || step === 'confirm' ? (
            <>
              <div style={tabsStyle}>
                <div
                  style={tabStyle(tab === 'own')}
                  onClick={() => {
                    setTab('own');
                    setAccountNumber('');
                    setRecipientName('');
                  }}
                >
                  Own Accounts
                </div>
                <div
                  style={tabStyle(tab === 'other')}
                  onClick={() => {
                    setTab('other');
                    setAccountNumber('');
                    setRecipientName('');
                  }}
                >
                  Other Account
                </div>
                <div
                  style={tabStyle(tab === 'international')}
                  onClick={() => {
                    setTab('international');
                    setAccountNumber('');
                    setRecipientName('');
                  }}
                >
                  International
                </div>
              </div>

              {step === 'recipient' && (
                <Card>
                  <form style={formStyle} onSubmit={(e) => {
                    e.preventDefault();
                    handleLookup();
                  }}>
                    <h2 style={{ ...pageTitleStyle, fontSize: '20px', marginBottom: '16px' }}>
                      {tab === 'own' ? 'Select Account' : 'Enter Recipient'}
                    </h2>

                    {tab === 'own' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div
                          style={{
                            ...recipientCardStyle,
                            cursor: 'pointer',
                            border: `2px solid ${theme.colors.accent}`,
                          }}
                          onClick={() => {
                            setRecipientName('Savings Account - 1234567890');
                            setAccountNumber('1234567890');
                            setStep('amount');
                          }}
                        >
                          <div style={recipientNameStyle}>Savings Account</div>
                          <div style={recipientAccStyle}>Account: 1234567890</div>
                          <div style={recipientAccStyle}>Balance: ₹ 50,000.00</div>
                        </div>
                        <div
                          style={{
                            ...recipientCardStyle,
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            setRecipientName('Checking Account - 9876543210');
                            setAccountNumber('9876543210');
                            setStep('amount');
                          }}
                        >
                          <div style={recipientNameStyle}>Checking Account</div>
                          <div style={recipientAccStyle}>Account: 9876543210</div>
                          <div style={recipientAccStyle}>Balance: ₹ 25,000.00</div>
                        </div>
                      </div>
                    )}

                    {(tab === 'other' || tab === 'international') && (
                      <>
                        <Input
                          label={tab === 'international' ? 'IBAN / Account Number' : 'Account Number'}
                          placeholder={tab === 'international' ? 'IN5000VLTX...' : '10-digit account number'}
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          error={errors.accountNumber}
                          required
                        />

                        <button
                          type="submit"
                          disabled={isLookingUp}
                          style={{
                            padding: '12px 24px',
                            backgroundColor: theme.colors.accent,
                            color: '#000',
                            border: 'none',
                            borderRadius: theme.radius.md,
                            cursor: 'pointer',
                            fontFamily: theme.font.body,
                            fontSize: '14px',
                            fontWeight: 500,
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.backgroundColor = theme.colors.accentHover;
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.backgroundColor = theme.colors.accent;
                          }}
                        >
                          {isLookingUp ? 'Looking up...' : 'Look Up Recipient'}
                        </button>
                      </>
                    )}
                  </form>
                </Card>
              )}

              {step === 'amount' && (
                <div>
                  {recipientName && (
                    <div style={recipientCardStyle}>
                      <div style={recipientNameStyle}>{recipientName}</div>
                      <div style={recipientAccStyle}>Account: {accountNumber}</div>
                    </div>
                  )}

                  <Card style={{ marginBottom: '24px' }}>
                    <div style={balanceShowStyle}>
                      <div style={balanceItemStyle}>
                        <div style={balanceLabelStyle}>Current Balance</div>
                        <div style={balanceValueStyle}>{formatCurrency(balance)}</div>
                      </div>
                      <div style={balanceItemStyle}>
                        <div style={balanceLabelStyle}>After Transfer</div>
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
                      label="Transfer Amount (INR)"
                      placeholder="5000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      error={errors.amount}
                      required
                    />
                    <Input
                      label="Description / Note"
                      placeholder="Optional: e.g., Payment for services"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    <div style={buttonsStyle}>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setStep('recipient');
                          setRecipientName('');
                          setAccountNumber('');
                        }}
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
                    <h2 style={{ ...pageTitleStyle, fontSize: '20px' }}>Confirm Transfer</h2>

                    <div>
                      <div style={{ ...balanceLabelStyle, marginBottom: '12px' }}>To</div>
                      <div style={recipientNameStyle}>{recipientName}</div>
                      <div style={recipientAccStyle}>{accountNumber}</div>
                    </div>

                    <div style={{ ...balanceShowStyle }}>
                      <div style={balanceItemStyle}>
                        <div style={balanceLabelStyle}>Amount</div>
                        <div style={balanceValueStyle}>₹ {parseFloat(amount).toFixed(2)}</div>
                      </div>
                      <div style={balanceItemStyle}>
                        <div style={balanceLabelStyle}>Your Balance After</div>
                        <div style={balanceValueStyle}>{formatCurrency(balance - parseFloat(amount))}</div>
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
                        {isLoading ? 'Processing...' : 'Confirm Transfer'}
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '56px' }}>✓</div>
                <h2 style={{ ...pageTitleStyle, color: theme.colors.success }}>Transfer Successful!</h2>
                <div style={{ ...balanceShowStyle, gridTemplateColumns: '1fr' }}>
                  <div style={balanceItemStyle}>
                    <div style={balanceLabelStyle}>Transferred Amount</div>
                    <div style={balanceValueStyle}>₹ {parseFloat(amount).toFixed(2)}</div>
                  </div>
                </div>
                <div>
                  <div style={{ ...balanceLabelStyle, marginBottom: '8px' }}>To: {recipientName}</div>
                  <div style={{ fontSize: '13px', color: theme.colors.textMuted }}>
                    Reference: {transactions.length > 0 ? transactions[0].ref : 'TXN' + Math.random().toString().slice(2, 10)}
                  </div>
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

export default Transfer;
