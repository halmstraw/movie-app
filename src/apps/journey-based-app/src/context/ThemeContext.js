import React, { createContext, useState, useEffect, useCallback } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

// Theme options
const lightTheme = {
  name: 'light',
  colors: {
    background: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    primary: '#0070f3',
    secondary: '#ff4081',
    accent: '#f5f5f5',
    surface: '#ffffff',
    border: '#e0e0e0',
    error: '#f44336'
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 20px rgba(0, 0, 0, 0.15)'
  },
  transitions: {
    default: 'all 0.3s ease'
  }
};

const darkTheme = {
  name: 'dark',
  colors: {
    background: '#121212',
    text: '#e0e0e0',
    textSecondary: '#a0a0a0',
    primary: '#90caf9',
    secondary: '#f48fb1',
    accent: '#1e1e1e',
    surface: '#1e1e1e',
    border: '#333333',
    error: '#f44336'
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.2)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.2)',
    large: '0 10px 20px rgba(0, 0, 0, 0.3)'
  },
  transitions: {
    default: 'all 0.3s ease'
  }
};

// Create context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or default to 'light'
  const getInitialTheme = () => {
    try {
      const savedTheme = localStorage.getItem('journey_theme');
      return savedTheme === 'dark' ? 'dark' : 'light';
    } catch (error) {
      console.error('Error retrieving theme from localStorage:', error);
      return 'light';
    }
  };

  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('journey_theme', currentTheme);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [currentTheme]);

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setCurrentTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  // Set a specific theme
  const setTheme = useCallback((theme) => {
    if (theme === 'light' || theme === 'dark') {
      setCurrentTheme(theme);
    } else {
      console.error(`Theme "${theme}" is not available`);
    }
  }, []);

  // Get the current theme object
  const theme = currentTheme === 'dark' ? darkTheme : lightTheme;

  // Context value
  const value = {
    theme,
    currentTheme,
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 