import { useState, React } from 'react';
import Button from '../components/Ul/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Ul/Input/Input';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.counter);
  const [newCounter, setNewCounter] = useState(0);

  //console.log(useSelector(state => state));
  return (
    <section className="section counter">
      <div className="container text-center">
        <div>
          <h1>{counter}</h1>
          <Button onClick={() => dispatch({ type: '+' })}>+</Button>
          <Button onClick={() => dispatch({ type: '-' })}>-</Button>
        </div>

        <Input
          value={newCounter}
          onChange={e => setNewCounter(Number(e.target.value))}
          type="Number"
          placeholder="Number"
        />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            onClick={() => dispatch({ type: 'amount', payload: newCounter })}
          >
            Add Amount
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: 'reset' });
              setNewCounter(0);
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Counter;
