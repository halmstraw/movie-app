import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme?.colors?.background || '#ffffff'};
  color: ${props => props.theme?.colors?.text || '#333333'};
`;

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

/**
 * MainLayout component - Wraps all pages with header and footer
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 */
const MainLayout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </LayoutContainer>
  );
};

export default MainLayout; 