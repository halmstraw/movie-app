# Movie App

A React application for searching and discovering movies, with the ability to save favorites.

## Features

- Search for movies using the TMDB API
- View popular movies on the home page
- See detailed information about each movie
- Save favorite movies to a personal list
- Dark/light theme support
- Responsive design for all devices

## Technologies Used

- React
- React Router
- Styled Components
- Axios
- TMDB API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API key (get one at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/halmstraw/movie-app.git
   cd movie-app
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Create a `.env` file in the root directory and add your TMDB API key:
   ```
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

The project follows a feature-based structure:

- `src/api`: API integration with TMDB
- `src/assets`: Static assets like images and global styles
- `src/components`: Reusable UI components
- `src/context`: React context providers for state management
- `src/hooks`: Custom React hooks
- `src/pages`: Page components for each route
- `src/utils`: Utility functions

## Deployment

To build the app for production:

```
npm run build
```
or
```
yarn build
```

This will create a `build` folder with optimized production files.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [React](https://reactjs.org/) and its ecosystem for making development enjoyable
