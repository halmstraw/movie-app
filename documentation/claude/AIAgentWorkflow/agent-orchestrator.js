// agent-orchestrator.js - Coordinates the AI agents and workflow execution

const fs = require('fs').promises;
const path = require('path');
const agentPrompts = require('./agent-prompts');

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
    const outputPath = path.join('output', this.name);
    
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
 * Claude interface that uses Cursor IDE to interact with Claude 3.7
 */
class ClaudeInterface {
  constructor(cursorAPI) {
    this.cursorAPI = cursorAPI;
  }

  async callClaude(systemPrompt, userPrompt) {
    // In a real implementation, this would use the Cursor API
    // For now we'll return a placeholder
    console.log('[Claude] Received prompt, processing...');
    return {
      text: "This is a simulated Claude response. In the actual implementation, this would be Claude's response to the prompt."
    };
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
      const dslSpec = await fs.readFile('journey-dsl-specification.md', 'utf8');
      
      // Extract the format example
      const formatMatch = dslSpec.match(/```json\n([\s\S]+?)\n```/);
      return formatMatch ? formatMatch[1] : 'Journey format not found';
    } catch (error) {
      console.error(`[${this.name}] Error reading journey format:`, error);
      return 'Error reading journey format';
    }
  }
  
  extractJourneySpec(response) {
    // This would parse Claude's response to extract the journey specification
    // For now, we'll return a simple mock
    try {
      // Look for JSON in the response
      const jsonMatch = response.match(/```json\n([\s\S]+?)\n```/) || 
                        response.match(/```\n([\s\S]+?)\n```/) ||
                        response.match(/{[\s\S]+}/);
                        
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1] || jsonMatch[0]);
      }
      
      // Fallback mock journey
      return {
        journeyId: "mock-journey",
        journeyName: "Mock Journey",
        description: "This is a mock journey for testing",
        startPoint: "home-screen",
        steps: [],
        outcomes: []
      };
    } catch (error) {
      console.error(`[${this.name}] Error extracting journey spec:`, error);
      return { error: "Failed to extract journey specification" };
    }
  }
}

/**
 * Journey Interpreter Agent - Converts journeys to component requirements
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
    
    // Save component requirements to files
    const outputs = {};
    for (const [screenId, requirements] of Object.entries(componentRequirements)) {
      const filename = `${screenId}-requirements.json`;
      await this.saveOutput(JSON.stringify(requirements, null, 2), filename);
      outputs[screenId] = filename;
    }
    
    return { componentRequirements, outputs };
  }
  
  async getApplicationSchemas() {
    try {
      return await fs.readFile('data-schemas.json', 'utf8');
    } catch (error) {
      console.error(`[${this.name}] Error reading application schemas:`, error);
      return '{}';
    }
  }
  
  extractComponentRequirements(response) {
    // This would parse Claude's response to extract component requirements
    // For now, we'll return a simple mock
    try {
      // Look for JSON objects in the response
      const requirements = {};
      const screenMatches = response.match(/```json\n([\s\S]+?)\n```/g) || [];
      
      if (screenMatches.length > 0) {
        for (const match of screenMatches) {
          const screenReq = JSON.parse(match.replace(/```json\n/, '').replace(/\n```/, ''));
          requirements[screenReq.screenId] = screenReq;
        }
        return requirements;
      }
      
      // Fallback mock requirements
      return {
        "home-screen": {
          "screenId": "home-screen",
          "screenName": "Home Screen",
          "layout": "Responsive grid layout",
          "components": [
            {
              "componentId": "search-bar",
              "componentType": "SearchBar",
              "props": { "placeholder": "Search for movies..." },
              "state": { "query": "string" },
              "interactions": ["On submit, navigate to search results"],
              "apiCalls": ["searchMovies(query)"]
            }
          ],
          "dataFlow": "Search query flows to search results page",
          "navigationLogic": "On search submit, navigate to /search?q={query}"
        }
      };
    } catch (error) {
      console.error(`[${this.name}] Error extracting component requirements:`, error);
      return { error: "Failed to extract component requirements" };
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
    const { componentRequirements } = input;
    const components = {};
    
    // Get application schemas and style guide
    const applicationSchemas = await this.getApplicationSchemas();
    const styleGuide = await this.getStyleGuide();
    
    // Generate each component
    for (const [screenId, requirements] of Object.entries(componentRequirements)) {
      components[screenId] = {};
      
      for (const componentSpec of requirements.components) {
        // Build prompt with template
        const filledPrompt = this.promptTemplate
          .replace('{{componentSpec}}', JSON.stringify(componentSpec, null, 2))
          .replace('{{applicationSchemas}}', applicationSchemas)
          .replace('{{styleGuide}}', styleGuide);
        
        // Call Claude
        const response = await this.claude.callClaude(this.systemPrompt, filledPrompt);
        
        // Extract component code from Claude's response
        const componentCode = this.extractComponentCode(response.text);
        
        // Save component code to a file
        const filename = `${componentSpec.componentId}.jsx`;
        await this.saveOutput(componentCode, filename);
        
        components[screenId][componentSpec.componentId] = {
          code: componentCode,
          filename
        };
      }
    }
    
    return { components };
  }
  
  async getApplicationSchemas() {
    try {
      return await fs.readFile('data-schemas.json', 'utf8');
    } catch (error) {
      console.error(`[${this.name}] Error reading application schemas:`, error);
      return '{}';
    }
  }
  
  async getStyleGuide() {
    try {
      return await fs.readFile('style-guide.md', 'utf8');
    } catch (error) {
      console.error(`[${this.name}] No style guide found, using default`);
      return '# Default Style Guide\n- Use functional components with hooks\n- Use styled-components for styling\n';
    }
  }
  
  extractComponentCode(response) {
    // This would parse Claude's response to extract component code
    const codeMatch = response.match(/```jsx\n([\s\S]+?)\n```/) || 
                     response.match(/```javascript\n([\s\S]+?)\n```/) ||
                     response.match(/```js\n([\s\S]+?)\n```/) ||
                     response.match(/```\n([\s\S]+?)\n```/);
                     
    return codeMatch ? codeMatch[1] : 'Failed to extract component code';
  }
}

/**
 * Tester Agent - Creates tests for components and user flows
 */
