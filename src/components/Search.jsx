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
        className="input"
        type="text"
        placeholder="Search"
        onChange={debounce(e => {
          setSearchValue(e.target.value);
        }, 300)}
      />

      <Button type="submit" className="btn btn-primary">
        Reset
      </Button>
    </form>
  );
};

export default Search;
