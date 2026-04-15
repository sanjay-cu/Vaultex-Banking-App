import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  fullWidth = false,
  style = {},
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: theme.radius.md,
    border: 'none',
    fontSize: '14px',
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: theme.font.body,
    transition: 'all 0.3s ease',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const variantStyles = {
    primary: {
      backgroundColor: isHovered && !disabled ? theme.colors.accentHover : theme.colors.accent,
      color: '#000',
      border: `1px solid ${theme.colors.accent}`,
    },
    secondary: {
      backgroundColor: 'transparent',
      color: theme.colors.accent,
      border: `1px solid ${theme.colors.accent}`,
    },
    danger: {
      backgroundColor: isHovered && !disabled ? '#dc2626' : theme.colors.danger,
      color: '#fff',
      border: `1px solid ${theme.colors.danger}`,
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      style={{
        ...baseStyle,
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
