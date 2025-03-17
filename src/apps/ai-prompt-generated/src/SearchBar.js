import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: ${props => props.maxWidth || '600px'};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-size: 1rem;
  border: 1px solid ${props => props.theme?.colors?.border || '#e0e0e0'};
  border-radius: 0.5rem;
  background-color: ${props => props.theme?.colors?.background || '#ffffff'};
  color: ${props => props.theme?.colors?.text || '#333333'};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme?.colors?.primary || '#0070f3'};
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.2);
  }
  
  &::placeholder {
    color: #999999;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #999999;
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  
  &:hover {
    color: #666666;
  }
  
  &:focus {
    outline: none;
  }
`;

/**
 * SearchBar component
 * @param {object} props - Component props
 * @param {string} [props.placeholder='Search...'] - Placeholder text
 * @param {string} [props.value=''] - Input value
 * @param {function} props.onChange - Change handler function
 * @param {function} [props.onSubmit] - Submit handler function
 * @param {string} [props.maxWidth] - Maximum width of the search bar
 */
const SearchBar = ({
  placeholder = 'Search...',
  value = '',
  onChange,
  onSubmit,
  maxWidth,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(value);
  
  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };
  
  const handleClear = () => {
    setInputValue('');
    if (onChange) {
      onChange('');
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(inputValue);
    }
  };
  
  return (
    <SearchContainer maxWidth={maxWidth} {...rest}>
      <SearchIcon>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <ClearButton show={inputValue.length > 0} onClick={handleClear}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </ClearButton>
    </SearchContainer>
  );
};

export default SearchBar; 