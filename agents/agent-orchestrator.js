// agent-orchestrator.js - Coordinates the AI agents and workflow execution

const fs = require('fs').promises;
const path = require('path');
const agentPrompts = require('./config/prompts/agent-prompts');

/**
 * Base Agent class that all specialized agents inherit from
 */
class Agent {
  constructor(name, claudeInterface) {
    this.name = name;
    this.claude = claudeInterface;
    this.context = {};
  }

  setContext(context) {
    this.context = { ...this.context, ...context };
  }

  async run(input) {
    console.log(`[${this.name}] Running with input: ${JSON.stringify(input).substring(0, 100)}...`);
    // Actual implementation would call Claude via cursor interface
    throw new Error('Method must be implemented by subclass');
  }

  async saveOutput(output, filename) {
    const outputPath = path.join('agents', 'output', this.name);
    
    try {
      await fs.mkdir(outputPath, { recursive: true });
      await fs.writeFile(path.join(outputPath, filename), output);
      console.log(`[${this.name}] Output saved to ${filename}`);
    } catch (error) {
      console.error(`[${this.name}] Error saving output:`, error);
    }
  }
}

/**
 * Planner Agent - Creates journey specifications from requirements
 */
class PlannerAgent extends Agent {
  constructor(claudeInterface) {
    super('PlannerAgent', claudeInterface);
    this.systemPrompt = agentPrompts.plannerAgent.systemPrompt;
    this.promptTemplate = agentPrompts.plannerAgent.promptTemplate;
  }

  async run(input) {
    const { requirements, projectContext = {}, availableComponents = [] } = input;
    
    // Get journey format from DSL specification file
    const journeyFormat = await this.getJourneyFormat();
    
    // Build prompt with template
    const filledPrompt = this.promptTemplate
      .replace('{{requirements}}', requirements)
      .replace('{{projectContext}}', JSON.stringify(projectContext, null, 2))
      .replace('{{availableComponents}}', JSON.stringify(availableComponents, null, 2))
      .replace('{{journeyFormat}}', journeyFormat);
    
    // Call Claude
    const response = await this.claude.callClaude(this.systemPrompt, filledPrompt);
    
    // Extract and parse the journey specification from Claude's response
    const journeySpec = this.extractJourneySpec(response.text);
    
    // Save the journey specification to a file
    const filename = `journey-${Date.now()}.json`;
    await this.saveOutput(JSON.stringify(journeySpec, null, 2), filename);
    
    return { journeySpec, filename };
  }
  
  async getJourneyFormat() {
    try {
      // Read the journey DSL specification file
      const dslSpec = await fs.readFile(path.join('agents', 'config', 'journey-dsl-specification.md'), 'utf8');
      
      // Extract the format example
      const formatMatch = dslSpec.match(/```json\n([\s\S]+?)\n```/);
      return formatMatch ? formatMatch[1] : '';
    } catch (error) {
      console.error('[PlannerAgent] Error reading journey format:', error);
      return '';
    }
  }
  
  extractJourneySpec(text) {
    // Extract JSON from Claude's response
    const jsonMatch = text.match(/```json\n([\s\S]+?)\n```/);
    
    if (jsonMatch && jsonMatch[1]) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (error) {
        console.error('[PlannerAgent] Error parsing journey spec JSON:', error);
        return {};
      }
    }
    
    return {};
  }
}

/**
 * Journey Interpreter Agent - Converts journey specs to component requirements
 */
class JourneyInterpreterAgent extends Agent {
  constructor(claudeInterface) {
    super('JourneyInterpreterAgent', claudeInterface);
    this.systemPrompt = agentPrompts.journeyInterpreter.systemPrompt;
    this.promptTemplate = agentPrompts.journeyInterpreter.promptTemplate;
  }

  async run(input) {
    const { journeySpec } = input;
    
    // Get application schemas
    const applicationSchemas = await this.getApplicationSchemas();
    
    // Build prompt with template
    const filledPrompt = this.promptTemplate
      .replace('{{journeySpec}}', JSON.stringify(journeySpec, null, 2))
      .replace('{{applicationSchemas}}', applicationSchemas);
    
    // Call Claude
    const response = await this.claude.callClaude(this.systemPrompt, filledPrompt);
    
    // Extract component requirements from Claude's response
    const componentRequirements = this.extractComponentRequirements(response.text);
    
    // Save the component requirements to a file
    const filename = `component-requirements-${Date.now()}.json`;
    await this.saveOutput(JSON.stringify(componentRequirements, null, 2), filename);
    
    return { componentRequirements, filename };
  }
  
  async getApplicationSchemas() {
    try {
      // Read the application schemas file
      const schemas = await fs.readFile(path.join('agents', 'config', 'schemas', 'data-schemas.json'), 'utf8');
      return schemas;
    } catch (error) {
      console.error('[JourneyInterpreterAgent] Error reading application schemas:', error);
      return '{}';
    }
  }
  
