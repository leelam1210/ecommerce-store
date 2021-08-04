import { actionTypes } from '../actions/auth';

const initialState = {
  authData: null,
  userInfor: null,
};
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        authData: payload?.data,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        authData: payload?.data,
      };
    case actionTypes.GET_INFOR_USER_SUCCESS:
      return {
        ...state,
        userInfor: payload?.data,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        authData: null,
        userInfor: null,
      };
    default:
      return state;
  }
};

export default authReducer;
