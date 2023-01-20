import React from 'react';
import Input from './Ul/Input/Input';
import Button from './Ul/Button/Button';
import { debounce } from 'lodash';

const Search = ({ setSearchValue }) => {
  return (
    <form
      className="search"
      onSubmit={e => {
        e.preventDefault();
        e.currentTarget.reset();
        setSearchValue('');
      }}
    >
      <Input
        type="text"
        placeholder="Search"
        onChange={debounce(e => {
          setSearchValue(e.target.value);
        }, 300)}
      />
      <Button className="btn btn-primary" type="submit">
        Reset
      </Button>
    </form>
  );
};

export default Search;
