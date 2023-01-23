import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ padding: '10px' }}
    >
      <NavLink to="/" className="navbar-brand">
        Counter
      </NavLink>
      <NavLink to="/about" className="navbar-brand">
        About
      </NavLink>
    </nav>
  );
};

export default Nav;