class TesterAgent extends Agent {
  constructor(claudeInterface) {
    super('TesterAgent', claudeInterface);
    this.systemPrompt = agentPrompts.testerAgent.systemPrompt;
    this.promptTemplate = agentPrompts.testerAgent.promptTemplate;
  }
  
  async run(input) {
    const { components, journeySpec } = input;
    const tests = {};
    
    for (const [screenId, screenComponents] of Object.entries(components)) {
      tests[screenId] = {};
      
      for (const [componentId, component] of Object.entries(screenComponents)) {
        // Build prompt with template
        const filledPrompt = this.promptTemplate
          .replace('{{componentCode}}', component.code)
          .replace('{{journeySpec}}', JSON.stringify(journeySpec, null, 2));
        
        // Call Claude
        const response = await this.claude.callClaude(this.systemPrompt, filledPrompt);
        
        // Extract test code from Claude's response
        const testCode = this.extractTestCode(response.text);
        
        // Save test code to a file
        const filename = `${componentId}.test.js`;
        await this.saveOutput(testCode, filename);
        
        tests[screenId][componentId] = {
          test: testCode,
          filename
        };
      }
    }
    
    return { tests };
  }
  
  extractTestCode(response) {
    // This would parse Claude's response to extract test code
    const testMatch = response.match(/```jsx\n([\s\S]+?)\n```/) || 
                     response.match(/```javascript\n([\s\S]+?)\n```/) ||
                     response.match(/```js\n([\s\S]+?)\n```/) ||
                     response.match(/```\n([\s\S]+?)\n```/);
                     
    return testMatch ? testMatch[1] : 'Failed to extract test code';
  }
}

/**
 * Reviewer Agent - Reviews code for quality and standards
 */
class ReviewerAgent extends Agent {
  constructor(claudeInterface) {
    super('ReviewerAgent', claudeInterface);
    this.systemPrompt = agentPrompts.reviewerAgent.systemPrompt;
    this.promptTemplate = agentPrompts.reviewerAgent.promptTemplate;
  }
  
  async run(input) {
    const { components } = input;
    const reviews = {};
    
    // Get style guide
    const styleGuide = await this.getStyleGuide();
    
    for (const [screenId, screenComponents] of Object.entries(components)) {
      reviews[screenId] = {};
      
      for (const [componentId, component] of Object.entries(screenComponents)) {
        // Build prompt with template
        const filledPrompt = this.promptTemplate
          .replace('{{codeToReview}}', component.code)
          .replace('{{styleGuide}}', styleGuide);
        
        // Call Claude
        const response = await this.claude.callClaude(this.systemPrompt, filledPrompt);
        
        // Save review to a file
        const filename = `${componentId}-review.md`;
        await this.saveOutput(response.text, filename);
        
        reviews[screenId][componentId] = {
          review: response.text,
          filename
        };
      }
    }
    
    return { reviews };
  }
  
