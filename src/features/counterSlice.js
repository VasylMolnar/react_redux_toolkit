import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.count++;
    },

    decrement: state => {
      state.count--;
    },

    incrementByAmount: (state, action) => {
      state.count += Number(action.payload);
    },

    reset: state => {
      state.count = 0;
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

export default counterSlice.reducer;
