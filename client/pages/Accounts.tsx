import React from 'react';
import { Card } from '../components/Card';
import { theme } from '../theme';
import { useAccount, formatCurrency } from '../context/AccountContext';
import Sidebar from '../components/Sidebar';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Accounts = () => {
  const navigate = useNavigate();
  const { user, balance, downloadTransactions } = useAccount();

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

  const accountGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  };

  const infoRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 0',
    borderBottom: `1px solid ${theme.colors.border}`,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '13px',
    color: theme.colors.textMuted,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.colors.textPrimary,
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div style={containerStyle}>
      <Sidebar />

      <div style={mainContentStyle}>
        <div style={pageHeaderStyle}>
          <h1 style={pageTitleStyle}>My Accounts</h1>
          <p style={{ color: theme.colors.textMuted }}>
            Overview of your active bank accounts and balances
          </p>
        </div>

        <div style={accountGridStyle}>
          {/* Primary Savings Account */}
          <Card style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
              <div>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', color: theme.colors.accent, letterSpacing: '2px', fontWeight: 700 }}>Primary Account</span>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '8px' }}>Savings Plus</h2>
              </div>
              <div style={{ padding: '8px 12px', backgroundColor: 'rgba(0, 255, 137, 0.1)', color: theme.colors.success, borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Active</div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <span style={labelStyle}>Total Available Balance</span>
              <div style={{ fontSize: '36px', fontWeight: 800, color: theme.colors.textPrimary, marginTop: '8px' }}>
                {formatCurrency(balance)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Button onClick={downloadTransactions}>Download Statement</Button>
              <Button variant="secondary" onClick={() => navigate('/deposit')}>Add Funds</Button>
            </div>
          </Card>

          {/* Account Details */}
          <Card style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Account Details</h3>
            
            <div style={infoRowStyle}>
              <span style={labelStyle}>Account Number</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={valueStyle}>{user?.accountNumber || 'N/A'}</span>
                <span onClick={() => copyToClipboard(user?.accountNumber || '')} style={{ cursor: 'pointer', opacity: 0.6 }}>📋</span>
              </div>
            </div>

            <div style={infoRowStyle}>
              <span style={labelStyle}>Account Holder</span>
              <span style={valueStyle}>{user?.fullName}</span>
            </div>

            <div style={infoRowStyle}>
              <span style={labelStyle}>Account Type</span>
              <span style={valueStyle}>Savings Account</span>
            </div>

            <div style={infoRowStyle}>
              <span style={labelStyle}>Branch</span>
              <span style={valueStyle}>VaultEx Digital Hub, MB</span>
            </div>

            <div style={infoRowStyle}>
              <span style={labelStyle}>IFSC Code</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={valueStyle}>VLTX0001234</span>
                <span onClick={() => copyToClipboard('VLTX0001234')} style={{ cursor: 'pointer', opacity: 0.6 }}>📋</span>
              </div>
            </div>

            <div style={infoRowStyle}>
              <span style={labelStyle}>Interest Rate</span>
              <span style={{ ...valueStyle, color: theme.colors.success }}>4.50% p.a.</span>
            </div>
          </Card>
        </div>

        {/* Account Analytics Mock */}
        <Card style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Account Performance</h3>
          <p style={{ color: theme.colors.textMuted, fontSize: '13px' }}>Your interest earned this month: <strong style={{ color: theme.colors.success }}>₹ 1,240.50</strong></p>
          <div style={{ marginTop: '24px', height: '100px', width: '100%', backgroundColor: theme.colors.surfaceAlt, borderRadius: theme.radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px dashed ${theme.colors.border}` }}>
            <span style={{ color: theme.colors.textMuted, fontSize: '12px' }}>Interest earnings chart coming soon</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Accounts;
