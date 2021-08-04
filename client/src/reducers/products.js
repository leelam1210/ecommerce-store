import { actionTypes } from '../actions/products';

const initialState = {
  products: [],
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_ALL_SUCCESS:
      return {
        ...state,
        products: payload?.data?.products,
      };
    default:
      return state;
  }
};

export default productReducer;
