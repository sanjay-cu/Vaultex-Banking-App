import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { theme } from '../theme';
import { useAccount } from '../context/AccountContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAccount();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: theme.colors.base,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  };

  const leftPanelStyle: React.CSSProperties = {
    backgroundColor: theme.colors.surface,
    padding: '60px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '40px',
    borderRight: `1px solid ${theme.colors.border}`,
  };

  const logoStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    color: theme.colors.accent,
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '36px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
    lineHeight: '1.3',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    color: theme.colors.textMuted,
    lineHeight: '1.6',
    fontFamily: theme.font.body,
  };

  const rightPanelStyle: React.CSSProperties = {
    padding: '60px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '24px',
  };

  const formContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const formTitleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 600,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
  };

  const formDescStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
  };

  const fieldsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const checkboxStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
  };

  const forgotPasswordStyle: React.CSSProperties = {
    color: theme.colors.accent,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  };

  const signupLinkStyle: React.CSSProperties = {
    textAlign: 'center' as const,
    fontSize: '14px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
  };

  const linkStyle: React.CSSProperties = {
    color: theme.colors.accent,
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const errorStyle: React.CSSProperties = {
    padding: '12px',
    backgroundColor: '#7f1d1d',
    border: `1px solid ${theme.colors.danger}`,
    borderRadius: theme.radius.md,
    color: '#fecaca',
    fontSize: '13px',
    fontFamily: theme.font.body,
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store in context and localStorage
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Left Panel */}
      <div style={leftPanelStyle}>
        <div style={logoStyle}>VAULTEX</div>
        <div>
          <h1 style={headingStyle}>Welcome Back</h1>
          <p style={subtitleStyle}>
            Secure access to your banking portal. Enter your credentials to continue.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div style={rightPanelStyle}>
        <div style={formContainerStyle}>
          <h2 style={formTitleStyle}>Sign In</h2>
          <p style={formDescStyle}>Access your VAULTEX account</p>

          {error && <div style={errorStyle}>{error}</div>}

          <form onSubmit={handleLogin} style={fieldsStyle}>
            <Input
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div style={checkboxStyle}>
              <input type="checkbox" id="remember" style={{ cursor: 'pointer' }} />
              <label htmlFor="remember" style={{ cursor: 'pointer' }}>
                Remember me
              </label>
            </div>

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div
            style={{
              ...forgotPasswordStyle,
              textAlign: 'center',
            }}
            onClick={() => {
              // TODO: Implement forgot password flow
            }}
          >
            Forgot your password?
          </div>

          <div style={signupLinkStyle}>
            Don't have an account?{' '}
            <span style={linkStyle} onClick={() => navigate('/register')}>
              Create one
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
