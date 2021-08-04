import paymentApi from '../api/paymentApi';

export const actionTypes = {
    
    GET_PAYMENT: 'GET_PAYMENT',
    GET_PAYMENT_REQUEST: 'GET_PAYMENT_REQUEST',
    GET_PAYMENT_SUCCESS: 'GET_PAYMENT_SUCCESS',
    GET_PAYMENT_ERROR: 'GET_PAYMENT_ERROR',

    POST_PAYMENT: 'POST_PAYMENT',
    POST_PAYMENT_REQUEST: 'POST_PAYMENT_REQUEST',
    POST_PAYMENT_SUCCESS: 'POST_PAYMENT_SUCCESS',
    POST_PAYMENT_ERROR: 'POST_PAYMENT_ERROR',
}
// ------------------------------

export const getPaymentRequest = () => ({
    type: actionTypes.GET_PAYMENT_REQUEST,
    payload: null,
});
export const getPaymentSuccess = (data) => ({
    type: actionTypes.GET_PAYMENT_SUCCESS,
    payload: { data},
});
export const getPaymentError = (error) => ({
    type: actionTypes.GET_PAYMENT_ERROR,
    payload: { error },
});

export const postPaymentRequest = () => ({
    type: actionTypes.POST_PAYMENT_REQUEST,
    payload: null,
});
export const postPaymentSuccess = (data) => ({
    type: actionTypes.POST_PAYMENT_SUCCESS,
    payload: { data},
});
export const postPaymentError = (error) => ({
    type: actionTypes.POST_PAYMENT_ERROR,
    payload: { error },
});

// ---------------------------------

export const getPayment = (accessToken) => async (dispatch) => {
    dispatch(getPaymentRequest())

    try {
        const data = await paymentApi.getPayment(accessToken);
        dispatch(getPaymentSuccess(data));
        return data;
    } catch (error) {
      dispatch(getPaymentError(error.message));
      throw error;
    }
};

export const postPayment = (cart, paymentID, address, accessToken) => async (dispatch) => {
    dispatch(postPaymentRequest())

    try {
        const data = await paymentApi.postPayment(cart, paymentID, address, accessToken);
        dispatch(postPaymentSuccess(data));
        return data;
    } catch (error) {
      dispatch(postPaymentError(error.message));
      throw error;
    }
};



