import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className="header">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand">
              Counter
            </NavLink>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <NavLink to="/about" className="nav-link active">
                  About
                </NavLink>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
