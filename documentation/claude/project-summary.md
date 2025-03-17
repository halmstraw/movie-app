# Project Summary for Claude

## Working Approach
- Think step by step, showing reasoning as we go
- Break down tasks to allow for human input at decision points
- Discuss uncertainties rather than making assumptions
- Ask before creating any code
- Maintain transparent reasoning throughout the development process

## Critical Thinking Guidelines
- Consider multiple solutions for each problem before recommending one
- Explicitly identify assumptions being made in any approach
- Proactively identify potential risks, edge cases, and failure modes
- Question the necessity of external dependencies before adding them
- Evaluate performance/scalability implications of design choices
- Consider security implications of implementation decisions
- Propose testable hypotheses rather than definitive statements when uncertain
- When suggesting patterns or approaches, explain the tradeoffs involved

## Control Mechanisms
- Present decision points with clear options before proceeding
- Establish checkpoints at key development stages for review
- Provide summaries of key decisions made so far at regular intervals
- Use numbered lists for multi-step processes to facilitate partial implementation
- Separate "must-have" vs "nice-to-have" features in recommendations
- Flag decisions that would be difficult to reverse later
- Create modular designs that allow for component-by-component approval

## Project Overview
- Creating a movie application where users can search for TV shows/films and add them to favorites
- Initial focus on web browser implementation, with plans to extend to native iOS/Android apps
- Primary goal: Learn how to automate development with AI agents
- Secondary goal: Create a functional movie application

## Technology Stack
- **Frontend**: React (web) / React Native (mobile)
- Selected for cross-platform capabilities and strong ecosystem
- Will enable code sharing between web and mobile implementations
- Using TMDB API for movie data

## Development Environment
- GitHub for version control and repository hosting
- Cursor IDE with Claude 3.7 integration for AI-assisted development
- CI/CD workflows through GitHub Actions

## Project Structure
- Organized by feature and responsibility
- Clear separation between components, API layer, and application logic
- Context API for state management (especially favorites functionality)
- Responsive design for cross-device compatibility

## AI Agentic Workflow
- Implemented a multi-agent system for development automation:
  - PlannerAgent: Creates journey specifications from requirements
  - JourneyInterpreterAgent: Converts journeys to component requirements
  - ComponentGeneratorAgent: Creates React components from specs
  - SchemaValidatorAgent: Ensures data structures conform to schemas
  - TesterAgent: Generates tests for components and flows
  - ReviewerAgent: Reviews code for quality and standards
- Created a Domain-Specific Language (DSL) for defining user journeys
- Developed comprehensive JSON schemas for application data
- Built an orchestration system for coordinating agent workflows
- Designed detailed prompt templates for each agent type

## Current Status
- Repository set up in GitHub
- AI agentic workflow architecture created
- Journey DSL specification defined
- Application data schemas created
- Agent system implemented with prompt templates
- Implementation guide and usage examples provided

## Next Steps
- Implement the first user journey using the agentic workflow
- Test the generated components
- Refine the agent prompts based on initial results
- Extend the system with additional specialized agents as needed

This summary will be updated as the project progresses to maintain context continuity between different Claude instances.