  extractComponentRequirements(text) {
    // Extract JSON from Claude's response
    const jsonMatch = text.match(/```json\n([\s\S]+?)\n```/);
    
    if (jsonMatch && jsonMatch[1]) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (error) {
        console.error('[JourneyInterpreterAgent] Error parsing component requirements JSON:', error);
        return {};
      }
    }
    
    return {};
  }
}

/**
 * Schema Validator Agent - Validates data structures against schemas
 */
class SchemaValidatorAgent extends Agent {
  constructor(claudeInterface) {
    super('SchemaValidatorAgent', claudeInterface);
    this.systemPrompt = agentPrompts.schemaValidator.systemPrompt;
    this.promptTemplate = agentPrompts.schemaValidator.promptTemplate;
  }

  async run(input) {
    const { dataStructure } = input;
    
    // Get application schemas
    const applicationSchemas = await this.getApplicationSchemas();
    
    // Build prompt with template
    const filledPrompt = this.promptTemplate
      .replace('{{applicationSchemas}}', applicationSchemas)
      .replace('{{dataStructure}}', JSON.stringify(dataStructure, null, 2));
    
    // Call Claude
    const response = await this.claude.callClaude(this.systemPrompt, filledPrompt);
    
    // Save the validation result to a file
    const filename = `validation-${Date.now()}.md`;
    await this.saveOutput(response.text, filename);
    
    return { validationResult: response.text, filename };
  }
  
  async getApplicationSchemas() {
    try {
      // Read the application schemas file
      const schemas = await fs.readFile(path.join('agents', 'config', 'schemas', 'data-schemas.json'), 'utf8');
      return schemas;
    } catch (error) {
      console.error('[SchemaValidatorAgent] Error reading application schemas:', error);
      return '{}';
    }
  }
}

/**
 * Component Generator Agent - Creates React components from specifications
 */
class ComponentGeneratorAgent extends Agent {
  constructor(claudeInterface) {
    super('ComponentGeneratorAgent', claudeInterface);
    this.systemPrompt = agentPrompts.componentGenerator.systemPrompt;
    this.promptTemplate = agentPrompts.componentGenerator.promptTemplate;
  }

  async run(input) {
    const { componentSpec, styleGuide = '' } = input;
    
    // Get application schemas
    const applicationSchemas = await this.getApplicationSchemas();
    
    // Build prompt with template
    const filledPrompt = this.promptTemplate
      .replace('{{componentSpec}}', JSON.stringify(componentSpec, null, 2))
      .replace('{{applicationSchemas}}', applicationSchemas)
      .replace('{{styleGuide}}', styleGuide);
    
    // Call Claude
    const response = await this.claude.callClaude(this.systemPrompt, filledPrompt);
    
    // Extract component code from Claude's response
    const componentCode = this.extractComponentCode(response.text);
    
    // Save the component code to a file
    const filename = `${componentSpec.componentId || 'component'}-${Date.now()}.js`;
    await this.saveOutput(componentCode, filename);
    
    return { componentCode, filename };
  }
  
  async getApplicationSchemas() {
    try {
      // Read the application schemas file
      const schemas = await fs.readFile(path.join('agents', 'config', 'schemas', 'data-schemas.json'), 'utf8');
      return schemas;
    } catch (error) {
      console.error('[ComponentGeneratorAgent] Error reading application schemas:', error);
      return '{}';
    }
  }
  
  extractComponentCode(text) {
    // Extract code from Claude's response
    const codeMatch = text.match(/```jsx\n([\s\S]+?)\n```/) || text.match(/```javascript\n([\s\S]+?)\n```/) || text.match(/```js\n([\s\S]+?)\n```/);
    
    if (codeMatch && codeMatch[1]) {
      return codeMatch[1];
    }
    
    return text;
  }
}

/**
 * Tester Agent - Generates tests for components
 */
class TesterAgent extends Agent {
  constructor(claudeInterface) {
    super('TesterAgent', claudeInterface);
    this.systemPrompt = agentPrompts.testerAgent.systemPrompt;
    this.promptTemplate = agentPrompts.testerAgent.promptTemplate;
  }

  async run(input) {
    const { componentCode, componentSpec } = input;
    
    // Build prompt with template
    const filledPrompt = this.promptTemplate
      .replace('{{componentCode}}', componentCode)
      .replace('{{componentSpec}}', JSON.stringify(componentSpec, null, 2));
    
    // Call Claude
    const response = await this.claude.callClaude(this.systemPrompt, filledPrompt);
    
    // Extract test code from Claude's response
    const testCode = this.extractTestCode(response.text);
    
    // Save the test code to a file
    const filename = `${componentSpec.componentId || 'component'}.test.js`;
    await this.saveOutput(testCode, filename);
    
    return { testCode, filename };
  }
  
