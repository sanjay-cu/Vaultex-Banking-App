import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/Button";
import { theme } from "../theme";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: theme.colors.base,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '400px',
  };

  const numberStyle: React.CSSProperties = {
    fontSize: '72px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    color: theme.colors.accent,
  };

  const messageStyle: React.CSSProperties = {
    fontSize: '20px',
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
  };

  const descStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
    lineHeight: '1.6',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={numberStyle}>404</div>
        <h1 style={messageStyle}>Page Not Found</h1>
        <p style={descStyle}>
          The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
        </p>
        <Button onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
