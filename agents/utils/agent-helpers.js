// agent-helpers.js - Utility functions for working with the AI agents

const fs = require('fs').promises;
const path = require('path');

/**
 * Load a journey specification from a file
 * @param {string} filename - The name of the journey specification file
 * @returns {Promise<object>} - The journey specification
 */
async function loadJourneySpec(filename) {
  try {
    const filePath = path.join('agents', 'specs', filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading journey specification:', error);
    throw error;
  }
}

/**
 * Load a component specification from a file
 * @param {string} filename - The name of the component specification file
 * @returns {Promise<object>} - The component specification
 */
async function loadComponentSpec(filename) {
  try {
    const filePath = path.join('agents', 'specs', filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading component specification:', error);
    throw error;
  }
}

/**
 * Save a generated component to the src directory
 * @param {string} componentCode - The component code
 * @param {string} componentName - The name of the component
 * @param {string} directory - The directory to save the component to
 * @returns {Promise<string>} - The path to the saved component
 */
async function saveGeneratedComponent(componentCode, componentName, directory = 'components') {
  try {
    const dirPath = path.join('src', directory);
    await fs.mkdir(dirPath, { recursive: true });
    
    const filePath = path.join(dirPath, `${componentName}.js`);
    await fs.writeFile(filePath, componentCode);
    
    console.log(`Component saved to ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('Error saving generated component:', error);
    throw error;
  }
}

/**
 * Save a generated test to the src directory
 * @param {string} testCode - The test code
 * @param {string} componentName - The name of the component
 * @param {string} directory - The directory to save the test to
 * @returns {Promise<string>} - The path to the saved test
 */
async function saveGeneratedTest(testCode, componentName, directory = 'components') {
  try {
    const dirPath = path.join('src', directory, '__tests__');
    await fs.mkdir(dirPath, { recursive: true });
    
    const filePath = path.join(dirPath, `${componentName}.test.js`);
    await fs.writeFile(filePath, testCode);
    
    console.log(`Test saved to ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('Error saving generated test:', error);
    throw error;
  }
}

/**
 * Extract code blocks from Claude's response
 * @param {string} text - The text to extract code blocks from
 * @param {string} language - The language of the code blocks to extract
 * @returns {string[]} - The extracted code blocks
 */
function extractCodeBlocks(text, language = 'javascript') {
  const codeBlockRegex = new RegExp(`\`\`\`(?:${language}|jsx|js)\\n([\\s\\S]+?)\\n\`\`\``, 'g');
  const matches = [];
  let match;
  
  while ((match = codeBlockRegex.exec(text)) !== null) {
    matches.push(match[1]);
  }
  
  return matches;
}

/**
 * Format a component name to PascalCase
 * @param {string} name - The name to format
 * @returns {string} - The formatted name
 */
function formatComponentName(name) {
  return name
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

module.exports = {
  loadJourneySpec,
  loadComponentSpec,
  saveGeneratedComponent,
  saveGeneratedTest,
  extractCodeBlocks,
  formatComponentName
}; 