import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <NavLink to="/" className="navbar-brand">
        Counter
      </NavLink>
      <NavLink to="posts" className="navbar-brand">
        Posts
      </NavLink>
      <NavLink to="newPost" className="navbar-brand">
        Create posts
      </NavLink>
      <NavLink to="/about" className="navbar-brand">
        About
      </NavLink>
    </nav>
  );
};

export default Nav;
