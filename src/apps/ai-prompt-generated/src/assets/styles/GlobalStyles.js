import { createGlobalStyle } from 'styled-components';

/**
 * Global styles for the application
 */
const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    background-color: ${props => props.theme?.colors?.background || '#ffffff'};
    color: ${props => props.theme?.colors?.text || '#333333'};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  a {
    color: ${props => props.theme?.colors?.primary || '#0070f3'};
    text-decoration: none;
  }
  
  button {
    cursor: pointer;
    font-family: inherit;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${props => props.theme?.colors?.background || '#ffffff'};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme?.colors?.border || '#e0e0e0'};
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #999999;
  }
`;

export default GlobalStyles; 