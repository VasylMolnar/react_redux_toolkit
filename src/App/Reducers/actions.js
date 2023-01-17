import {
  INCREMENT,
  DECREMENT,
  RESET,
  AMOUNT,
  DELETE_POST,
  NEW_POST,
} from './type';

//counter
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

//posts
export const deletePost = id => {
  return { type: DELETE_POST, payload: id };
};

export const newPost = e => {
  //console.log(action.payload.currentTarget.elements.title.value); form elements
  const data = Date.now();
  e.preventDefault();

  const newPost = {
    title: e.currentTarget.elements.title.value,
    body: e.currentTarget.elements.body.value,
    datetime: data,
  };

  return { type: NEW_POST, payload: newPost };
};
