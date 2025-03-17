import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.padding || '1rem'};
`;

const Spinner = styled.div`
  width: ${props => {
    if (props.size === 'small') return '1.5rem';
    if (props.size === 'large') return '3rem';
    return '2rem';
  }};
  
  height: ${props => {
    if (props.size === 'small') return '1.5rem';
    if (props.size === 'large') return '3rem';
    return '2rem';
  }};
  
  border: ${props => {
    const borderWidth = props.size === 'small' ? '2px' : props.size === 'large' ? '4px' : '3px';
    return `${borderWidth} solid rgba(0, 0, 0, 0.1)`;
  }};
  
  border-top-color: ${props => props.theme?.colors?.primary || '#0070f3'};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 0.75rem;
  font-size: ${props => props.size === 'small' ? '0.875rem' : props.size === 'large' ? '1.25rem' : '1rem'};
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

/**
 * Loading spinner component
 * @param {object} props - Component props
 * @param {string} [props.size='medium'] - Size of the spinner (small, medium, large)
 * @param {string} [props.text] - Optional text to display below the spinner
 * @param {string} [props.padding] - Custom padding for the container
 */
const Loading = ({
  size = 'medium',
  text,
  padding,
  ...rest
}) => {
  return (
    <LoadingContainer padding={padding} {...rest}>
      <Spinner size={size} />
      {text && <LoadingText size={size}>{text}</LoadingText>}
    </LoadingContainer>
  );
};

export default Loading;