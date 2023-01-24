import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ padding: '10px' }}
    >
      <NavLink to="/" className="navbar-brand">
        Posts
      </NavLink>
      <NavLink to="posts" className="navbar-brand">
        New Post
      </NavLink>
      <NavLink to="/about" className="navbar-brand">
        About
      </NavLink>
    </nav>
  );
};

export default Nav;
