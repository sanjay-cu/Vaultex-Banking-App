import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { useTheme } from '../context/ThemeContext';
import { useAccount, formatCurrency } from '../context/AccountContext';
import Sidebar from '../components/Sidebar';

const Transactions = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { transactions, downloadTransactions } = useAccount();

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
    gap: '24px',
  };

  const pageHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  };

  const pageTitleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
  };

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

      <div style={mainContentStyle}>
        <div style={pageHeaderStyle}>
          <div>
            <h1 style={pageTitleStyle}>Transaction History</h1>
            <p style={{ color: theme.colors.textMuted, marginTop: '8px' }}>
              View and download your complete transaction history
            </p>
          </div>
          <Button onClick={downloadTransactions}>
            Download CSV Statement
          </Button>
        </div>

        <Card>
          <Table columns={columns} data={transactions} />
        </Card>
      </div>
    </div>
  );
};

export default Transactions;
