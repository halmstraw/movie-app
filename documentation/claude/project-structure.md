# Project Structure for AI Movie App

```
ai-movie-app/
├── .github/                      # GitHub related files
│   └── workflows/                # GitHub Actions workflows
│       └── main.yml              # CI/CD pipeline configuration
├── public/                       # Public assets
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/                          # Source code
│   ├── api/                      # API integration
│   │   ├── index.js              # API exports
│   │   ├── movieApi.js           # Movie API service
│   │   └── config.js             # API configuration
│   ├── assets/                   # Static assets
│   │   ├── images/               # Image files
│   │   └── styles/               # Global styles
│   ├── components/               # Reusable components
│   │   ├── common/               # Shared UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── MainLayout.jsx
│   │   └── movie/                # Movie-specific components
│   │       ├── MovieCard.jsx
│   │       ├── MovieList.jsx
│   │       ├── MovieDetails.jsx
│   │       └── FavoriteButton.jsx
│   ├── hooks/                    # Custom React hooks
│   │   ├── useMovieSearch.js
│   │   └── useFavorites.js
│   ├── pages/                    # Page components
│   │   ├── HomePage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── MovieDetailPage.jsx
│   │   ├── FavoritesPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── context/                  # React context providers
│   │   ├── FavoritesContext.jsx
│   │   └── ThemeContext.jsx
│   ├── utils/                    # Utility functions
│   │   ├── localStorage.js
│   │   └── formatters.js
│   ├── App.jsx                   # Main App component
│   ├── index.jsx                 # Entry point
│   └── routes.jsx                # Route definitions
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file
├── package.json                  # Project dependencies
├── README.md                     # Project documentation
└── LICENSE                       # License file
```

This structure follows React best practices with a clear separation of concerns:

- **Components**: Organized by domain and responsibility
- **API Layer**: Centralized API communication
- **Pages**: Container components for routes
- **Context**: State management for cross-component sharing
- **Hooks**: Reusable logic

This architecture supports:
1. Scalability as the application grows
2. Reusability of components
3. Maintainability through clear organization
4. Testability with isolated components
5. Ease of navigation for AI tools to understand the codebase
