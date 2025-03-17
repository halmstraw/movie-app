import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/common/Button';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1rem;
  min-height: 50vh;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  margin: 0;
  color: ${props => props.theme?.colors?.primary || '#0070f3'};
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 1rem 0 2rem;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const Description = styled.p`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  max-width: 600px;
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

/**
 * NotFoundPage component
 */
const NotFoundPage = () => {
  return (
    <MainLayout>
      <NotFoundContainer>
        <ErrorCode>404</ErrorCode>
        <Title>Page Not Found</Title>
        <Description>
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </Description>
        <ButtonContainer>
          <Button as={Link} to="/">
            Go to Home
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </ButtonContainer>
      </NotFoundContainer>
    </MainLayout>
  );
};

export default NotFoundPage; 