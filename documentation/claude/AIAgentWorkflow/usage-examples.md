# AI Agent Workflow Usage Examples

This document provides practical examples of how to use the AI agentic workflow system for developing the movie application.

## Example 1: Creating a Movie Search Feature

### Step 1: Define the Journey

First, we'll define the user journey for searching movies:

```json
{
  "journeyId": "movie-search",
  "journeyName": "Movie Search Journey",
  "description": "User searches for movies by title and views search results",
  "startPoint": "home-screen",
  "steps": [
    {
      "stepId": "view-home",
      "stepType": "view",
      "screenId": "home-screen",
      "description": "User views the home screen with search bar",
      "expectations": ["Search bar is prominently displayed", "Trending movies are shown"],
      "actions": [
        {
          "actionType": "click",
          "target": "search-bar",
          "expectedResult": "Search bar is focused"
        }
      ],
      "nextStep": "enter-search"
    },
    {
      "stepId": "enter-search",
      "stepType": "action",
      "screenId": "home-screen",
      "description": "User enters a movie title in the search bar",
      "actions": [
        {
          "actionType": "input",
          "target": "search-bar",
          "input": "Inception",
          "expectedResult": "Text appears in search bar"
        },
        {
          "actionType": "click",
          "target": "search-button",
          "expectedResult": "Navigate to search results screen"
        }
      ],
      "nextStep": "view-results"
    },
    {
      "stepId": "view-results",
      "stepType": "view",
      "screenId": "search-results",
      "description": "User views the search results",
      "expectations": [
        "Search results for 'Inception' are displayed", 
        "Results show movie posters, titles, and release years",
        "Results are in a grid layout"
      ],
      "actions": [
        {
          "actionType": "click",
          "target": "movie-card-1",
          "expectedResult": "Navigate to movie details screen"
        }
      ],
      "nextStep": "view-details"
    },
    {
      "stepId": "view-details",
      "stepType": "view",
      "screenId": "movie-details",
      "description": "User views detailed information about the selected movie",
      "expectations": [
        "Movie title is displayed prominently",
        "Movie poster is shown",
        "Release date, rating, and overview are visible",
        "Add to favorites button is available"
      ],
      "actions": [],
      "nextStep": null
    }
  ],
  "outcomes": [
    {
      "outcomeId": "successful-search",
      "description": "User successfully finds and views details for a movie",
      "condition": "User reaches the movie details screen with the correct movie displayed"
    }
  ]
}
```

### Step 2: Generate Component Requirements

Using the Journey Interpreter Agent:

```javascript
const { AgentWorkflowOrchestrator } = require('./agents/agent-orchestrator');
const CursorClaudeInterface = require('./agents/cursor-claude-interface');

async function generateSearchComponents() {
  const claudeInterface = new CursorClaudeInterface();
  const orchestrator = new AgentWorkflowOrchestrator(claudeInterface);
  
  // Load the journey specification
  const journeySpec = require('./agents/specs/movie-search.json');
  
  // Run the Journey Interpreter Agent
  const result = await orchestrator.agents.journeyInterpreter.run({ journeySpec });
  
  console.log('Component requirements generated:', result.outputs);
}

generateSearchComponents();
```

### Step 3: Create Components with Cursor IDE

In Cursor IDE, ask Claude to generate the SearchBar component:

```
I need to implement a SearchBar component based on these requirements:

{
  "componentId": "search-bar",
  "componentType": "SearchBar",
  "props": {
    "placeholder": "Search for movies...",
    "onSearch": "Function to handle search submission"
  },
  "state": {
    "query": "string - the current search query",
    "isSearching": "boolean - whether a search is in progress"
  },
  "interactions": [
    "User can type in the input field to update query",
    "User can click the search button to submit search",
    "User can press Enter to submit search"
  ]
}

Please create a React functional component using:
- Styled-components for styling
- React hooks for state management
- Proper form handling
- Loading state during search

The component should be responsive and accessible.
```

### Step 4: Implement API Integration

Ask Claude to help integrate the API:

