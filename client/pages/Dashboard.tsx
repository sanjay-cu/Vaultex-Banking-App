import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { useTheme } from '../context/ThemeContext';
import { useAccount, formatCurrency } from '../context/AccountContext';
import { useLanguage } from '../context/LanguageContext';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { balance, transactions, user, setUser, downloadTransactions, systemCount, sampleId, isLoading } = useAccount();
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatIST = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return t('goodMorning');
    if (hour < 17) return t('goodAfternoon');
    return t('goodEvening');
  };

  if (!theme || !theme.colors) {
    return <div style={{ background: '#000', color: '#fff', height: '100vh', padding: '20px' }}>Initializing Theme...</div>;
  }

  if (isLoading && !user) {
    return <div style={{ background: theme.colors.base, color: theme.colors.textPrimary, height: '100vh', padding: '20px' }}>Loading account data...</div>;
  }

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: theme.colors.base,
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
  };

  const pageHeaderStyle: React.CSSProperties = {
    marginBottom: '32px',
  };

  const pageTitleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
    marginBottom: '8px',
  };

  const pageSubtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
  };

  const statsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '40px',
  };

  const statCardStyle: React.CSSProperties = {
    padding: '24px',
  };

  const statLabelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px',
  };

  const statValueStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    fontFamily: theme.font.number,
    color: theme.colors.accent,
    letterSpacing: '1px',
  };

  const contentGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '24px',
  };

  const transactionsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const transactionHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
  };

  const viewAllLinkStyle: React.CSSProperties = {
    color: theme.colors.accent,
    textDecoration: 'none',
    fontSize: '13px',
    fontFamily: theme.font.body,
    cursor: 'pointer',
  };

  const quickActionsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  let thisMonthIncome = 0;
  let thisMonthSpent = 0;
  
  if (Array.isArray(transactions)) {
    thisMonthIncome = transactions
      .filter((t: any) => t && t.type === 'Deposit')
      .reduce((acc: number, t: any) => acc + (t.numericAmount || 0), 0);
    
    thisMonthSpent = transactions
      .filter((t: any) => t && ['Withdrawal', 'Transfer', 'Bill Payment'].includes(t.type))
      .reduce((acc: number, t: any) => acc + (t.numericAmount || 0), 0);
  }

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'ref', label: 'Reference' },
    { key: 'type', label: 'Type' },
    { key: 'description', label: 'Description' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={{ padding: '40px' }}>
        <div style={pageHeaderStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '14px', color: theme.colors.accent, fontWeight: 500, marginBottom: '4px' }}>
                {getGreeting()},
              </div>
              <h1 style={pageTitleStyle}>{user?.fullName || 'Sanjay Choudhary'}</h1>
              <p style={pageSubtitleStyle}>
                User ID: {user?._id || 'None'} | Bank Total: {systemCount || 0}
              </p>
            </div>
            <div style={{ 
              textAlign: 'right', 
              padding: '12px 20px', 
              backgroundColor: theme.colors.surface, 
              borderRadius: theme.radius.md,
              border: `1px solid ${theme.colors.border}`,
              boxShadow: theme.shadow.sm
            }}>
              <div style={{ fontSize: '10px', color: theme.colors.textMuted, textTransform: 'uppercase', marginBottom: '4px' }}>IST Time</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: theme.colors.accent, fontFamily: theme.font.number }}>
                {formatIST(currentTime)}
              </div>
            </div>
          </div>
        </div>

        <div style={statsGridStyle}>
          <Card variant="stat" style={statCardStyle}>
            <div style={statLabelStyle}>{t('currentBalance')}</div>
            <div style={statValueStyle}>{formatCurrency(balance)}</div>
          </Card>
          <Card variant="stat" style={statCardStyle}>
            <div style={statLabelStyle}>{t('monthlyIncome')}</div>
            <div style={statValueStyle}>{formatCurrency(thisMonthIncome)}</div>
          </Card>
          <Card variant="stat" style={statCardStyle}>
            <div style={statLabelStyle}>{t('monthlySpent')}</div>
            <div style={statValueStyle}>{formatCurrency(thisMonthSpent)}</div>
          </Card>
          <Card variant="stat" style={statCardStyle}>
            <div style={statLabelStyle}>Pending</div>
            <div style={statValueStyle}>₹ 0.00</div>
          </Card>
        </div>

        <div style={contentGridStyle}>
          <div style={transactionsContainerStyle}>
            <div style={transactionHeaderStyle}>
              <h2 style={sectionTitleStyle}>{t('recentTransactions')}</h2>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <a style={viewAllLinkStyle} onClick={downloadTransactions}>
                  Download Statement ↓
                </a>
                <a style={viewAllLinkStyle} onClick={() => navigate('/transactions')}>
                  {t('viewAll')} →
                </a>
              </div>
            </div>
            <Card>
              <Table columns={columns} data={transactions} />
            </Card>
          </div>

          <div>
            <h3 style={{ ...sectionTitleStyle, marginBottom: '16px' }}>
              {t('quickActions')}
            </h3>
            <div style={quickActionsStyle}>
              <Button onClick={() => navigate('/deposit')} fullWidth style={{ fontSize: '13px', padding: '16px' }}>
                {t('deposit')}
              </Button>
              <Button onClick={() => navigate('/withdraw')} fullWidth style={{ fontSize: '13px', padding: '16px' }}>
                {t('withdraw')}
              </Button>
              <Button onClick={() => navigate('/transfer')} fullWidth style={{ fontSize: '13px', padding: '16px' }}>
                {t('transfer')}
              </Button>
              <Button onClick={() => navigate('/bills')} fullWidth style={{ fontSize: '13px', padding: '16px' }}>
                {t('bills')}
              </Button>
              <Button onClick={() => navigate('/requests')} variant="secondary" fullWidth style={{ fontSize: '13px', padding: '16px' }}>
                {t('requests')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
