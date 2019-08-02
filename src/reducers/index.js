import { combineReducers } from 'redux';
import user from './user';
import products from './products';
import company from './company';

const rootReducer = combineReducers({
  user,
  products,
  company
});

export default rootReducer;