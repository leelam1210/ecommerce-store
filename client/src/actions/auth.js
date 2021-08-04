import userApi from '../api/userApi';

export const actionTypes = {
    LOGIN: 'LOGIN',
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',

    REGISTER: 'REGISTER',
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_ERROR: 'REGISTER_ERROR',
    
    GET_INFOR_USER: 'GET_INFOR_USER',
    GET_INFOR_USER_REQUEST: 'GET_INFOR_USER_REQUEST',
    GET_INFOR_USER_SUCCESS: 'GET_INFOR_USER_SUCCESS',
    GET_INFOR_USER_ERROR: 'GET_INFOR_USER_ERROR',

    LOGOUT: 'LOGOUT',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_ERROR: 'LOGOUT_ERROR',

    ADD_CART: 'ADD_CART',
    ADD_CART_REQUEST: 'ADD_CART_REQUEST',
    ADD_CART_SUCCESS: 'ADD_CART_SUCCESS',
    ADD_CART_ERROR: 'ADD_CART_ERROR',

    GET_HISTORY: 'GET_HISTORY',
    GET_HISTORY_REQUEST: 'GET_HISTORY_REQUEST',
    GET_HISTORY_SUCCESS: 'GET_HISTORY_SUCCESS',
    GET_HISTORY_ERROR: 'GET_HISTORY_ERROR',
}

// ------------------------
export const loginRequest = () => ({
    type: actionTypes.LOGIN_REQUEST,
    payload: null,
});
export const loginSuccess = (data) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: { data },
});
export const loginError = (error) => ({
    type: actionTypes.LOGIN_ERROR,
    payload: { error },
});

export const registerRequest = () => ({
    type: actionTypes.REGISTER_REQUEST,
    payload: null,
});
export const registerSuccess = (data) => ({
    type: actionTypes.REGISTER_SUCCESS,
    payload: {data},
});
export const registerError = (error) => ({
    type: actionTypes.REGISTER_ERROR,
    payload: { error },
});

export const logoutRequest = () => ({
    type: actionTypes.LOGOUT_REQUEST,
    payload: null,
});
export const logoutSuccess = () => ({
    type: actionTypes.LOGOUT_SUCCESS,
    payload: null,
});
export const logoutError = (error) => ({
    type: actionTypes.LOGOUT_ERROR,
    payload: { error },
});

export const getInforUserRequest = () => ({
    type: actionTypes.GET_INFOR_USER_REQUEST,
    payload: null,
});
export const getInforUserSuccess = (data) => ({
    type: actionTypes.GET_INFOR_USER_SUCCESS,
    payload: {data},
});
export const getInforUserError = (error) => ({
    type: actionTypes.GET_INFOR_USER_ERROR,
    payload: { error },
});

export const addCartRequest = () => ({
    type: actionTypes.ADD_CART_REQUEST,
    payload: null,
});
export const addCartSuccess = (data) => ({
    type: actionTypes.ADD_CART_SUCCESS,
    payload: {data},
});
export const addCartError = (error) => ({
    type: actionTypes.ADD_CART_ERROR,
    payload: { error },
});

export const getHistoryRequest = () => ({
    type: actionTypes.GET_HISTORY_REQUEST,
    payload: null,
});
export const getHistorySuccess = (data) => ({
    type: actionTypes.GET_HISTORY_SUCCESS,
    payload: { data},
});
export const getHistoryError = (error) => ({
    type: actionTypes.GET_HISTORY_ERROR,
    payload: { error },
});
// ----------------------------------
export const login = (formData, router) => async (dispatch) => {
    
    dispatch(loginRequest);
    try {
      const data = await userApi.login(formData);
      dispatch(loginSuccess(data));
  
      router.push('/');
    } catch (error) {
      dispatch(loginError(error.message));
      throw error;  
    }
};

export const register = (formData, router) => async (dispatch) => {

    dispatch(registerRequest);
    try {
      const data = await userApi.register(formData);
      dispatch(registerSuccess(data));
  
      router.push('/');

      return data;
    } catch (error) {
      dispatch(registerError(error.message));
      throw error;
    }
};

export const getInforUser = (accessToken) => async (dispatch) => {

    dispatch(getInforUserRequest);
    try {
      const data = await userApi.inforUser(accessToken);
      dispatch(getInforUserSuccess(data));
  
      return data;
    } catch (error) {
      dispatch(getInforUserError(error.message));
      throw error;
    }
};

export const logout = () => async (dispatch) => {

    dispatch(logoutRequest);
    try {
      await userApi.logout();
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutError(error.message));
      throw error;
    }
};

export const addCart = (cart, accessToken) => async (dispatch) => {

    // console.log('data add cart', cart.cart);
    dispatch(addCartRequest);
    try {
      const data = await userApi.addCart(cart.cart, accessToken);
      dispatch(addCartSuccess(data));
      return data;
    } catch (error) {
      dispatch(addCartError(error.message));
      throw error;
    }
};

export const getHistory = (accessToken) => async (dispatch) => {

    dispatch(getHistoryRequest())

    try {
        const data = await userApi.getHistory(accessToken);
        dispatch(getHistorySuccess(data));
        return data;
    } catch (error) {
      dispatch(getHistoryError(error.message));
      throw error;
    }
};