```
I need to connect my SearchBar component to the movieApi service. Here's my current component:

[Paste the generated SearchBar component]

And here's the API service method:

searchMovies: async (query, page = 1) => {
  try {
    const response = await apiClient.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}

Please update the component to:
1. Call the API when search is submitted
2. Handle loading states
3. Handle errors gracefully
4. Pass the results to a parent component
```

### Step 5: Generate Tests

In Cursor IDE, ask Claude to create tests:

```
Please write comprehensive tests for this SearchBar component:

[Paste the component code]

Use:
- Jest as the testing framework
- React Testing Library for component testing
- Mock the API calls
- Test the following scenarios:
  1. Initial rendering
  2. Typing in the search box
  3. Submitting the search form
  4. Handling loading states
  5. Handling API errors
```

## Example 2: Creating the Favorites Feature

### Step 1: Define the Journey

Create a journey specification for the favorites feature:

```json
{
  "journeyId": "manage-favorites",
  "journeyName": "Manage Favorites Journey",
  "description": "User views and manages their favorite movies",
  "startPoint": "favorites-screen",
  "steps": [
    {
      "stepId": "view-favorites",
      "stepType": "view",
      "screenId": "favorites-screen",
      "description": "User views their favorite movies",
      "expectations": [
        "List of favorite movies is displayed",
        "Each movie shows poster, title, and release year",
        "Remove button is available for each movie",
        "Empty state is shown if no favorites exist"
      ],
      "actions": [
        {
          "actionType": "click",
          "target": "remove-button-1",
          "expectedResult": "Movie is removed from favorites"
        }
      ],
      "nextStep": "confirm-remove"
    },
    {
      "stepId": "confirm-remove",
      "stepType": "action",
      "screenId": "favorites-screen",
      "description": "User confirms removal of a movie from favorites",
      "expectations": ["Confirmation dialog is displayed"],
      "actions": [
        {
          "actionType": "click",
          "target": "confirm-button",
          "expectedResult": "Movie is removed and no longer appears in list"
        }
      ],
      "nextStep": "view-updated-favorites"
    },
    {
      "stepId": "view-updated-favorites",
      "stepType": "view",
      "screenId": "favorites-screen",
      "description": "User views updated favorites list",
      "expectations": ["Updated favorites list is displayed without the removed movie"],
      "actions": [
        {
          "actionType": "click",
          "target": "movie-card-1",
          "expectedResult": "Navigate to movie details screen"
        }
      ],
      "nextStep": "view-details"
    },
    {
      "stepId": "view-details",
      "stepType": "view",
      "screenId": "movie-details",
      "description": "User views details of a favorite movie",
      "expectations": [
        "Movie details are displayed",
        "Remove from favorites button is shown"
      ],
      "actions": [],
      "nextStep": null
    }
  ],
  "outcomes": [
    {
      "outcomeId": "successful-favorites-management",
      "description": "User successfully manages their favorite movies",
      "condition": "User can view, remove, and access details of favorite movies"
    }
  ]
}
```

### Step 2: Generate FavoritesContext

In Cursor IDE, ask Claude to implement the FavoritesContext:

```
Based on our application schema and the favorites management journey, please implement a complete React Context for managing favorites.

The context should:
1. Store favorites in localStorage
2. Provide functions to add/remove favorites
3. Check if a movie is already a favorite
4. Handle loading states
5. Include proper TypeScript types

Here's our FavoriteItem schema:
{
  "type": "object",
  "required": ["id", "mediaType", "addedAt"],
  "properties": {
    "id": {
      "type": "integer",
      "description": "ID of the favorited item"
    },
    "mediaType": {
      "type": "string",
      "enum": ["movie", "tv"],
      "description": "Type of media (movie or tv)"
    },
    "addedAt": {
      "type": "string",
      "format": "date-time",
      "description": "ISO timestamp when the item was added to favorites"
    },
    "title": {
      "type": "string",
      "description": "Title of movie (if mediaType is movie)"
    },
    "name": {
      "type": "string",
      "description": "Name of TV show (if mediaType is tv)"
    },
    "posterPath": {
      "type": "string",
      "description": "Path to poster image"
    }
  }
}
```

### Step 3: Create FavoritesList Component

