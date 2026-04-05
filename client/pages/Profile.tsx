import React from 'react';
import { Card } from '../components/Card';
import { theme } from '../theme';
import { useAccount } from '../context/AccountContext';
import Sidebar from '../components/Sidebar';
import { Button } from '../components/Button';

const Profile = () => {
  const { user } = useAccount();

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

  const profileHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    marginBottom: '8px',
  };

  const avatarStyle: React.CSSProperties = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: theme.colors.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    fontWeight: 800,
    color: '#000',
    boxShadow: `0 0 30px rgba(0, 212, 255, 0.2)`,
  };

  const profileTitleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: 'rgba(0, 255, 137, 0.1)',
    color: theme.colors.success,
    marginTop: '12px',
  };

  const sectionStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  };

  const infoRowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '20px',
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.border}`,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: theme.colors.textPrimary,
  };

  return (
    <div style={containerStyle}>
      <Sidebar />

      <div style={mainContentStyle}>
        <div style={profileHeaderStyle}>
          <div style={avatarStyle}>{user?.fullName?.charAt(0).toUpperCase() || 'U'}</div>
          <div>
            <h1 style={profileTitleStyle}>{user?.fullName}</h1>
            <div style={badgeStyle}>
              <span>✓ Verified Profile</span>
            </div>
            <p style={{ color: theme.colors.textMuted, marginTop: '16px', fontSize: '14px' }}>
              Account Number: <strong style={{ color: theme.colors.textPrimary }}>{user?.accountNumber}</strong>
            </p>
          </div>
        </div>

        <div style={sectionStyle}>
          {/* Identity Information */}
          <Card style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Identity Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={infoRowStyle}>
                <span style={labelStyle}>Full Name</span>
                <span style={valueStyle}>{user?.fullName}</span>
              </div>
              <div style={infoRowStyle}>
                <span style={labelStyle}>Email Address</span>
                <span style={valueStyle}>{user?.email}</span>
              </div>
              <div style={infoRowStyle}>
                <span style={labelStyle}>Phone Number</span>
                <span style={valueStyle}>+91 98765 43210</span>
              </div>
              <div style={infoRowStyle}>
                <span style={labelStyle}>Date of Birth</span>
                <span style={valueStyle}>12 Jan 1995</span>
              </div>
            </div>
          </Card>

          {/* KYC & Address */}
          <Card style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Address & KYC</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={infoRowStyle}>
                <span style={labelStyle}>Permanent Address</span>
                <span style={valueStyle}>123, Wealth Street, Financial District, Mumbai, India</span>
              </div>
              <div style={infoRowStyle}>
                <span style={labelStyle}>National ID (PAN/Aadhar)</span>
                <span style={valueStyle}>ABCDE1234F</span>
              </div>
              <div style={infoRowStyle}>
                <span style={labelStyle}>Occupation</span>
                <span style={valueStyle}>Software Engineer</span>
              </div>
              <div style={infoRowStyle}>
                <span style={labelStyle}>Income Group</span>
                <span style={valueStyle}>10L - 25L p.a.</span>
              </div>
            </div>
          </Card>
        </div>

        <Card style={{ padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Account Actions</h3>
            <p style={{ color: theme.colors.textMuted, marginTop: '4px', fontSize: '13px' }}>Manage your account security and data preferences.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary">Request Data Export</Button>
            <Button variant="primary">Edit Profile</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
