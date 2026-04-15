import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { useTheme } from '../context/ThemeContext';
import { useAccount } from '../context/AccountContext';
import Sidebar from '../components/Sidebar';

const Notifications = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { transactions } = useAccount();

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

  const pageTitleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
  };

  const notificationCardStyle: React.CSSProperties = {
    padding: '20px',
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.border}`,
    marginBottom: '16px',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
  };

  const iconContainerStyle = (color: string): React.CSSProperties => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: `${color}15`,
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0,
  });

  const generateNotifications = () => {
    const alerts = [
      { id: '1', type: 'security', title: 'New Login Detected', body: 'A new login was detected from Mumbai, India (Chrome/macOS).', date: 'Just now', color: '#ffcc00', icon: '🔒' },
      { id: '2', type: 'system', title: 'System Maintenance', body: 'VaultEx will be undergoing scheduled maintenance on Sunday at 2:00 AM IST.', date: '2 hours ago', color: theme.colors.accent, icon: '⚙️' },
      { id: '3', type: 'promotion', title: 'FD Interest Rate Hiked', body: 'Great news! Fixed Deposit rates have been increased to 8.00% p.a. Open one today!', date: '6 hours ago', color: theme.colors.success, icon: '📈' },
    ];

    // Convert recent transactions into notifications
    const txAlerts = transactions.slice(0, 5).map((tx, idx) => ({
      id: `tx-${idx}`,
      type: 'transaction',
      title: `${tx.type} Successful`,
      body: `Your ${tx.description} of ${tx.amount} has been processed successfully.`,
      date: tx.date,
      color: tx.type === 'Deposit' ? theme.colors.success : theme.colors.accent,
      icon: tx.type === 'Deposit' ? '💰' : '💸'
    }));

    return [...alerts, ...txAlerts];
  };

  const notifications = generateNotifications();

  return (
    <div style={containerStyle}>
      <Sidebar />

      <div style={mainContentStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={pageTitleStyle}>Notifications</h1>
            <p style={{ color: theme.colors.textMuted, marginTop: '8px' }}>
              Stay updated with your latest account activity and bank alerts
            </p>
          </div>
          <span style={{ fontSize: '13px', color: theme.colors.accent, cursor: 'pointer', fontWeight: 600 }}>Mark all as read</span>
        </div>

        <div>
          <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: 600, color: theme.colors.textMuted }}>Recent Alerts</h3>
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              style={notificationCardStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={iconContainerStyle(notif.color)}>{notif.icon}</div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: theme.colors.textPrimary }}>{notif.title}</span>
                  <span style={{ fontSize: '11px', color: theme.colors.textMuted }}>{notif.date}</span>
                </div>
                <p style={{ fontSize: '13px', color: theme.colors.textMuted, lineHeight: '1.5' }}>{notif.body}</p>
              </div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: theme.colors.accent, marginTop: '6px' }} />
            </div>
          ))}
        </div>

        <Card style={{ padding: '32px', textAlign: 'center' }}>
          <p style={{ color: theme.colors.textMuted, fontSize: '14px' }}>No older notifications to display.</p>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;
