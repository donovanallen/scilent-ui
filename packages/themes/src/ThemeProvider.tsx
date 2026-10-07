import React, { createContext, useContext, useState } from 'react';
import { lightTheme } from './themes/light';
import type { Theme, ThemeContextValue } from './tokens/types';

// Create theme context with default values
const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  setTheme: () => {},
});

export interface ThemeProviderProps {
  /**
   * The initial theme to use
   * @default lightTheme
   */
  initialTheme?: Theme;

  /**
   * The children to render
   */
  children: React.ReactNode;
}

/**
 * Provider component for theme context
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  initialTheme = lightTheme,
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

/**
 * Hook to access the current theme and theme setter
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
