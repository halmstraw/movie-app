# AI Agent Workflow for Movie App

This directory contains the AI Agent Workflow system for automating the development of the movie application.

## Overview

The AI Agent Workflow is a system of specialized AI agents that collaborate to generate code, tests, and documentation based on user requirements. The system uses Claude 3.7 through Cursor IDE to power the agents.

## Directory Structure

```
agents/
├── config/                   # Agent configuration
│   ├── prompts/              # Prompt templates
│   ├── schemas/              # Data schemas
│   └── journey-dsl-specification.md  # Journey DSL specification
├── output/                   # Agent output files
│   ├── PlannerAgent/         # Journey specifications
│   ├── JourneyInterpreterAgent/ # Component requirements
│   ├── ComponentGeneratorAgent/ # Generated components
│   ├── TesterAgent/          # Generated tests
│   ├── ReviewerAgent/        # Code reviews
│   └── SchemaValidatorAgent/ # Validation reports
├── specs/                    # Journey specifications
└── utils/                    # Utility functions
```

## Agents

The system consists of six specialized agents:

1. **Planner Agent**: Analyzes user requirements and creates journey specifications
2. **Journey Interpreter**: Converts journey specifications into component requirements
3. **Schema Validator**: Ensures data structures comply with defined schemas
4. **Component Generator**: Creates React components based on specifications
5. **Tester Agent**: Generates tests for components and user flows
6. **Reviewer Agent**: Reviews code for quality and adherence to standards

## Usage

### Running the Complete Workflow

To run the complete workflow with a specific requirement:

```bash
node scripts/run-agent-workflow.js "Create a screen where users can view their favorite movies and filter by genre"
```

This will:
1. Generate a journey specification
2. Convert it to component requirements
3. Generate React components
4. Create tests for the components
5. Review the code quality

### Running Individual Phases

You can also run individual phases of the workflow:

```bash
# Run just the planning phase
node scripts/run-agent-workflow.js planning "Create a screen where users can view their favorite movies and filter by genre"

# Run component generation with a component spec file
node scripts/run-agent-workflow.js generation "$(cat agents/specs/genre-filter-component.json)"

# Run testing for a component
node scripts/run-agent-workflow.js testing '{"componentCode": "...", "componentSpec": {...}}'

# Run code review for a component
node scripts/run-agent-workflow.js review '{"componentCode": "...", "componentSpec": {...}}'
```

## Integration with Cursor IDE

In practice, you'll want to integrate directly with Cursor IDE:

1. Open the journey specification in Cursor
2. Ask Claude to generate a component based on the specification
3. Use the output directly in your project

## Example Journey

See `agents/specs/filter-favorites-journey.json` for an example journey specification.

## Example Component Specification

See `agents/specs/genre-filter-component.json` for an example component specification. 