import { DECREMENT, INCREMENT, AMOUNT, RESET } from './type';

const initialState = {
  counter: 0,
};

const counter = (state = initialState, action) => {
  //console.log(action);
  //console.log(state);
  switch (action.type) {
    case INCREMENT:
      return { counter: state.counter + 1 };
    case DECREMENT:
      return { counter: state.counter - 1 };
    case AMOUNT:
      return { counter: state.counter + action.payload };
    case RESET:
      return { counter: (state.counter = 0) };
    default:
      return state;
  }
};

export default counter;
