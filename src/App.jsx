import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import AppRoutes from './routes';
import GlobalStyles from './assets/styles/GlobalStyles';

/**
 * Main App component
 */
const App = () => {
  return (
    <BrowserRouter>
      <CustomThemeProvider>
        {({ theme }) => (
          <ThemeProvider theme={theme}>
            <FavoritesProvider>
              <GlobalStyles />
              <AppRoutes />
            </FavoritesProvider>
          </ThemeProvider>
        )}
      </CustomThemeProvider>
    </BrowserRouter>
  );
};

export default App; 