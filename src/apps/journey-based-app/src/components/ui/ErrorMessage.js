import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  background-color: ${props => props.theme?.colors?.error || '#f8d7da'};
  color: ${props => props.theme?.colors?.errorText || '#721c24'};
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  text-align: center;
`;

const ErrorMessage = ({ message = 'An error occurred. Please try again later.' }) => {
  return (
    <ErrorContainer>
      <p>{message}</p>
    </ErrorContainer>
  );
};

export default ErrorMessage; 