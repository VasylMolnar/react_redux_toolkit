const initialState = {
  counter: 0,
};

const counter = (state = initialState, action) => {
  //console.log(action);
  //console.log(state);
  switch (action.type) {
    case '+':
      return { counter: state.counter + 1 };
    case '-':
      return { counter: state.counter - 1 };
    case 'amount':
      return { counter: state.counter + action.payload };
    case 'reset':
      return { counter: (state.counter = 0) };
    default:
      return state;
  }
};

export default counter;
