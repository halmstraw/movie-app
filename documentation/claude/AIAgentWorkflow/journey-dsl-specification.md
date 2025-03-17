# User Journey DSL Specification

## Overview

This Domain-Specific Language (DSL) defines user journeys through the movie application. It provides a structured way to describe how users interact with the application, what they see, and what actions they can take.

## DSL Structure

Each journey is defined using a JSON structure with the following components:

```json
{
  "journeyId": "unique-journey-identifier",
  "journeyName": "Human-readable journey name",
  "description": "Detailed description of what this journey accomplishes",
  "startPoint": "screen-id",
  "steps": [
    {
      "stepId": "step-1",
      "stepType": "view | action | decision",
      "screenId": "screen-being-viewed",
      "description": "What happens in this step",
      "expectations": ["what the user should see"],
      "actions": [
        {
          "actionType": "click | input | scroll | navigate",
          "target": "element-id or route",
          "input": "user input if applicable",
          "expectedResult": "what should happen"
        }
      ],
      "nextStep": "step-2"
    }
  ],
  "outcomes": [
    {
      "outcomeId": "outcome-1",
      "description": "Description of the outcome",
      "condition": "When this outcome occurs"
    }
  ]
}
```

## Step Types

- **View**: User is viewing a screen or component
- **Action**: User performs an action (click, input, etc.)
- **Decision**: User makes a choice that affects the journey

## Action Types

- **Click**: User clicks on an element
- **Input**: User enters text or selects an option
- **Scroll**: User scrolls the view
- **Navigate**: User moves to a different screen

## Example: Search and Add to Favorites Journey

```json
{
  "journeyId": "search-add-favorite",
  "journeyName": "Search and Add to Favorites",
  "description": "User searches for a movie and adds it to their favorites",
  "startPoint": "home-screen",
  "steps": [
    {
      "stepId": "view-home",
      "stepType": "view",
      "screenId": "home-screen",
      "description": "User views the home screen",
      "expectations": ["Search bar is visible", "Popular movies are displayed"],
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
      "description": "User enters search term",
      "actions": [
        {
          "actionType": "input",
          "target": "search-bar",
          "input": "Star Wars",
          "expectedResult": "Search suggestions appear"
        },
        {
          "actionType": "click",
          "target": "search-button",
          "expectedResult": "Navigate to search results"
        }
      ],
      "nextStep": "view-results"
    },
    {
      "stepId": "view-results",
      "stepType": "view",
      "screenId": "search-results",
      "description": "User views search results",
      "expectations": ["Search results for 'Star Wars' are displayed", "Results are in a grid or list"],
      "actions": [
        {
          "actionType": "click",
          "target": "movie-card-1",
          "expectedResult": "Navigate to movie details"
        }
      ],
      "nextStep": "view-details"
    },
    {
      "stepId": "view-details",
      "stepType": "view",
      "screenId": "movie-details",
      "description": "User views movie details",
      "expectations": ["Movie title is displayed", "Movie poster is displayed", "Add to favorites button is visible"],
      "actions": [
        {
          "actionType": "click",
          "target": "add-favorite-button",
          "expectedResult": "Movie added to favorites, button state changes"
        }
      ],
      "nextStep": "confirmation"
    },
    {
      "stepId": "confirmation",
      "stepType": "view",
      "screenId": "movie-details",
      "description": "User sees confirmation of adding to favorites",
      "expectations": ["Confirmation message is shown", "Favorite button shows active state"],
      "actions": [
        {
          "actionType": "navigate",
          "target": "/favorites",
          "expectedResult": "Navigate to favorites page"
        }
      ],
      "nextStep": "view-favorites"
    },
    {
      "stepId": "view-favorites",
      "stepType": "view",
      "screenId": "favorites",
      "description": "User views favorites list",
      "expectations": ["Newly added movie appears in favorites list"],
      "actions": [],
      "nextStep": null
    }
  ],
  "outcomes": [
    {
      "outcomeId": "successful-favorite",
      "description": "User successfully added a movie to favorites",
      "condition": "Movie appears in favorites list"
    }
  ]
}
```

## Usage

This DSL can be used to:
1. Generate test scenarios
2. Create component specifications
3. Build user documentation
4. Generate UI flows
5. Validate application behavior

Each journey represents a complete user flow from start to finish, capturing the user's intent, actions, and expected outcomes.
