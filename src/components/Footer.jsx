import React from 'react';

const Footer = () => {
  const today = new Date();
  return (
    <div>
      <footer className="Footer">
        <div className="container text-center">
          <p>Copyright &copy; {today.getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
