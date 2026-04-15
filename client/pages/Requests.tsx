import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Table } from '../components/Table';
import { useTheme } from '../context/ThemeContext';
import { useAccount, formatCurrency } from '../context/AccountContext';
import Sidebar from '../components/Sidebar';

const Requests = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { moneyRequests, requestMoney } = useAccount();
  const [recipient, setRecipient] = useState('');
  const [phoneOrUpi, setPhoneOrUpi] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<'IDLE' | 'SENDING' | 'DELIVERED'>('IDLE');

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
    { key: 'from', label: 'From' },
    { key: 'phoneOrUpi', label: 'Phone / UPI' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Requested Date' },
    { key: 'status', label: 'Status' },
  ];

  const handleRequestMoney = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setDeliveryStatus('SENDING');
    const amt = parseFloat(amount);

    if (isNaN(amt) || amt <= 0) {
      setError('Please enter a valid amount');
      setDeliveryStatus('IDLE');
      return;
    }

    if (!recipient || !phoneOrUpi) {
      setError('Please fill in all recipient details');
      setDeliveryStatus('IDLE');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call and Notification sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      requestMoney({
        from: recipient,
        phoneOrUpi: phoneOrUpi,
        amount: amt,
      });

      setDeliveryStatus('DELIVERED');
      setSuccess(`Request for ${formatCurrency(amt)} sent and delivered to ${phoneOrUpi} (${recipient}) successfully!`);
      
      // Auto-reset status after 5 seconds
      setTimeout(() => {
        setSuccess('');
        setDeliveryStatus('IDLE');
      }, 5000);

      setRecipient('');
      setPhoneOrUpi('');
      setAmount('');
    } catch (err) {
      setError('Failed to send request. Please try again.');
      setDeliveryStatus('IDLE');
    } finally {
      setIsLoading(false);
    }
  };

  const tableData = moneyRequests.map(req => ({
    ...req,
    amount: formatCurrency(req.amount),
    status: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ 
          color: req.status === 'Pending' ? theme.colors.accent : theme.colors.success,
          fontWeight: 600,
          fontSize: '11px',
          padding: '4px 8px',
          backgroundColor: req.status === 'Pending' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(0, 255, 137, 0.1)',
          borderRadius: '4px'
        }}>
          {req.status}
        </span>
        <span style={{ fontSize: '10px', color: theme.colors.success }}>✓ Delivered</span>
      </div>
    )
  }));

  return (
    <div style={containerStyle}>
      <Sidebar />

      <div style={mainContentStyle}>
        <div style={pageHeaderStyle}>
          <h1 style={pageTitleStyle}>Money Requests</h1>
          <p style={{ color: theme.colors.textMuted }}>
            Send a secure payment request via SMS and UPI Notification
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
          {/* Recent Requests */}
          <div>
            <h3 style={{ marginBottom: '16px', fontWeight: 600 }}>Request History</h3>
            {moneyRequests.length === 0 ? (
              <Card style={{ padding: '48px', textAlign: 'center' }}>
                <p style={{ color: theme.colors.textMuted }}>You haven't made any money requests yet.</p>
              </Card>
            ) : (
              <Card>
                <Table columns={columns} data={tableData} />
              </Card>
            )}
          </div>

          {/* New Request Form */}
          <Card>
            <form onSubmit={handleRequestMoney} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600 }}>New Payment Request</h3>
              
              {deliveryStatus === 'SENDING' && (
                <div style={{ 
                  backgroundColor: 'rgba(0, 212, 255, 0.05)', 
                  color: theme.colors.accent, 
                  padding: '12px', 
                  borderRadius: theme.radius.md, 
                  fontSize: '13px', 
                  border: `1px solid ${theme.colors.accent}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div className="spinner" style={{ width: '14px', height: '14px', border: '2px solid transparent', borderTopColor: theme.colors.accent, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  Sending SMS & UPI Message...
                </div>
              )}

              {success && (
                <div style={{ 
                  backgroundColor: 'rgba(0, 255, 137, 0.1)', 
                  color: theme.colors.success, 
                  padding: '12px', 
                  borderRadius: theme.radius.md, 
                  fontSize: '13px', 
                  border: `1px solid ${theme.colors.success}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <div style={{ fontWeight: 600 }}>✓ Deliverd Successfully</div>
                  <div style={{ opacity: 0.8, fontSize: '12px' }}>{success}</div>
                </div>
              )}

              <Input 
                label="Recipient Full Name" 
                placeholder="e.g. John Smith" 
                value={recipient} 
                onChange={(e) => setRecipient(e.target.value)}
                required
              />

              <Input 
                label="Recipient Phone Number or UPI ID" 
                placeholder="e.g. +91 98765 43210 or user@upi" 
                value={phoneOrUpi} 
                onChange={(e) => setPhoneOrUpi(e.target.value)}
                required
              />

              <Input 
                label="Request Amount (INR)" 
                type="number" 
                placeholder="500" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                error={error}
                required
              />

              <Button type="submit" disabled={isLoading} fullWidth>
                {isLoading ? 'Processing...' : 'Send Payment Request'}
              </Button>
              
              <div style={{ marginTop: '12px', padding: '16px', backgroundColor: theme.colors.surfaceAlt, borderRadius: theme.radius.md, borderLeft: `4px solid ${theme.colors.accent}` }}>
                <p style={{ fontSize: '12px', color: theme.colors.textMuted, lineHeight: '1.6' }}>
                  <strong>Security Note:</strong> We use encrypted channels to send payment links. The recipient will receive a message with a vaulted checkout URL.
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Requests;
