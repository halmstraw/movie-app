import React, { createContext, useState, useEffect, useCallback } from 'react';

// Theme options
const themes = {
  light: {
    name: 'light',
    colors: {
      background: '#ffffff',
      text: '#333333',
      primary: '#0070f3',
      secondary: '#ff4081',
      accent: '#f5f5f5',
      card: '#ffffff',
      border: '#e0e0e0'
    }
  },
  dark: {
    name: 'dark',
    colors: {
      background: '#121212',
      text: '#e0e0e0',
      primary: '#90caf9',
      secondary: '#f48fb1',
      accent: '#1e1e1e',
      card: '#1e1e1e',
      border: '#333333'
    }
  }
};

// Create context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or default to 'light'
  const getInitialTheme = () => {
    try {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme : 'light';
    } catch (error) {
      console.error('Error retrieving theme from localStorage:', error);
      return 'light';
    }
  };

  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('theme', currentTheme);
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
    if (themes[theme]) {
      setCurrentTheme(theme);
    } else {
      console.error(`Theme "${theme}" is not available`);
    }
  }, []);

  // Get the current theme object
  const theme = themes[currentTheme];

  // Context value
  const value = {
    theme,
    currentTheme,
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
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