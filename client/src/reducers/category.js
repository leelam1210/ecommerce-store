import { actionTypes } from '../actions/category';

const initialState = {
  categories: [],
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: payload?.data,
      };
    default:
      return state;
  }
};

export default categoryReducer;