  extractTestCode(text) {
    // Extract code from Claude's response
    const codeMatch = text.match(/```jsx\n([\s\S]+?)\n```/) || text.match(/```javascript\n([\s\S]+?)\n```/) || text.match(/```js\n([\s\S]+?)\n```/);
    
    if (codeMatch && codeMatch[1]) {
      return codeMatch[1];
    }
    
    return text;
  }
}

/**
 * Reviewer Agent - Reviews code for quality and best practices
 */
class ReviewerAgent extends Agent {
  constructor(claudeInterface) {
    super('ReviewerAgent', claudeInterface);
    this.systemPrompt = agentPrompts.reviewerAgent.systemPrompt;
    this.promptTemplate = agentPrompts.reviewerAgent.promptTemplate;
  }

  async run(input) {
    const { componentCode, componentSpec, styleGuide = '' } = input;
    
    // Build prompt with template
    const filledPrompt = this.promptTemplate
      .replace('{{componentCode}}', componentCode)
      .replace('{{componentSpec}}', JSON.stringify(componentSpec, null, 2))
      .replace('{{styleGuide}}', styleGuide);
    
    // Call Claude
    const response = await this.claude.callClaude(this.systemPrompt, filledPrompt);
    
    // Save the review to a file
    const filename = `review-${componentSpec.componentId || 'component'}-${Date.now()}.md`;
    await this.saveOutput(response.text, filename);
    
    return { review: response.text, filename };
  }
}

/**
 * Agent Workflow Orchestrator - Coordinates the agents and workflow execution
 */
class AgentWorkflowOrchestrator {
  constructor(claudeInterface) {
    this.claudeInterface = claudeInterface;
    
    // Initialize agents
    this.plannerAgent = new PlannerAgent(claudeInterface);
    this.journeyInterpreterAgent = new JourneyInterpreterAgent(claudeInterface);
    this.schemaValidatorAgent = new SchemaValidatorAgent(claudeInterface);
    this.componentGeneratorAgent = new ComponentGeneratorAgent(claudeInterface);
    this.testerAgent = new TesterAgent(claudeInterface);
    this.reviewerAgent = new ReviewerAgent(claudeInterface);
  }
  
  async runCompleteWorkflow(requirements) {
    console.log('Starting complete workflow with requirements:', requirements);
    
    // Phase 1: Journey Specification
    console.log('Phase 1: Journey Specification');
    const plannerResult = await this.plannerAgent.run({ requirements });
    
    // Phase 2: Component Requirements
    console.log('Phase 2: Component Requirements');
    const interpreterResult = await this.journeyInterpreterAgent.run({ 
      journeySpec: plannerResult.journeySpec 
    });
    
    // Phase 3: Component Generation
    console.log('Phase 3: Component Generation');
    const componentResults = [];
    
    for (const screen of interpreterResult.componentRequirements) {
      for (const component of screen.components) {
        // Validate component spec against schema
        await this.schemaValidatorAgent.run({ 
          dataStructure: component 
        });
        
        // Generate component
        const componentResult = await this.componentGeneratorAgent.run({ 
          componentSpec: component 
        });
        
        // Generate tests
        const testResult = await this.testerAgent.run({ 
          componentCode: componentResult.componentCode,
          componentSpec: component
        });
        
        // Review component
        const reviewResult = await this.reviewerAgent.run({ 
          componentCode: componentResult.componentCode,
          componentSpec: component
        });
        
        componentResults.push({
          component,
          componentCode: componentResult.componentCode,
          testCode: testResult.testCode,
          review: reviewResult.review
        });
      }
    }
    
    return {
      journeySpec: plannerResult.journeySpec,
      componentRequirements: interpreterResult.componentRequirements,
      components: componentResults
    };
  }
  
  async runJourneyPlanning(requirements) {
    console.log('Running journey planning with requirements:', requirements);
    return await this.plannerAgent.run({ requirements });
  }
  
  async runComponentGeneration(componentSpec) {
    console.log('Running component generation for:', componentSpec.componentId || 'component');
    return await this.componentGeneratorAgent.run({ componentSpec });
  }
  
  async runComponentTesting(componentCode, componentSpec) {
    console.log('Running component testing for:', componentSpec.componentId || 'component');
    return await this.testerAgent.run({ componentCode, componentSpec });
  }
  
  async runCodeReview(componentCode, componentSpec) {
    console.log('Running code review for:', componentSpec.componentId || 'component');
    return await this.reviewerAgent.run({ componentCode, componentSpec });
  }
}

module.exports = {
  Agent,
  PlannerAgent,
  JourneyInterpreterAgent,
  SchemaValidatorAgent,
  ComponentGeneratorAgent,
  TesterAgent,
  ReviewerAgent,
  AgentWorkflowOrchestrator
}; 