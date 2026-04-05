import React, { useState } from 'react';
import { theme } from '../theme';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'stat' | 'elevated';
}

export const Card = ({ children, variant = 'default', style = {}, onClick, ...props }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: '20px',
    border: `1px solid ${theme.colors.border}`,
    transition: 'all 0.3s ease',
    cursor: onClick ? 'pointer' : 'default',
    transform: isHovered && onClick ? 'translateY(-4px)' : 'none',
    boxShadow: isHovered && onClick ? theme.shadow.elevated : theme.shadow.card,
    ...style,
  };

  const variantStyles = {
    default: {
      boxShadow: theme.shadow.card,
    },
    stat: {
      borderLeft: `4px solid ${theme.colors.accent}`,
      boxShadow: theme.shadow.card,
    },
    elevated: {
      boxShadow: theme.shadow.elevated,
    },
  };

  return (
    <div 
      style={{ ...baseStyle, ...variantStyles[variant] }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
};
