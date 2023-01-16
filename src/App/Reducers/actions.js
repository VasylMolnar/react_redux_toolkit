import { INCREMENT, DECREMENT, RESET, AMOUNT } from './type';

export const increment = () => {
  return { type: INCREMENT };
};

export const decrement = () => {
  return { type: DECREMENT };
};

export const amount = newCounter => {
  return { type: AMOUNT, payload: newCounter };
};

export const reset = () => {
  return { type: RESET };
};
