import React, { createContext, useContext, useState, useEffect } from 'react';
import { darkTheme, lightTheme, Theme, ThemeMode } from '../theme';

interface ThemeContextType {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('vaultex-theme');
    return (saved as ThemeMode) || 'dark';
  });

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  const toggleTheme = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('vaultex-theme', newMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-base', theme.colors.base);
    root.style.setProperty('--bg-surface', theme.colors.surface);
    root.style.setProperty('--text-primary', theme.colors.textPrimary);
    root.style.setProperty('--text-muted', theme.colors.textMuted);
    root.style.setProperty('--border-color', theme.colors.border);
    root.style.setProperty('--accent-color', theme.colors.accent);
    
    document.body.style.backgroundColor = theme.colors.base;
    document.body.style.color = theme.colors.textPrimary;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
