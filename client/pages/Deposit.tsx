import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAccount, formatCurrency } from '../context/AccountContext';
import Sidebar from '../components/Sidebar';

const Deposit = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { balance, deposit, transactions } = useAccount();
  const [step, setStep] = useState<'method' | 'amount' | 'confirm' | 'success'>('method');
  const [method, setMethod] = useState('bank_transfer');
  const [amount, setAmount] = useState('');
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

  const fieldsStyle: React.CSSProperties = {
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
      newErrors.amount = 'Minimum deposit is INR 100';

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
      await deposit(parseFloat(amount), method, description);
      setStep('success');
    } catch (error) {
      setErrors({ submit: 'Failed to process deposit' });
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
          <h1 style={pageTitleStyle}>{t('deposit')}</h1>
          <p style={pageSubtitleStyle}>
            Add funds to your VAULTEX account using various deposit methods
          </p>
        </div>

        <div style={contentMaxWidthStyle}>
          {step === 'method' && (
            <div>
              <h2 style={{ ...pageTitleStyle, fontSize: '20px', marginBottom: '16px' }}>
                Choose Deposit Method
              </h2>
              <div style={methodsGridStyle}>
                <div
                  style={methodCardStyle(method === 'bank_transfer')}
                  onClick={() => handleMethodSelect('bank_transfer')}
                >
                  <div style={methodTitleStyle}>Bank Transfer</div>
                  <div style={methodDescStyle}>Transfer from your bank account</div>
                </div>
                <div
                  style={methodCardStyle(method === 'check')}
                  onClick={() => handleMethodSelect('check')}
                >
                  <div style={methodTitleStyle}>Check Deposit</div>
                  <div style={methodDescStyle}>Upload a check image</div>
                </div>
                <div
                  style={methodCardStyle(method === 'cash')}
                  onClick={() => handleMethodSelect('cash')}
                >
                  <div style={methodTitleStyle}>Cash Deposit</div>
                  <div style={methodDescStyle}>Visit a VAULTEX branch</div>
                </div>
                <div
                  style={methodCardStyle(method === 'wire')}
                  onClick={() => handleMethodSelect('wire')}
                >
                  <div style={methodTitleStyle}>Wire Transfer</div>
                  <div style={methodDescStyle}>Receive from international wire</div>
                </div>
              </div>
            </div>
          )}

          {step === 'amount' && (
            <div>
              <Card style={{ marginBottom: '24px' }}>
                <div style={balanceShowStyle}>
                  <div style={balanceItemStyle}>
                    <div style={balanceLabelStyle}>{t('currentBalance')}</div>
                    <div style={balanceValueStyle}>{formatCurrency(balance)}</div>
                  </div>
                  <div style={balanceItemStyle}>
                    <div style={balanceLabelStyle}>After Deposit</div>
                    <div style={balanceValueStyle}>
                      {amount ? formatCurrency(balance + parseFloat(amount)) : formatCurrency(balance)}
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
                  label={t('amount')}
                  placeholder="1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  error={errors.amount}
                  required
                />
                <Input
                  label="Description"
                  placeholder="Optional: e.g., Monthly savings"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div style={buttonsStyle}>
                  <Button
                    variant="secondary"
                    onClick={() => setStep('method')}
                    fullWidth
                  >
                    {t('back')}
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                  >
                    {t('continue')}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {step === 'confirm' && (
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{ ...pageTitleStyle, fontSize: '20px' }}>Confirm Deposit</h2>

                <div style={balanceShowStyle}>
                  <div style={balanceItemStyle}>
                    <div style={balanceLabelStyle}>Deposit Amount</div>
                    <div style={balanceValueStyle}>₹ {parseFloat(amount).toFixed(2)}</div>
                  </div>
                  <div style={balanceItemStyle}>
                    <div style={balanceLabelStyle}>Method</div>
                    <div style={{ ...balanceValueStyle, fontSize: '16px', textTransform: 'capitalize' }}>
                      {method.replace(/_/g, ' ')}
                    </div>
                  </div>
                </div>

                {description && (
                  <div>
                    <div style={{ ...balanceLabelStyle, marginBottom: '8px' }}>Description</div>
                    <div style={{ ...pageTitleStyle, fontSize: '14px' }}>{description}</div>
                  </div>
                )}

                <div style={buttonsStyle}>
                  <Button
                    variant="secondary"
                    onClick={() => setStep('amount')}
                    fullWidth
                  >
                    {t('back')}
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    disabled={isLoading}
                    fullWidth
                  >
                    {isLoading ? t('loading') : t('confirm')}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {step === 'success' && (
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '56px' }}>✓</div>
                <h2 style={{ ...pageTitleStyle, color: theme.colors.success }}>Deposit Successful!</h2>
                <div style={{ ...balanceShowStyle, gridTemplateColumns: '1fr' }}>
                  <div style={balanceItemStyle}>
                    <div style={balanceLabelStyle}>Deposited Amount</div>
                    <div style={balanceValueStyle}>₹ {parseFloat(amount).toFixed(2)}</div>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: theme.colors.textMuted }}>
                  Reference: {transactions.length > 0 ? transactions[0].ref : 'TXN' + Math.random().toString().slice(2, 10)}
                </div>
                <Button fullWidth onClick={() => navigate('/dashboard')}>
                  {t('back')} {t('dashboard')}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deposit;
