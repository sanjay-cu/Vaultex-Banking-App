import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAccount } from '../context/AccountContext';
import { Button } from './Button';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAccount();
  const { theme, mode, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  if (!theme || !theme.colors) return null;

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
          {t('dashboard')}
        </div>
        <div style={navItemStyle('/accounts')} onClick={() => navigate('/accounts')}>
          {t('accounts')}
        </div>
      </div>

      {/* Transactions */}
      <div style={navSectionStyle}>
        <div style={navSectionTitleStyle}>Transactions</div>
        <div style={navItemStyle('/deposit')} onClick={() => navigate('/deposit')}>
          {t('deposit')}
        </div>
        <div style={navItemStyle('/withdraw')} onClick={() => navigate('/withdraw')}>
          {t('withdraw')}
        </div>
        <div style={navItemStyle('/transfer')} onClick={() => navigate('/transfer')}>
          {t('transfer')}
        </div>
        <div style={navItemStyle('/bills')} onClick={() => navigate('/bills')}>
          {t('bills')}
        </div>
      </div>

      {/* Services */}
      <div style={navSectionStyle}>
        <div style={navSectionTitleStyle}>Services</div>
        <div style={navItemStyle('/cards')} onClick={() => navigate('/cards')}>
          {t('cards')}
        </div>
        <div style={navItemStyle('/requests')} onClick={() => navigate('/requests')}>
          {t('requests')}
        </div>
        <div style={navItemStyle('/fixed-deposit')} onClick={() => navigate('/fixed-deposit')}>
          {t('fixedDeposit')}
        </div>
      </div>

      {/* Account */}
      <div style={navSectionStyle}>
        <div style={navSectionTitleStyle}>Account</div>
        <div style={navItemStyle('/notifications')} onClick={() => navigate('/notifications')}>
          Notifications
        </div>
        <div style={navItemStyle('/profile')} onClick={() => navigate('/profile')}>
          {t('profile')}
        </div>
        <div style={navItemStyle('/settings')} onClick={() => navigate('/settings')}>
          {t('settings')}
        </div>
        <div style={navItemStyle('/support')} onClick={() => navigate('/support')}>
          {t('support')}
        </div>
      </div>

      {/* Language Switcher */}
      <div style={navSectionStyle}>
        <div style={navSectionTitleStyle}>Language</div>
        <div style={{ display: 'flex', gap: '8px', padding: '0 16px' }}>
          {['en', 'hi', 'mr'].map((lang) => (
            <div
              key={lang}
              onClick={() => setLanguage(lang as any)}
              style={{
                flex: 1,
                padding: '6px',
                textAlign: 'center',
                borderRadius: theme.radius.sm,
                fontSize: '11px',
                cursor: 'pointer',
                backgroundColor: language === lang ? theme.colors.accent : theme.colors.surfaceAlt,
                color: language === lang ? '#000' : theme.colors.textMuted,
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              {lang === 'en' ? 'EN' : lang === 'hi' ? 'HI' : 'MR'}
            </div>
          ))}
        </div>
      </div>

      {/* Profile Section */}
      <div style={profileSectionStyle}>
        <div style={profileAvatarStyle}>{user?.fullName?.charAt(0).toUpperCase() || 'U'}</div>
        <div style={profileNameStyle}>{user?.fullName || 'User'}</div>
        <div style={profileEmailStyle}>{user?.email || 'user@example.com'}</div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <Button
            variant="secondary"
            style={{ flex: 1, fontSize: '12px' }}
            onClick={handleLogout}
          >
            {t('logout')}
          </Button>
          <Button
            variant="secondary"
            onClick={toggleTheme}
            style={{ width: '40px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
