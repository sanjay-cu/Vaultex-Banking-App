import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useTheme } from '../context/ThemeContext';
import { useAccount } from '../context/AccountContext';

const KYC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, setUser } = useAccount();
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    nationalId: '',
    occupation: '',
    incomeGroup: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const isRefresh = user?.kycStatus === 'completed';

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: theme.colors.base,
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const formCardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: theme.colors.surface,
    padding: '40px',
    borderRadius: theme.radius.lg,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.elevated,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 700,
    color: theme.colors.textPrimary,
    marginBottom: '8px',
    textAlign: 'center',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme.colors.textMuted,
    marginBottom: '32px',
    textAlign: 'center',
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    color: theme.colors.accent,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '16px',
    marginTop: '24px',
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: theme.colors.surfaceAlt,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    color: theme.colors.textPrimary,
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
    marginBottom: '16px',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: user?._id }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'KYC Update failed');

      // Update local user state
      if (user) {
        const updatedUser = { 
          ...user, 
          kycStatus: data.kycStatus as any,
          kycLastCompletedAt: data.kycLastCompletedAt 
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      window.alert('KYC Completed Successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formCardStyle}>
        <h1 style={titleStyle}>{isRefresh ? 'Refresh KYC' : 'Address & KYC'}</h1>
        <p style={subtitleStyle}>
          {isRefresh 
            ? 'Your KYC has expired (30 days policy). Please re-verify your details.' 
            : 'Please complete your identity verification'}
        </p>

        {error && <div style={{ color: theme.colors.danger, marginBottom: '16px', fontSize: '14px' }}>{error}</div>}
        <div style={{ color: theme.colors.textMuted, marginBottom: '16px', fontSize: '12px', textAlign: 'center' }}>
          Last Verified: {user?.kycLastCompletedAt ? new Date(user.kycLastCompletedAt).toLocaleDateString() : 'Never'}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={sectionLabelStyle}>Permanent Address</div>
          <Input
            label="Street Address"
            placeholder="123, Wealth Street"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
            <Input
              label="City"
              placeholder="Mumbai"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
            <Input
              label="State"
              placeholder="Maharashtra"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
            />
          </div>
          <Input
            label="ZIP Code"
            placeholder="400001"
            value={formData.zip}
            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            style={{ marginTop: '12px' }}
            required
          />

          <div style={sectionLabelStyle}>Identity Details</div>
          <Input
            label="National ID (PAN/Aadhar)"
            placeholder="ABCDE1234F"
            value={formData.nationalId}
            onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
            required
          />

          <div style={{ marginTop: '16px' }}>
            <label style={{ fontSize: '12px', color: theme.colors.textMuted, marginBottom: '6px', display: 'block' }}>Occupation</label>
            <select
              style={selectStyle}
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              required
            >
              <option value="">Select Occupation</option>
              <option value="software_engineer">Software Engineer</option>
              <option value="doctor">Doctor</option>
              <option value="business">Business</option>
              <option value="student">Student</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: theme.colors.textMuted, marginBottom: '6px', display: 'block' }}>Income Group (p.a.)</label>
            <select
              style={selectStyle}
              value={formData.incomeGroup}
              onChange={(e) => setFormData({ ...formData, incomeGroup: e.target.value })}
              required
            >
              <option value="">Select Income Group</option>
              <option value="under_5l">Under 5L</option>
              <option value="5l_10l">5L - 10L</option>
              <option value="10l_25l">10L - 25L</option>
              <option value="over_25l">Over 25L</option>
            </select>
          </div>

          <Button type="submit" fullWidth disabled={isLoading} style={{ marginTop: '24px' }}>
            {isLoading ? 'Saving...' : 'Complete KYC'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default KYC;
