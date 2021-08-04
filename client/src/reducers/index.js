import { combineReducers } from 'redux';
import authReducer from './auth';
import productReducer from './products';
import categoryReducer from './category';

const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
  category: categoryReducer,
});

export default rootReducer;