  async getStyleGuide() {
    try {
      return await fs.readFile('style-guide.md', 'utf8');
    } catch (error) {
      console.error(`[${this.name}] No style guide found, using default`);
      return '# Default Style Guide\n- Use functional components with hooks\n- Use styled-components for styling\n';
    }
  }
}

/**
 * Schema Validator Agent - Validates data against schemas
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
    
    // Extract validation code from Claude's response
    const validationCode = this.extractValidationCode(response.text);
    
    // Save validation code to a file
    const filename = `validation-${Date.now()}.js`;
    await this.saveOutput(validationCode, filename);
    
    return { 
      validation: validationCode,
      filename,
      validationReport: response.text
    };
  }
  
  async getApplicationSchemas() {
    try {
      return await fs.readFile('data-schemas.json', 'utf8');
    } catch (error) {
      console.error(`[${this.name}] Error reading application schemas:`, error);
      return '{}';
    }
  }
  
  extractValidationCode(response) {
    // This would parse Claude's response to extract validation code
    const codeMatch = response.match(/```typescript\n([\s\S]+?)\n```/) || 
                     response.match(/```javascript\n([\s\S]+?)\n```/) ||
                     response.match(/```js\n([\s\S]+?)\n```/) ||
                     response.match(/```\n([\s\S]+?)\n```/);
                     
    return codeMatch ? codeMatch[1] : 'Failed to extract validation code';
  }
}

/**
 * Agent Workflow Orchestrator - Manages the flow between agents
 */
class AgentWorkflowOrchestrator {
  constructor(claudeInterface) {
    this.claude = claudeInterface;
    this.agents = {
      planner: new PlannerAgent(this.claude),
      journeyInterpreter: new JourneyInterpreterAgent(this.claude),
      componentGenerator: new ComponentGeneratorAgent(this.claude),
      tester: new TesterAgent(this.claude),
      reviewer: new ReviewerAgent(this.claude),
      schemaValidator: new SchemaValidatorAgent(this.claude)
    };
  }
  
  async runCompleteWorkflow(requirements) {
    console.log("[Orchestrator] Starting complete workflow");
    console.log("[Orchestrator] Requirements:", requirements);
    
    try {
      // 1. Planner creates journey specification
      console.log("[Orchestrator] Running Planner Agent");
      const plannerOutput = await this.agents.planner.run({ requirements });
      
      // 2. Journey Interpreter converts to component requirements
      console.log("[Orchestrator] Running Journey Interpreter Agent");
      const interpreterOutput = await this.agents.journeyInterpreter.run({ 
        journeySpec: plannerOutput.journeySpec 
      });
      
      // 3. Component Generator creates components
      console.log("[Orchestrator] Running Component Generator Agent");
      const generatorOutput = await this.agents.componentGenerator.run({ 
        componentRequirements: interpreterOutput.componentRequirements 
      });
      
      // 4. Tester creates tests for components
      console.log("[Orchestrator] Running Tester Agent");
      const testerOutput = await this.agents.tester.run({ 
        components: generatorOutput.components,
        journeySpec: plannerOutput.journeySpec
      });
      
      // 5. Reviewer reviews the code
      console.log("[Orchestrator] Running Reviewer Agent");
      const reviewerOutput = await this.agents.reviewer.run({ 
        components: generatorOutput.components 
      });
      
      console.log("[Orchestrator] Workflow completed successfully");
      
      return {
        journey: plannerOutput,
        requirements: interpreterOutput,
        components: generatorOutput,
        tests: testerOutput,
        reviews: reviewerOutput
      };
    } catch (error) {
      console.error("[Orchestrator] Workflow failed:", error);
      return { error: error.message };
    }
  }
  
  async validateDataStructure(dataStructure) {
    console.log("[Orchestrator] Starting data validation");
    
    try {
      const validationOutput = await this.agents.schemaValidator.run({ dataStructure });
      console.log("[Orchestrator] Validation completed");
      return validationOutput;
    } catch (error) {
      console.error("[Orchestrator] Validation failed:", error);
      return { error: error.message };
    }
  }
}

module.exports = {
  Agent,
  ClaudeInterface,
  PlannerAgent,
  JourneyInterpreterAgent,
  ComponentGeneratorAgent,
  TesterAgent,
  ReviewerAgent,
  SchemaValidatorAgent,
  AgentWorkflowOrchestrator
};
