import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  /* Variant styles */
  background-color: ${props => {
    if (props.variant === 'outlined') return 'transparent';
    if (props.variant === 'text') return 'transparent';
    return props.theme?.colors?.primary || '#0070f3';
  }};
  
  color: ${props => {
    if (props.variant === 'outlined' || props.variant === 'text') {
      return props.theme?.colors?.primary || '#0070f3';
    }
    return '#ffffff';
  }};
  
  border: ${props => {
    if (props.variant === 'outlined') {
      return `1px solid ${props.theme?.colors?.primary || '#0070f3'}`;
    }
    if (props.variant === 'text') return 'none';
    return 'none';
  }};
  
  /* Size styles */
  font-size: ${props => {
    if (props.size === 'small') return '0.875rem';
    if (props.size === 'large') return '1.125rem';
    return '1rem';
  }};
  
  padding: ${props => {
    if (props.size === 'small') return '0.25rem 0.5rem';
    if (props.size === 'large') return '0.75rem 1.5rem';
    return '0.5rem 1rem';
  }};
  
  /* Disabled state */
  opacity: ${props => props.disabled ? 0.6 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  /* Full width */
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  /* Hover state */
  &:hover {
    background-color: ${props => {
      if (props.disabled) return props.variant === 'outlined' || props.variant === 'text' ? 'transparent' : props.theme?.colors?.primary || '#0070f3';
      if (props.variant === 'outlined') return 'rgba(0, 112, 243, 0.1)';
      if (props.variant === 'text') return 'rgba(0, 112, 243, 0.1)';
      return '#0062d3';
    }};
  }
  
  /* Focus state */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.3);
  }
`;

/**
 * Button component
 * @param {object} props - Component props
 * @param {string} [props.variant='contained'] - Button variant (contained, outlined, text)
 * @param {string} [props.size='medium'] - Button size (small, medium, large)
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {boolean} [props.fullWidth=false] - Whether the button should take full width
 * @param {function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 */
const Button = ({
  variant = 'contained',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
  children,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 