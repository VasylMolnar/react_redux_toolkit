import {
  INCREMENT,
  DECREMENT,
  RESET,
  AMOUNT,
  DELETE_POST,
  NEW_POST,
  UPDATE_POST,
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
  const data = new Date().toString();
  e.preventDefault();

  const newPost = {
    title: e.currentTarget.elements.title.value,
    body: e.currentTarget.elements.body.value,
    datetime: data,
  };

  return { type: NEW_POST, payload: newPost };
};

export const updatePost = (id, e) => {
  e.preventDefault();
  const data = new Date().toString();

  const updatePost = {
    id: id,
    datetime: data,
    title: e.currentTarget.elements.title.value,
    body: e.currentTarget.elements.body.value,
  };

  return { type: UPDATE_POST, payload: updatePost };
};

export const sortPost = () => {
  return {};
};
