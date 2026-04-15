import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: theme.colors.base,
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
  };

  const navItemStyle: React.CSSProperties = {
    padding: '12px 16px',
    marginBottom: '8px',
    borderRadius: theme.radius.md,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: theme.colors.textMuted,
    fontSize: '13px',
    fontFamily: theme.font.body,
  };

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '64px',
    marginBottom: '16px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 600,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
    lineHeight: '1.6',
  };

  return (
    <div style={containerStyle}>
      <Sidebar />

      {/* Main Content */}
      <div style={{ padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={contentStyle}>
          <div style={iconStyle}>🔨</div>
          <h1 style={titleStyle}>{title}</h1>
          <p style={descriptionStyle}>{description}</p>
          <Button onClick={() => navigate('/dashboard')} fullWidth>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
