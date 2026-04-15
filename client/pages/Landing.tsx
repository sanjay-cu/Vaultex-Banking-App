import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Landing = () => {
  const { theme, mode, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatIST = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });
  };

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

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
    boxShadow: `0 0 20px ${theme.colors.accent}33`, // Subtle gold glow
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
      <header style={navbarStyle}>
        <div style={logoStyle} id="site-logo">VAULTEX</div>
        <div style={navButtonsStyle}>
          <Button 
            variant="secondary" 
            onClick={toggleTheme}
            style={{ width: '40px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            id="theme-toggle"
          >
            {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <div style={{ display: 'flex', backgroundColor: theme.colors.surfaceAlt, borderRadius: theme.radius.md, padding: '4px' }}>
            {['en', 'hi', 'mr'].map((lang) => (
              <div
                key={lang}
                onClick={() => setLanguage(lang as any)}
                style={{
                  padding: '6px 10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: '4px',
                  backgroundColor: language === lang ? theme.colors.accent : 'transparent',
                  color: language === lang ? '#000' : theme.colors.textMuted,
                  transition: 'all 0.3s ease'
                }}
              >
                {lang.toUpperCase()}
              </div>
            ))}
          </div>

          <Button id="nav-signin-btn" variant="secondary" onClick={() => navigate('/login')}>
            {t('login')}
          </Button>
          <Button id="nav-register-btn" onClick={() => navigate('/register')}>
            {t('openAccount')}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <div style={heroTextStyle}>
          <div style={{ color: theme.colors.accent, fontWeight: 600, fontSize: '16px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {getGreeting()}, welcome to
          </div>
          <h1 style={headingStyle} id="hero-heading">{t('bankingRedefined')}</h1>
          <p style={subtitleStyle}>
            {t('heroSubtitle')}
          </p>
          <div style={ctaButtonsStyle}>
            <Button id="hero-cta-register" onClick={() => navigate('/register')} style={{ flex: 1 }} fullWidth>
              {t('openAccount')}
            </Button>
            <Button
              id="hero-cta-login"
              variant="secondary"
              onClick={() => navigate('/login')}
              style={{ flex: 1 }}
              fullWidth
            >
              {t('login')}
            </Button>
          </div>
        </div>
        <div style={heroImageStyle}>
          {/* Dynamic Dashboard Preview */}
          <div style={{
            width: '85%',
            height: '90%',
            backgroundColor: '#0D0F14',
            borderRadius: '24px',
            border: '8px solid #1A1D23',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: theme.font.body
          }}>
            {/* Status Bar */}
            <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
              <span>{formatIST(time)}</span>
              <div style={{ display: 'flex', gap: '6px' }}>📶 🔋</div>
            </div>

            {/* Header */}
            <div style={{ padding: '0 20px 20px' }}>
              <div style={{ fontSize: '12px', color: theme.colors.accent, fontWeight: 500 }}>{getGreeting()},</div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#fff' }}>Vaultex</div>
            </div>

            {/* Cards Scroll */}
            <div style={{ padding: '0 20px', display: 'flex', gap: '12px', overflow: 'hidden' }}>
              <div style={{ 
                minWidth: '220px', 
                height: '130px', 
                background: 'linear-gradient(135deg, #D4AF37, #AA8419)', 
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: '#000'
              }}>
                <div style={{ fontSize: '10px', fontWeight: 600 }}>PREMIER ELITE</div>
                <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '2px' }}>**** 8824</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                   <div style={{ fontSize: '12px', fontWeight: 600 }}>$ 824,738.85</div>
                   <div style={{ fontSize: '14px', fontWeight: 800 }}>VISA</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {['Send', 'Receive', 'Pay', 'More'].map(action => (
                <div key={action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: '#1A1D23', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                    {action === 'Send' ? '↗️' : action === 'Receive' ? '↙️' : action === 'Pay' ? '🧾' : '⋯'}
                  </div>
                  <span style={{ fontSize: '10px', color: '#999' }}>{action}</span>
                </div>
              ))}
            </div>

            {/* Transactions */}
            <div style={{ flex: 1, backgroundColor: '#13161B', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '20px' }}>
               <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '15px' }}>Recent Activity</div>
               {[
                 { label: 'Apple Store', amount: '-$ 1,499.00', icon: '🍎' },
                 { label: 'Salary Reward', amount: '+$ 15,500.00', icon: '💰' }
               ].map((t, i) => (
                 <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <div style={{ width: '32px', height: '32px', backgroundColor: '#1A1D23', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.icon}</div>
                     <span style={{ fontSize: '12px', color: '#ccc' }}>{t.label}</span>
                   </div>
                   <span style={{ fontSize: '12px', color: t.amount.startsWith('+') ? '#4CAF50' : '#fff', fontWeight: 500 }}>{t.amount}</span>
                 </div>
               ))}
            </div>
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '20px',
            padding: '10px 20px',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            color: '#D4AF37',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            fontSize: '12px',
            fontWeight: 500,
            zIndex: 10
          }}>
            ✨ Smart Banking Interface
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={logoStyle}>VAULTEX</div>
          <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>
            Developed by: <span style={{ color: theme.colors.accent, fontWeight: 600 }}>Sanjay Choudhary</span>
          </div>
          <div style={{ fontSize: '11px', color: theme.colors.textMuted }}>
            Email: <a href="mailto:sanjayjatchoudhary0@gmail.com" style={{ color: theme.colors.textMuted, textDecoration: 'none' }}>sanjayjatchoudhary0@gmail.com</a>
          </div>
        </div>
        <div style={footerLinksStyle}>
          <a style={footerLinkStyle} href="#">Privacy Policy</a>
          <a style={footerLinkStyle} href="#">Terms of Service</a>
          <a style={footerLinkStyle} href="#">Contact Support</a>
        </div>
        <div style={{ color: theme.colors.textMuted, fontSize: '12px', textAlign: 'right' }}>
          © 2024 VAULTEX. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
