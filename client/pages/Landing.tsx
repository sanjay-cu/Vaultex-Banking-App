import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { theme } from '../theme';

const Landing = () => {
  const navigate = useNavigate();

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: theme.colors.base,
    color: theme.colors.textPrimary,
  };

  const navbarStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 60px',
    borderBottom: `1px solid ${theme.colors.border}`,
  };

  const logoStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    color: theme.colors.accent,
  };

  const navButtonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
  };

  const heroSectionStyle: React.CSSProperties = {
    padding: '80px 60px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.colors.border}`,
  };

  const heroTextStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '52px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    lineHeight: '1.2',
    color: theme.colors.textPrimary,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '18px',
    color: theme.colors.textMuted,
    lineHeight: '1.6',
    fontFamily: theme.font.body,
  };

  const ctaButtonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
  };

  const heroImageStyle: React.CSSProperties = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    border: `1px solid ${theme.colors.border}`,
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  };

  const cardPreviewStyle: React.CSSProperties = {
    width: '300px',
    height: '200px',
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.lg,
    border: `2px solid ${theme.colors.accent}`,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: theme.shadow.elevated,
  };

  const cardNumberStyle: React.CSSProperties = {
    fontSize: '24px',
    fontFamily: theme.font.number,
    color: theme.colors.accent,
    letterSpacing: '2px',
  };

  const cardNameStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
    textTransform: 'uppercase',
  };

  const featuresStyle: React.CSSProperties = {
    padding: '80px 60px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
    borderBottom: `1px solid ${theme.colors.border}`,
  };

  const featureCardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const featureIconStyle: React.CSSProperties = {
    width: '60px',
    height: '60px',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
  };

  const featureTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
  };

  const featureDescStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme.colors.textMuted,
    lineHeight: '1.6',
    fontFamily: theme.font.body,
  };

  const ctaSectionStyle: React.CSSProperties = {
    padding: '80px 60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
    textAlign: 'center',
  };

  const ctaTitleStyle: React.CSSProperties = {
    fontSize: '40px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
  };

  const ctaSubtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    color: theme.colors.textMuted,
    maxWidth: '500px',
    lineHeight: '1.6',
    fontFamily: theme.font.body,
  };

  const footerStyle: React.CSSProperties = {
    padding: '40px 60px',
    borderTop: `1px solid ${theme.colors.border}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const footerLinksStyle: React.CSSProperties = {
    display: 'flex',
    gap: '40px',
  };

  const footerLinkStyle: React.CSSProperties = {
    color: theme.colors.textMuted,
    textDecoration: 'none',
    fontSize: '13px',
    fontFamily: theme.font.body,
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      {/* Navbar */}
      <nav style={navbarStyle}>
        <div style={logoStyle}>VAULTEX</div>
        <div style={navButtonsStyle}>
          <Button variant="secondary" onClick={() => navigate('/login')}>
            Sign In
          </Button>
          <Button onClick={() => navigate('/register')}>
            Open Account
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <div style={heroTextStyle}>
          <h1 style={headingStyle}>Banking Redefined</h1>
          <p style={subtitleStyle}>
            Experience modern banking with VAULTEX. Secure, fast, and transparent financial
            services designed for India.
          </p>
          <div style={ctaButtonsStyle}>
            <Button onClick={() => navigate('/register')} style={{ flex: 1 }} fullWidth>
              Open Account Now
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/login')}
              style={{ flex: 1 }}
              fullWidth
            >
              Login
            </Button>
          </div>
        </div>
        <div style={heroImageStyle}>
          <div style={cardPreviewStyle}>
            <div>
              <div style={cardNumberStyle}>•••• •••• •••• 4242</div>
            </div>
            <div>
              <div style={cardNameStyle}>Cardholder Name</div>
              <div style={{ ...cardNameStyle, marginTop: '4px' }}>12/28</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={featuresStyle}>
        <div style={featureCardStyle}>
          <div style={featureIconStyle}>🔒</div>
          <h3 style={featureTitleStyle}>Bank-Grade Security</h3>
          <p style={featureDescStyle}>Your money is protected with military-grade encryption and
            multi-layer security protocols.</p>
        </div>
        <div style={featureCardStyle}>
          <div style={featureIconStyle}>⚡</div>
          <h3 style={featureTitleStyle}>Instant Transfers</h3>
          <p style={featureDescStyle}>Send and receive money in seconds. Domestic and international
            transfers at competitive rates.</p>
        </div>
        <div style={featureCardStyle}>
          <div style={featureIconStyle}>📱</div>
          <h3 style={featureTitleStyle}>24/7 Access</h3>
          <p style={featureDescStyle}>Manage your accounts anytime, anywhere. Full banking at your
            fingertips.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section style={ctaSectionStyle}>
        <h2 style={ctaTitleStyle}>Ready to Join?</h2>
        <p style={ctaSubtitleStyle}>
          Join thousands of customers already banking with VAULTEX. Open your account in minutes.
        </p>
        <Button onClick={() => navigate('/register')} style={{ minWidth: '200px' }}>
          Get Started
        </Button>
      </section>

      {/* Footer */}
      <footer style={footerStyle}>
        <div style={logoStyle}>VAULTEX</div>
        <div style={footerLinksStyle}>
          <a style={footerLinkStyle}>Privacy Policy</a>
          <a style={footerLinkStyle}>Terms of Service</a>
          <a style={footerLinkStyle}>Contact Support</a>
        </div>
        <div style={{ color: theme.colors.textMuted, fontSize: '12px' }}>
          © 2024 VAULTEX. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
