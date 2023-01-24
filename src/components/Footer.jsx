import React from 'react';
import { Outlet } from 'react-router-dom';

const Footer = () => {
  const today = new Date();
  return (
    <div>
      <footer className="Footer">
        <div className="container text-center">
          <p>Copyright &copy; {today.getFullYear()}</p>
        </div>
      </footer>
      <Outlet />
    </div>
  );
};

export default Footer;
