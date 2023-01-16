import { combineReducers } from 'redux';
import counterReducer from './Reducers/counterReducer';
import postsReducer from './Reducers/postsReducer';

export const rootReducer = combineReducers({
  counter: counterReducer,
  posts: postsReducer,
});
