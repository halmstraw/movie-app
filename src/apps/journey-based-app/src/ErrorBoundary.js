import React, { Component } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const ErrorTitle = styled.h1`
  color: #e53935;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const ErrorDetails = styled.pre`
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  text-align: left;
  overflow: auto;
  margin-bottom: 1.5rem;
`;

const ReloadButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #0060df;
  }
`;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but an error occurred while rendering this page.
          </ErrorMessage>
          {this.state.error && (
            <ErrorDetails>
              {this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </ErrorDetails>
          )}
          <ReloadButton onClick={this.handleReload}>
            Reload Page
          </ReloadButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 