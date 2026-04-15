import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface TableProps {
  columns: { key: string; label: string; width?: string }[];
  data: any[];
  style?: React.CSSProperties;
}

export const Table = ({ columns, data, style = {} }: TableProps) => {
  const { theme } = useTheme();
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
    fontFamily: theme.font.body,
    ...style,
  };

  const headerCellStyle: React.CSSProperties = {
    padding: '12px 16px',
    textAlign: 'left',
    borderBottom: `1px solid ${theme.colors.border}`,
    color: theme.colors.textMuted,
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    backgroundColor: theme.colors.surfaceAlt,
  };

  const rowStyle: React.CSSProperties = {
    borderBottom: `1px solid ${theme.colors.border}`,
    transition: 'background-color 0.2s ease',
  };

  const cellStyle: React.CSSProperties = {
    padding: '16px',
    color: theme.colors.textPrimary,
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} style={{ ...headerCellStyle, width: col.width }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} style={rowStyle}>
            {columns.map((col) => (
              <td key={col.key} style={cellStyle}>
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
