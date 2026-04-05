import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '../theme';
import { Button } from './Button';
import { useAccount } from '../context/AccountContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAccount();

  const sidebarStyle: React.CSSProperties = {
    backgroundColor: theme.colors.surface,
    borderRight: `1px solid ${theme.colors.border}`,
    padding: '24px',
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const logoBrandStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    color: theme.colors.accent,
    marginBottom: '32px',
    cursor: 'pointer',
  };

  const navItemStyle = (path: string): React.CSSProperties => {
    const isActive = location.pathname === path;
    return {
      padding: '12px 16px',
      marginBottom: '8px',
      borderRadius: theme.radius.md,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: isActive ? theme.colors.surfaceAlt : 'transparent',
      borderLeft: isActive ? `3px solid ${theme.colors.accent}` : 'none',
      paddingLeft: isActive ? '13px' : '16px',
      color: isActive ? theme.colors.accent : theme.colors.textMuted,
      fontSize: '13px',
      fontFamily: theme.font.body,
    };
  };

  const navSectionStyle: React.CSSProperties = {
    marginBottom: '32px',
  };

  const navSectionTitleStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 600,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '12px',
    paddingLeft: '16px',
    fontFamily: theme.font.body,
  };

  const profileSectionStyle: React.CSSProperties = {
    borderTop: `1px solid ${theme.colors.border}`,
    paddingTop: '24px',
    marginTop: 'auto',
  };

  const profileAvatarStyle: React.CSSProperties = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: theme.colors.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontWeight: 700,
    marginBottom: '12px',
    fontSize: '20px',
  };

  const profileNameStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 600,
    color: theme.colors.textPrimary,
    marginBottom: '4px',
    fontFamily: theme.font.body,
  };

  const profileEmailStyle: React.CSSProperties = {
    fontSize: '11px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div style={sidebarStyle}>
      <div style={logoBrandStyle} onClick={() => navigate('/dashboard')}>VAULTEX</div>

      {/* Main Navigation */}
      <div style={navSectionStyle}>
        <div style={navSectionTitleStyle}>Main</div>
        <div style={navItemStyle('/dashboard')} onClick={() => navigate('/dashboard')}>
          Dashboard
        </div>
        <div style={navItemStyle('/accounts')} onClick={() => navigate('/accounts')}>
          Accounts
        </div>
      </div>

      {/* Transactions */}
      <div style={navSectionStyle}>
        <div style={navSectionTitleStyle}>Transactions</div>
        <div style={navItemStyle('/deposit')} onClick={() => navigate('/deposit')}>
          Deposit
        </div>
        <div style={navItemStyle('/withdraw')} onClick={() => navigate('/withdraw')}>
          Withdraw
        </div>
        <div style={navItemStyle('/transfer')} onClick={() => navigate('/transfer')}>
          Transfer
        </div>
        <div style={navItemStyle('/bills')} onClick={() => navigate('/bills')}>
          Bill Payment
        </div>
      </div>

      {/* Services */}
      <div style={navSectionStyle}>
        <div style={navSectionTitleStyle}>Services</div>
        <div style={navItemStyle('/cards')} onClick={() => navigate('/cards')}>
          Cards
        </div>
        <div style={navItemStyle('/requests')} onClick={() => navigate('/requests')}>
          Requests
        </div>
        <div style={navItemStyle('/fixed-deposit')} onClick={() => navigate('/fixed-deposit')}>
          Fixed Deposit
        </div>
      </div>

      {/* Account */}
      <div style={navSectionStyle}>
        <div style={navSectionTitleStyle}>Account</div>
        <div style={navItemStyle('/notifications')} onClick={() => navigate('/notifications')}>
          Notifications
        </div>
        <div style={navItemStyle('/profile')} onClick={() => navigate('/profile')}>
          Profile
        </div>
        <div style={navItemStyle('/settings')} onClick={() => navigate('/settings')}>
          Settings
        </div>
        <div style={navItemStyle('/support')} onClick={() => navigate('/support')}>
          Support
        </div>
      </div>

      {/* Profile Section */}
      <div style={profileSectionStyle}>
        <div style={profileAvatarStyle}>{user?.fullName?.charAt(0).toUpperCase() || 'U'}</div>
        <div style={profileNameStyle}>{user?.fullName || 'User'}</div>
        <div style={profileEmailStyle}>{user?.email || 'user@example.com'}</div>
        <Button
          variant="secondary"
          fullWidth
          style={{ marginTop: '16px', fontSize: '12px' }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
