import React from "react";
import { Form, Row } from "react-bootstrap";
import SearchBar from "./SearchBar";
import SearchButton from "./SearchButton";

interface SearchFormProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ value, onChange, onSubmit, isLoading }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <SearchBar value={value} onChange={onChange} />
        <SearchButton isLoading={isLoading} />
      </Row>
    </Form>
  );
};

export default SearchForm;
