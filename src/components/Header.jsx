import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Nav from './Ul/Nav/Nav';

const Header = () => {
  return (
    <>
      <div className="header">
        <Nav />
      </div>
      <Outlet />
    </>
  );
};

export default Header;