Ask Claude to create the FavoritesList component:

```
Please create a FavoritesList component that:
1. Uses the FavoritesContext to access the user's favorites
2. Displays favorites in a responsive grid
3. Shows movie poster, title, and year for each favorite
4. Includes a remove button for each favorite
5. Shows an empty state when there are no favorites
6. Handles loading states
7. Is fully accessible

Use styled-components for styling and follow our project's component patterns.
```

### Step 4: Implement the Confirmation Dialog

```
I need a reusable ConfirmationDialog component for my React application. It should:
1. Be a modal dialog that overlays the current screen
2. Display a customizable message
3. Have confirm and cancel buttons
4. Be dismissible by clicking outside or pressing Escape
5. Be fully accessible following ARIA best practices
6. Use styled-components for styling
7. Accept callback functions for confirm and cancel actions

Please implement this component and show an example of how to use it for confirming the removal of a favorite movie.
```

## Example 3: Creating a Custom Agent

If you need a specialized agent, here's how to create one:

```javascript
// agents/custom-mock-data-agent.js
const { Agent } = require('./agent-orchestrator');
const fs = require('fs').promises;
const path = require('path');

class MockDataGenerator extends Agent {
  constructor(claudeInterface) {
    super('MockDataGenerator', claudeInterface);
    this.systemPrompt = `
      You are a specialized agent for generating realistic mock data for a movie application.
      Your task is to create JSON data that mimics API responses from movie databases.
      Generate diverse and realistic data that can be used for development and testing.
    `;
    
    this.promptTemplate = `
      # Task
      Generate mock data for the following entity: {{entityType}}
      
      # Schema
      {{schema}}
      
      # Requirements
      {{requirements}}
      
      # Output Format
      Provide the mock data as a valid JSON array with {{count}} items.
      Each item should fully conform to the schema above.
      Include a variety of realistic values.
    `;
  }
  
  async run(input) {
    const { entityType, count = 10, requirements = '' } = input;
    
    // Get schema for the entity
    const schema = await this.getSchemaForEntity(entityType);
    
    // Build prompt
    const filledPrompt = this.promptTemplate
      .replace('{{entityType}}', entityType)
      .replace('{{schema}}', JSON.stringify(schema, null, 2))
      .replace('{{requirements}}', requirements)
      .replace('{{count}}', count.toString());
    
    // Call Claude
    const response = await this.claude.callClaude(this.systemPrompt, filledPrompt);
    
    // Extract mock data
    const mockData = this.extractJsonFromResponse(response.text);
    
    // Save mock data to file
    const filename = `${entityType.toLowerCase()}-mock-data.json`;
    await this.saveOutput(JSON.stringify(mockData, null, 2), filename);
    
    return { mockData, filename };
  }
  
  async getSchemaForEntity(entityType) {
    const schemas = JSON.parse(await fs.readFile('agents/config/schemas/data-schemas.json', 'utf8'));
    return schemas.definitions[entityType] || {};
  }
  
  extractJsonFromResponse(response) {
    const jsonMatch = response.match(/```json\n([\s\S]+?)\n```/) || 
                     response.match(/```\n([\s\S]+?)\n```/) ||
                     response.match(/(\[[\s\S]+\])/);
                     
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } catch (error) {
        console.error('Error parsing mock data:', error);
        return [];
      }
    }
    
    return [];
  }
}

module.exports = MockDataGenerator;
```

Usage example:

```javascript
const MockDataGenerator = require('./agents/custom-mock-data-generator');
const CursorClaudeInterface = require('./agents/cursor-claude-interface');

async function generateMockMovies() {
  const claudeInterface = new CursorClaudeInterface();
  const mockDataGenerator = new MockDataGenerator(claudeInterface);
  
  const result = await mockDataGenerator.run({
    entityType: 'Movie',
    count: 20,
    requirements: 'Include a mix of genres, ratings, and release years. Some should have missing poster images.'
  });
  
  console.log(`Generated ${result.mockData.length} mock movies and saved to ${result.filename}`);
}

generateMockMovies();
```

This custom agent can be integrated into your workflow to generate realistic test data for development and testing purposes.
