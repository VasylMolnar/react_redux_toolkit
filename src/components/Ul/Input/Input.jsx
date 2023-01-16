import { React } from 'react';
import './index.css';

const Input = ({ ...props }) => {
  return <input {...props} className="input" />;
};

export default Input;
