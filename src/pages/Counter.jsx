import { useState, React } from 'react';
import Button from '../components/Ul/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Ul/Input/Input';
import { amount, decrement, increment, reset } from '../app/Reducers/actions';

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
          <Button
            className="btn btn-secondary"
            onClick={() => dispatch(increment())}
          >
            +
          </Button>
          <Button
            className="btn btn-secondary"
            onClick={() => dispatch(decrement())}
          >
            -
          </Button>
        </div>

        <Input
          value={newCounter}
          onChange={e => setNewCounter(Number(e.target.value))}
          type="Number"
          placeholder="Number"
        />

        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className="btn-list"
        >
          <Button
            onClick={() => dispatch(amount(newCounter))}
            className="btn btn-success"
          >
            Add Amount
          </Button>
          <Button
            className="btn btn-success"
            onClick={() => {
              dispatch(reset());
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
