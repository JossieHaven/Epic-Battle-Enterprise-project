import React from "react";
import { Form, Col } from "react-bootstrap";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Col xs={12} md={8}>
      <Form.Control
        name="searchInput"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        size="lg"
        placeholder="Search for a character"
      />
    </Col>
  );
};

export default SearchBar;
