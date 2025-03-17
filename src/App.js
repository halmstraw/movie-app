import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

// Import the AI Prompt Generated app
import AIPromptGeneratedApp from './apps/AIPromptGeneratedApp';
// Import the Journey Based app
import JourneyBasedApp from './apps/JourneyBasedApp';

// Styled components for the homepage
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
`;

const AppGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const AppCard = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const AppImage = styled.div`
  height: 200px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #0070f3;
`;

const AppInfo = styled.div`
  padding: 1.5rem;
`;

const AppTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const AppDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const AppLink = styled(Link)`
  display: inline-block;
  background-color: #0070f3;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #0060df;
  }
`;

// Homepage component
const HomePage = () => {
  return (
    <Container>
      <Header>
        <Title>Movie App Implementations</Title>
        <Subtitle>
          Explore different implementations of the same movie application built using various approaches
        </Subtitle>
      </Header>
      
      <AppGrid>
        <AppCard>
          <AppImage>🤖</AppImage>
          <AppInfo>
            <AppTitle>AI Prompt Generated MovieApp</AppTitle>
            <AppDescription>
              A movie application built entirely through AI prompts, featuring search, favorites, and theme switching.
            </AppDescription>
            <AppLink to="/ai-prompt-generated">View App</AppLink>
          </AppInfo>
        </AppCard>
        
        <AppCard>
          <AppImage>🧭</AppImage>
          <AppInfo>
            <AppTitle>Journey-Based MovieApp</AppTitle>
            <AppDescription>
              A movie application built using a journey-based approach, focusing on user flows and experiences.
            </AppDescription>
            <AppLink to="/journey-based">View App</AppLink>
          </AppInfo>
        </AppCard>
        
        <AppCard>
          <AppImage>🚧</AppImage>
          <AppInfo>
            <AppTitle>Coming Soon</AppTitle>
            <AppDescription>
              Another implementation of the movie app will be available here soon.
            </AppDescription>
            <AppLink to="/" style={{ backgroundColor: '#999' }}>Coming Soon</AppLink>
          </AppInfo>
        </AppCard>
      </AppGrid>
    </Container>
  );
};

// Main App component with routing
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ai-prompt-generated/*" element={<AIPromptGeneratedApp />} />
        <Route path="/journey-based/*" element={<JourneyBasedApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; 