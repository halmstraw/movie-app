module.exports = {
  // Transform ESM modules
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|react-router-dom|@remix-run)/)"
  ],
  // Mock CSS and image imports
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/fileMock.js"
  },
  // Set test environment
  testEnvironment: "jsdom"
}; 