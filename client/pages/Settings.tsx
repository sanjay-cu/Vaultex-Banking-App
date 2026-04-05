import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { theme } from '../theme';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('English');

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

  const sectionHeaderStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const toggleContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: `1px solid ${theme.colors.border}`,
  };

  const toggleDescriptionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  return (
    <div style={containerStyle}>
      <Sidebar />

      <div style={mainContentStyle}>
        <div>
          <h1 style={pageTitleStyle}>Settings</h1>
          <p style={{ color: theme.colors.textMuted, marginTop: '8px' }}>
            Manage your account preferences, security, and notification settings
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Security Settings */}
          <Card style={{ padding: '32px' }}>
            <h3 style={sectionHeaderStyle}>🔐 Security & Authentication</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '13px', color: theme.colors.textMuted }}>Update Transaction PIN</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Input type="password" placeholder="Old PIN" style={{ width: '120px' }} />
                  <Input type="password" placeholder="New PIN" style={{ width: '120px' }} />
                  <Button variant="secondary">Update</Button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '13px', color: theme.colors.textMuted }}>Update Password</label>
                <Input type="password" placeholder="Current Password" />
                <Input type="password" placeholder="New Password" />
                <Button>Change Password</Button>
              </div>
              <div style={{ padding: '12px', backgroundColor: 'rgba(0, 255, 137, 0.05)', borderRadius: '8px', border: `1px solid ${theme.colors.success}`, fontSize: '12px', color: theme.colors.success }}>
                ✓ Two-Factor Authentication (2FA) is enabled for your account.
              </div>
            </div>
          </Card>

          {/* Preferences Settings */}
          <Card style={{ padding: '32px' }}>
            <h3 style={sectionHeaderStyle}>⚙️ Preferences</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={toggleContainerStyle}>
                <div style={toggleDescriptionStyle}>
                  <span style={{ fontWeight: 600 }}>Email Alerts</span>
                  <span style={{ fontSize: '12px', color: theme.colors.textMuted }}>Receive emails for every transaction.</span>
                </div>
                <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
              </div>

              <div style={toggleContainerStyle}>
                <div style={toggleDescriptionStyle}>
                  <span style={{ fontWeight: 600 }}>SMS Notifications</span>
                  <span style={{ fontSize: '12px', color: theme.colors.textMuted }}>Receive instant SMS for account activity.</span>
                </div>
                <input type="checkbox" checked={smsNotifications} onChange={(e) => setSmsNotifications(e.target.checked)} />
              </div>

              <div style={toggleContainerStyle}>
                <div style={toggleDescriptionStyle}>
                  <span style={{ fontWeight: 600 }}>Dark Appearance</span>
                  <span style={{ fontSize: '12px', color: theme.colors.textMuted }}>Toggle white and dark mode.</span>
                </div>
                <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
              </div>

              <div style={{ ...toggleContainerStyle, borderBottom: 'none', marginTop: '12px' }}>
                <div style={toggleDescriptionStyle}>
                  <span style={{ fontWeight: 600 }}>Preferred Language</span>
                </div>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{ backgroundColor: theme.colors.surfaceAlt, color: '#fff', border: `1px solid ${theme.colors.border}`, padding: '4px 8px', borderRadius: '4px' }}
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        <Card style={{ padding: '24px', backgroundColor: 'rgba(255, 68, 68, 0.05)', border: '1px solid rgba(255, 68, 68, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ff4444' }}>Danger Zone</h3>
              <p style={{ fontSize: '13px', color: theme.colors.textMuted }}>Delete your account and all associated data permanently.</p>
            </div>
            <Button variant="secondary" style={{ color: '#ff4444', borderColor: '#ff4444' }}>Delete Account</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
