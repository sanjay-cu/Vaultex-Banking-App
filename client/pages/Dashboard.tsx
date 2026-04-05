import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { theme } from '../theme';
import { useAccount, formatCurrency } from '../context/AccountContext';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const { balance, transactions, user, setUser, downloadTransactions } = useAccount();

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: theme.colors.base,
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
  };

  const profileEmailStyle: React.CSSProperties = {
    fontSize: '11px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
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

  const actionButtonStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const thisMonthIncome = transactions.filter((t) => t.type === 'Deposit').reduce((acc, t) => acc + t.numericAmount, 0);
  const thisMonthSpent = transactions.filter((t) => ['Withdrawal', 'Transfer', 'Bill Payment'].includes(t.type)).reduce((acc, t) => acc + t.numericAmount, 0);

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

      {/* Main Content */}
      <div style={{ padding: '40px' }}>
        {/* Page Header */}
        <div style={pageHeaderStyle}>
          <h1 style={pageTitleStyle}>Dashboard</h1>
          <p style={pageSubtitleStyle}>Welcome back, {user?.fullName || 'User'}. Here's your account overview.</p>
        </div>

        {/* Stats */}
        <div style={statsGridStyle}>
          <Card variant="stat" style={statCardStyle}>
            <div style={statLabelStyle}>Current Balance</div>
            <div style={statValueStyle}>{formatCurrency(balance)}</div>
          </Card>
          <Card variant="stat" style={statCardStyle}>
            <div style={statLabelStyle}>This Month Income</div>
            <div style={statValueStyle}>{formatCurrency(thisMonthIncome)}</div>
          </Card>
          <Card variant="stat" style={statCardStyle}>
            <div style={statLabelStyle}>This Month Spent</div>
            <div style={statValueStyle}>{formatCurrency(thisMonthSpent)}</div>
          </Card>
          <Card variant="stat" style={statCardStyle}>
            <div style={statLabelStyle}>Pending</div>
            <div style={statValueStyle}>₹ 0.00</div>
          </Card>
        </div>

        {/* Content Grid */}
        <div style={contentGridStyle}>
          {/* Transactions */}
          <div style={transactionsContainerStyle}>
            <div style={transactionHeaderStyle}>
              <h2 style={sectionTitleStyle}>Recent Transactions</h2>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <a style={viewAllLinkStyle} onClick={downloadTransactions}>
                  Download Statement ↓
                </a>
                <a style={viewAllLinkStyle} onClick={() => navigate('/transactions')}>
                  View All →
                </a>
              </div>
            </div>
            <Card>
              <Table columns={columns} data={transactions} />
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 style={{ ...sectionTitleStyle, marginBottom: '16px' }}>
              Quick Actions
            </h3>
            <div style={quickActionsStyle}>
              <Button
                onClick={() => navigate('/deposit')}
                fullWidth
                style={{ fontSize: '13px', padding: '16px' }}
              >
                Deposit
              </Button>
              <Button
                onClick={() => navigate('/withdraw')}
                fullWidth
                style={{ fontSize: '13px', padding: '16px' }}
              >
                Withdraw
              </Button>
              <Button
                onClick={() => navigate('/transfer')}
                fullWidth
                style={{ fontSize: '13px', padding: '16px' }}
              >
                Transfer
              </Button>
              <Button
                onClick={() => navigate('/bills')}
                fullWidth
                style={{ fontSize: '13px', padding: '16px' }}
              >
                Pay Bill
              </Button>
              <Button
                onClick={() => navigate('/requests')}
                variant="secondary"
                fullWidth
                style={{ fontSize: '13px', padding: '16px' }}
              >
                Request Money
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
