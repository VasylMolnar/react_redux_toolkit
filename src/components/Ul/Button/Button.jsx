import React from 'react';
import './index.css';

const Button = ({ children, ...props }) => {
  return (
    <button {...props} type="button">
      {children}
    </button>
  );
};

export default Button;
