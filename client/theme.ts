// VAULTEX Banking System - Design System & Theme
export type ThemeMode = 'dark' | 'light';

export interface ThemeColors {
  base: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  accent: string;
  accentHover: string;
  textPrimary: string;
  textMuted: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
}

export interface Theme {
  colors: ThemeColors;
  font: {
    heading: string;
    body: string;
    number: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadow: {
    sm: string;
    md: string;
    card: string;
    elevated: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
}

export const darkTheme: Theme = {
  colors: {
    base: '#0D0F14',
    surface: '#161A22',
    surfaceAlt: '#1C2130',
    border: '#252B35',
    accent: '#C9A84C',
    accentHover: '#B8922F',
    textPrimary: '#E8EAF0',
    textMuted: '#6B7280',
    success: '#22C55E',
    danger: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },
  font: {
    heading: "'DM Serif Display', Georgia, serif",
    body: "'DM Mono', monospace",
    number: "'DM Mono', monospace",
  },
  radius: {
    sm: '3px',
    md: '6px',
    lg: '10px',
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.2)',
    md: '0 4px 6px -1px rgba(0,0,0,0.3)',
    card: '0 1px 3px rgba(0,0,0,0.4)',
    elevated: '0 8px 24px rgba(0,0,0,0.6)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
    xxl: '64px',
  },
};

export const lightTheme: Theme = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    base: '#F9FAFB',
    surface: '#FFFFFF',
    surfaceAlt: '#F3F4F6',
    border: '#E5E7EB',
    textPrimary: '#111827',
    textMuted: '#6B7280',
    accent: '#B8922F',
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1)',
    card: '0 1px 3px rgba(0,0,0,0.1)',
    elevated: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
  },
};

export const theme = darkTheme;
