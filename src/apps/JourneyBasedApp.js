import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './journey-based-app/src/context/ThemeContext';
import { FavoritesProvider } from './journey-based-app/src/context/FavoritesContext';
import GlobalStyles from './journey-based-app/src/assets/styles/GlobalStyles';
import ErrorBoundary from './journey-based-app/src/ErrorBoundary';
import HomePage from './journey-based-app/src/pages/HomePage';
import SearchPage from './journey-based-app/src/pages/SearchPage';
import MovieDetailsPage from './journey-based-app/src/pages/MovieDetailsPage';
import FavoritesPage from './journey-based-app/src/pages/FavoritesPage';

const JourneyBasedApp = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <FavoritesProvider>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </FavoritesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default JourneyBasedApp; 