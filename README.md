# Movie App

A React application for browsing and managing your favorite movies, with multiple implementations.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your TMDB API key:
   ```
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   ```
   You can get an API key by creating an account at [The Movie Database](https://www.themoviedb.org/) and going to Settings > API.

4. Start the development server:
   ```
   npm start
   ```

## Features

- Browse popular movies
- Search for movies by title
- View movie details
- Add movies to favorites
- Filter favorites by genre
- Switch between light and dark themes

## Project Structure

- `src/` - Main application source code
  - `apps/` - Different implementations of the movie app
    - `ai-prompt-generated/` - Implementation generated through AI prompts
  - `components/` - Shared React components
  - `api/` - API integration with TMDB
  - `context/` - React context providers
  - `hooks/` - Custom React hooks
  - `utils/` - Utility functions

- `agents/` - AI Agent Workflow system
  - `config/` - Agent configuration files
  - `specs/` - Journey and component specifications
  - `utils/` - Agent utility functions

## AI Agent Workflow

This project includes an AI Agent Workflow system for automating development tasks. See the [agents/README.md](agents/README.md) file for more information.

## License

MIT
