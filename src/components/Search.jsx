import React from 'react';
import Input from './Ul/Input/Input';
import Button from './Ul/Button/Button';

const Search = () => {
  return (
    <div className="search">
      <Input type="text" placeholder="Search" />
      <Button className="btn btn-primary">Search</Button>
    </div>
  );
};

export default Search;
