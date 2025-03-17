import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme?.colors?.accent || '#f5f5f5'};
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme?.colors?.text || '#333333'};
  text-decoration: none;
  margin: 0 1rem;
  font-size: 0.875rem;
  
  &:hover {
    color: ${props => props.theme?.colors?.primary || '#0070f3'};
    text-decoration: underline;
  }
`;

const FooterText = styled.p`
  color: ${props => props.theme?.colors?.text || '#333333'};
  font-size: 0.875rem;
  margin: 0.5rem 0;
`;

const TMDBLogo = styled.div`
  margin-top: 1rem;
  
  img {
    height: 1.5rem;
  }
`;

/**
 * Footer component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/search">Search</FooterLink>
          <FooterLink to="/favorites">Favorites</FooterLink>
        </FooterLinks>
        
        <FooterText>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </FooterText>
        
        <FooterText>
          &copy; {currentYear} MovieApp. All rights reserved.
        </FooterText>
        
        <TMDBLogo>
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
              alt="TMDB Logo" 
            />
          </a>
        </TMDBLogo>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 