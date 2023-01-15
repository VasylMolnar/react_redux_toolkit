import React from 'react';
import Button from '../components/Ul/Button/Button';
import { useDispatch, useSelector } from 'react-redux';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.counter);

  return (
    <section className="section counter">
      <div className="container text-center">
        <h1>{counter}</h1>
        <Button onClick={() => dispatch({ type: '+' })}>+</Button>
        <Button onClick={() => dispatch({ type: '-' })}>-</Button>
      </div>
    </section>
  );
};

export default Counter;
