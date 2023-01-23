import { useState, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from '../features/counterSlice';
import Button from '../components/Ul/Button/Button';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.count);
  const [incrementAmount, setIncrementAmount] = useState(0);

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <section className="counter section">
      <div className="container text-center">
        <p style={{ fontSize: '24px' }}>{count}</p>
        <div className="content">
          <Button onClick={() => dispatch(increment())}>+</Button>
          <Button onClick={() => dispatch(decrement())}>-</Button>
        </div>

        <input
          type="number"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
          style={{ width: '300px', height: '50px', margin: '30px' }}
        />

        <div>
          <Button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
            Add Amount
          </Button>
          <Button onClick={resetAll}>Reset</Button>
        </div>
      </div>
    </section>
  );
};

export default Counter;
