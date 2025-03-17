#!/usr/bin/env node

// run-agent-workflow.js - Script to run the AI agent workflow

const { AgentWorkflowOrchestrator } = require('../agents/agent-orchestrator');
const CursorClaudeInterface = require('../agents/cursor-claude-interface');

/**
 * Main function to run the workflow
 */
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
  try {
    const result = await orchestrator.runCompleteWorkflow(requirements);
    console.log('Workflow completed with result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error running workflow:', error);
  }
}

/**
 * Run a specific phase of the workflow
 * @param {string} phase - The phase to run (planning, generation, testing, review)
 * @param {string} input - The input for the phase
 */
async function runWorkflowPhase(phase, input) {
  // Initialize the Claude interface
  const claudeInterface = new CursorClaudeInterface();
  
  // Create the orchestrator
  const orchestrator = new AgentWorkflowOrchestrator(claudeInterface);
  
  try {
    let result;
    
    switch (phase) {
      case 'planning':
        result = await orchestrator.runJourneyPlanning(input);
        break;
      case 'generation':
        // Input should be a component spec JSON
        const componentSpec = JSON.parse(input);
        result = await orchestrator.runComponentGeneration(componentSpec);
        break;
      case 'testing':
        // Input should be a JSON with componentCode and componentSpec
        const testInput = JSON.parse(input);
        result = await orchestrator.runComponentTesting(testInput.componentCode, testInput.componentSpec);
        break;
      case 'review':
        // Input should be a JSON with componentCode and componentSpec
        const reviewInput = JSON.parse(input);
        result = await orchestrator.runCodeReview(reviewInput.componentCode, reviewInput.componentSpec);
        break;
      default:
        console.error('Unknown phase:', phase);
        process.exit(1);
    }
    
    console.log(`Phase '${phase}' completed with result:`, JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(`Error running phase '${phase}':`, error);
  }
}

// Check if this script is being run directly
if (require.main === module) {
  // Check if a specific phase is requested
  if (process.argv.length > 2 && ['planning', 'generation', 'testing', 'review'].includes(process.argv[2])) {
    const phase = process.argv[2];
    const input = process.argv.slice(3).join(' ');
    runWorkflowPhase(phase, input);
  } else {
    // Run the complete workflow
    runWorkflow().catch(error => {
      console.error('Workflow failed:', error);
      process.exit(1);
    });
  }
}

module.exports = {
  runWorkflow,
  runWorkflowPhase
}; 