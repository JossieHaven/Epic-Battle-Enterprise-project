import React from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";

interface SearchButtonProps {
  isLoading: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({ isLoading }) => {
  return (
    <Col xs={12} md={4}>
      <StyledWrapper>
        <button className="pushable" type="submit">
          <span className="shadow" />
          <span className="edge" />
          <span className="front">{isLoading ? "Searching..." : "GO!"}</span>
        </button>
      </StyledWrapper>
    </Col>
  );
};

const StyledWrapper = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');

  .pushable {
    position: relative;
    background: transparent;
    padding: 0px;
    border: none;
    cursor: pointer;
    outline-offset: 4px;
    outline-color: deeppink;
    transition: filter 250ms;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: hsl(226, 25%, 69%);
    border-radius: 8px;
    filter: blur(2px);
    will-change: transform;
    transform: translateY(2px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }

   .edge {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 8px;
    background: linear-gradient(
      to right,
      hsl(30, 70%, 40%) 0%,  /* Dark Orange */
      hsl(30, 90%, 50%) 8%,  /* Brighter Orange */
      hsl(30, 90%, 40%) 92%, /* Slightly Darker */
      hsl(30, 70%, 35%) 100% /* Even Darker */
    );
  }

  .front {
    display: block;
    position: relative;
    border-radius: 8px;
    background: linear-gradient(
      to right,
      hsl(28, 100%, 60%), /* Bright Orange */
      hsl(35, 100%, 50%) 50%, /* Yellow-Orange */
      hsl(25, 100%, 45%) 100% /* Deep Orange */
    ); /* Orange Gradient */
    padding: 16px 32px;
    color: white;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 1rem;
    transform: translateY(-4px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
     /* Apply Bangers Font */
    font-family: 'Bangers', cursive;
    letter-spacing: 7px;
    font-size: 1.5rem; /* Bigger for comic-style effect */
  }

  .pushable:hover {
    filter: brightness(110%);
  }

  .pushable:hover .front {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  .pushable:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }

  .pushable:hover .shadow {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  .pushable:active .shadow {
    transform: translateY(1px);
    transition: transform 34ms;
  }

  .pushable:focus:not(:focus-visible) {
    outline: none;
  }
`;

export default SearchButton;
