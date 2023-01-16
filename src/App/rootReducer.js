import { combineReducers } from 'redux';
import counterReducer from './Reducers/counterReducer';

export const rootReducer = combineReducers({
  counter: counterReducer,
});
