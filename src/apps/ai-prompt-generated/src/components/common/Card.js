import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  background-color: ${props => props.theme?.colors?.card || '#ffffff'};
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  /* Hover effect if interactive */
  ${props => props.interactive && `
    cursor: pointer;
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }
  `}
  
  /* Border if outlined */
  ${props => props.outlined && `
    box-shadow: none;
    border: 1px solid ${props.theme?.colors?.border || '#e0e0e0'};
  `}
`;

const CardHeader = styled.div`
  padding: 1rem;
  border-bottom: ${props => props.divider ? `1px solid ${props.theme?.colors?.border || '#e0e0e0'}` : 'none'};
`;

const CardMedia = styled.div`
  position: relative;
  width: 100%;
  
  img {
    width: 100%;
    height: ${props => props.height || 'auto'};
    object-fit: cover;
    display: block;
  }
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardFooter = styled.div`
  padding: 1rem;
  border-top: ${props => props.divider ? `1px solid ${props.theme?.colors?.border || '#e0e0e0'}` : 'none'};
`;

/**
 * Card component
 * @param {object} props - Component props
 * @param {boolean} [props.interactive=false] - Whether the card has hover effects
 * @param {boolean} [props.outlined=false] - Whether the card has an outline instead of shadow
 * @param {function} [props.onClick] - Click handler for interactive cards
 * @param {React.ReactNode} props.children - Card content
 */
const Card = ({
  interactive = false,
  outlined = false,
  onClick,
  children,
  ...rest
}) => {
  return (
    <StyledCard
      interactive={interactive}
      outlined={outlined}
      onClick={interactive ? onClick : undefined}
      {...rest}
    >
      {children}
    </StyledCard>
  );
};

Card.Header = CardHeader;
Card.Media = CardMedia;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card; 