// VAULTEX Banking System - Design System & Theme
export const theme = {
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
} as const;

export type Theme = typeof theme;
