import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as CustomThemeProvider, useTheme } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import AppRoutes from './routes';
import GlobalStyles from './assets/styles/GlobalStyles';
import ErrorBoundary from './ErrorBoundary';

// Simple test component
const TestComponent = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Movie App is Loading...</h1>
      <p>If you see this message, React is working correctly!</p>
    </div>
  );
};

// Wrapper component to use the theme hook
const ThemedApp = () => {
  const { theme } = useTheme();
  
  return (
    <ThemeProvider theme={theme}>
      <FavoritesProvider>
        <GlobalStyles />
        <ErrorBoundary>
          {/* <TestComponent /> */}
          <AppRoutes />
        </ErrorBoundary>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

/**
 * Main App component
 */
const App = () => {
  return (
    <BrowserRouter>
      <CustomThemeProvider>
        <ThemedApp />
      </CustomThemeProvider>
    </BrowserRouter>
  );
};

export default App; 