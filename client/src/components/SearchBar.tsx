import React from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Col xs={12} md={8}>
      <StyledWrapper>
        <label className="label">
          <div className="shortcut">🔍</div>
          <input
            type="text"
            className="search_bar"
            placeholder="Select your characters..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
      </StyledWrapper>
    </Col>
  );
};

const StyledWrapper = styled.div`
  .label {
    position: relative;
    display: block;
    width: 280px;
    border-radius: 10px;
    border: 2px solid #5e5757;
    padding: 15px 8px 15px 10px;
    text-align: left;
    box-shadow:
      20px 12px 40px #ffdd33,
      -20px -12px 40px #d6341e;
  }

  .shortcut {
    position: absolute;
    top: 50%;
    right: -3%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
    color: #c5c5c5;
    background-color: #5e5757;
    padding: 0.3em;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .search_bar {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: rgb(111, 115, 119);
    width: 100%;
    font-family: bangers;
    letter-spacing: 1px;
  }
`;

export default SearchBar;
