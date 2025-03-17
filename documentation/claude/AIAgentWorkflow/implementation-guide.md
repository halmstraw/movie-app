# AI Agentic Workflow Implementation Guide

This guide explains how to implement and use the AI agentic workflow system for automating the development of the movie application.

## Setup Instructions

### 1. Project Structure

First, create the following directory structure in your repository:

```
ai-movie-app/
├── src/                          # React application source code
├── agents/                       # AI agent system
│   ├── config/                   # Agent configuration
│   │   ├── prompts/              # Prompt templates
│   │   └── schemas/              # Data schemas
│   ├── output/                   # Agent output files
│   │   ├── PlannerAgent/
│   │   ├── JourneyInterpreterAgent/
│   │   ├── ComponentGeneratorAgent/
│   │   ├── TesterAgent/
│   │   ├── ReviewerAgent/
│   │   └── SchemaValidatorAgent/
│   ├── specs/                    # Journey specifications
│   └── utils/                    # Utility functions
└── scripts/                      # Automation scripts
```

### 2. Install Dependencies

Add the following to your `package.json`:

```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.16.0",
  "styled-components": "^6.0.8",
  "axios": "^1.5.0"
},
"devDependencies": {
  "jest": "^29.6.4",
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.1.3"
}
```

### 3. Copy Files to Repository

1. Copy `journey-dsl-specification.md` to `agents/config/`
2. Copy `data-schemas.json` to `agents/config/schemas/`
3. Copy `agent-prompts.js` to `agents/config/prompts/`
4. Copy `agent-orchestrator.js` to `agents/`

### 4. Create Cursor Integration

Create a file `agents/cursor-claude-interface.js`:

```javascript
// This is a placeholder for the actual Cursor IDE integration
// In a real implementation, this would use Cursor's API to interact with Claude

class CursorClaudeInterface {
  constructor() {
    this.conversations = {};
  }

  async callClaude(systemPrompt, userPrompt) {
    console.log("=== CLAUDE PROMPT ===");
    console.log("System: ", systemPrompt.substring(0, 100) + "...");
    console.log("User: ", userPrompt.substring(0, 100) + "...");
    
    // In a real implementation, this would call Claude via Cursor IDE
    // For now, we'll just log the request and return a placeholder
    
    console.log("Placeholder: Claude would process this prompt via Cursor IDE");
    
    // Return a placeholder response
    return {
      text: "This is a placeholder for Claude's response. In actual implementation, this would be Claude's response to the prompt."
    };
  }
}

module.exports = CursorClaudeInterface;
```

### 5. Create Main Workflow Script

Create a file `scripts/run-agent-workflow.js`:

```javascript
const { AgentWorkflowOrchestrator } = require('../agents/agent-orchestrator');
const CursorClaudeInterface = require('../agents/cursor-claude-interface');

async function runWorkflow() {
  // Get requirements from command line arguments
  const requirements = process.argv.slice(2).join(' ') || 
    'Create a page where users can search for movies and add them to favorites';
  
  console.log('Starting workflow with requirements:', requirements);
  
  // Initialize the Claude interface
  const claudeInterface = new CursorClaudeInterface();
  
  // Create the orchestrator
  const orchestrator = new AgentWorkflowOrchestrator(claudeInterface);
  
  // Run the workflow
  const result = await orchestrator.runCompleteWorkflow(requirements);
  
  console.log('Workflow completed with result:', JSON.stringify(result, null, 2));
}

runWorkflow().catch(error => {
  console.error('Workflow failed:', error);
  process.exit(1);
});
```

## Using the Workflow

### 1. Defining User Journeys

Use the Journey DSL to define new user journeys:

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
    // Additional steps...
  ]
}
```

Save this to `agents/specs/search-add-favorite.json`.

### 2. Running the Full Workflow

To run the full workflow with a specific requirement:

```bash
node scripts/run-agent-workflow.js "Create a screen where users can view their favorite movies and filter by genre"
```

This will:
1. Generate a journey specification
2. Convert it to component requirements
3. Generate React components
4. Create tests for the components
5. Review the code quality

### 3. Using with Cursor IDE

In practice, you'll want to integrate directly with Cursor IDE:

1. Open the journey specification in Cursor
2. Ask Claude to generate a component:

```
Based on this journey specification, generate a React component for the SearchBar that:
1. Has a text input for the search query
2. Has a submit button
3. Handles form submission
4. Shows loading state during search
5. Follows our project's styling guidelines
```

3. Use the output directly in your project

### 4. Iterative Development

For each component:

1. Generate the initial version using the agent workflow
2. Review the generated code
3. Make manual