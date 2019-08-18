import { combineReducers } from 'redux';
import user from './user';
import products from './products';
import company from './company';
import userProducts from './userProductRelation';

const rootReducer = combineReducers({
  user,
  products,
  company,
  userProducts
});

export default rootReducer;