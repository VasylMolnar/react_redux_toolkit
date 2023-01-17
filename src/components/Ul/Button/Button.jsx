import React from 'react';
import './index.css';

const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default Button;
