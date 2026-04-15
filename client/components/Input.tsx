import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  label,
  error,
  disabled = false,
  required = false,
  fullWidth = true,
  style = {},
}: InputProps) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 500,
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
  };

  const inputStyle: React.CSSProperties = {
    padding: '12px 16px',
    backgroundColor: theme.colors.surfaceAlt,
    border: `1px solid ${isFocused ? theme.colors.accent : theme.colors.border}`,
    borderRadius: theme.radius.md,
    color: theme.colors.textPrimary,
    fontSize: '14px',
    fontFamily: theme.font.body,
    transition: 'all 0.3s ease',
    outline: 'none',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    ...style,
  };

  const errorStyle: React.CSSProperties = {
    fontSize: '12px',
    color: theme.colors.danger,
    fontFamily: theme.font.body,
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && <span style={{ color: theme.colors.danger }}> *</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        style={inputStyle}
      />
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
};
