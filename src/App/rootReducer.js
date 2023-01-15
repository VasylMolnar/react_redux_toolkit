import { combineReducers } from 'redux';
import counter from './Reducers/counterReducer';

export const rootReducer = combineReducers({
  counter: counter,
});
