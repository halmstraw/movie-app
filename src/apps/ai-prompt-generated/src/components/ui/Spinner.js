import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
`;

const SpinnerElement = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${props => props.theme?.colors?.primary || '#007bff'};
  animation: ${spin} 1s ease-in-out infinite;
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerElement />
    </SpinnerContainer>
  );
};

export default Spinner; 