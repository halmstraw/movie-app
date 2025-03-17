import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

// Import components from the AI Prompt Generated app
import { ThemeProvider as CustomThemeProvider, useTheme } from './ai-prompt-generated/src/context/ThemeContext';
import { FavoritesProvider } from './ai-prompt-generated/src/context/FavoritesContext';
import HomePage from './ai-prompt-generated/src/pages/HomePage';
import SearchPage from './ai-prompt-generated/src/pages/SearchPage';
import MovieDetailPage from './ai-prompt-generated/src/pages/MovieDetailPage';
import FavoritesPage from './ai-prompt-generated/src/pages/FavoritesPage';
import NotFoundPage from './ai-prompt-generated/src/pages/NotFoundPage';
import GlobalStyles from './ai-prompt-generated/src/assets/styles/GlobalStyles';
import ErrorBoundary from './ai-prompt-generated/src/ErrorBoundary';

// Styled components for the app wrapper
const BackButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #0060df;
  }
`;

// Wrapper component to use the theme hook
const ThemedApp = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  return (
    <ThemeProvider theme={theme}>
      <FavoritesProvider>
        <GlobalStyles />
        <BackButton onClick={handleBackToHome}>
          ← Back to Implementations
        </BackButton>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

/**
 * AI Prompt Generated App component
 */
const AIPromptGeneratedApp = () => {
  return (
    <CustomThemeProvider>
      <ThemedApp />
    </CustomThemeProvider>
  );
};

export default AIPromptGeneratedApp; 