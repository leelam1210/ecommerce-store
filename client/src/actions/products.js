import productApi from '../api/productApi';

export const actionTypes = {
    GET_ALL: 'GET_ALL',
    GET_ALL_REQUEST: 'GET_ALL_REQUEST',
    GET_ALL_SUCCESS: 'GET_ALL_SUCCESS',
    GET_ALL_ERROR: 'GET_ALL_ERROR',

    CREATE_PRODUCT: 'CREATE_PRODUCT',
    CREATE_PRODUCT_REQUEST: 'CREATE_PRODUCT_REQUEST',
    CREATE_PRODUCT_SUCCESS: 'CREATE_PRODUCT_SUCCESS',
    CREATE_PRODUCT_ERROR: 'CREATE_PRODUCT_ERROR',

    DELETE_PRODUCT: 'DELETE_PRODUCT',
    DELETE_PRODUCT_REQUEST: 'DELETE_PRODUCT_REQUEST',
    DELETE_PRODUCT_SUCCESS: 'DELETE_PRODUCT_SUCCESS',
    DELETE_PRODUCT_ERROR: 'DELETE_PRODUCT_ERROR',

    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    UPDATE_PRODUCT_REQUEST: 'UPDATE_PRODUCT_REQUEST',
    UPDATE_PRODUCT_SUCCESS: 'UPDATE_PRODUCT_SUCCESS',
    UPDATE_PRODUCT_ERROR: 'UPDATE_PRODUCT_ERROR',
}
// ------------------------------
export const getProductsRequest = () => ({
    type: actionTypes.GET_ALL_REQUEST,
    payload: null,
});
export const getProductsSuccess = (data) => ({
    type: actionTypes.GET_ALL_SUCCESS,
    payload: { data },
});
export const getProductsError = (error) => ({
    type: actionTypes.GET_ALL_ERROR,
    payload: { error },
});

export const createProductsRequest = () => ({
  type: actionTypes.CREATE_PRODUCT_REQUEST,
  payload: null,
});
export const createProductsSuccess = (data) => ({
  type: actionTypes.CREATE_PRODUCT_SUCCESS,
  payload: { data },
});
export const createProductsError = (error) => ({
  type: actionTypes.CREATE_PRODUCT_ERROR,
  payload: { error },
});

export const deleteProductsRequest = () => ({
  type: actionTypes.DELETE_PRODUCT_REQUEST,
  payload: null,
});
export const deleteProductsSuccess = (id, accessToken) => ({
  type: actionTypes.DELETE_PRODUCT_SUCCESS,
  payload: { id, accessToken},
});
export const deleteProductsError = (error) => ({
  type: actionTypes.DELETE_PRODUCT_ERROR,
  payload: { error },
});

export const updateProductsRequest = () => ({
  type: actionTypes.UPDATE_PRODUCT_REQUEST,
  payload: null,
});
export const updateProductsSuccess = (data) => ({
  type: actionTypes.UPDATE_PRODUCT_SUCCESS,
  payload: { data},
});
export const updateProductsError = (error) => ({
  type: actionTypes.UPDATE_PRODUCT_ERROR,
  payload: { error },
});

// ---------------------------------
export const getProducts = (page, category, sort, search) => async (dispatch) => {
    dispatch(getProductsRequest);

    try {
      
      const listProduct = await productApi.getProducts(page, category, sort, search);
      dispatch(getProductsSuccess(listProduct));

      return listProduct;
    } catch (error) {
      dispatch(getProductsError(error.message));
      throw error;
    }
};

export const createProduct = (formData, accessToken) => async (dispatch) => {
  dispatch(createProductsRequest)

  try {

    const data = await productApi.createProduct(formData, accessToken);
    dispatch(createProductsSuccess(data));

    return data;
  } catch (error) {
    dispatch(createProductsError(error.message))
    throw error
  }
};

export const deleteProducts = (id, accessToken) => async (dispatch) => {
  dispatch(deleteProductsRequest)

  try {

    await productApi.deleteProduct(id, accessToken);
    dispatch(deleteProductsSuccess(id, accessToken));

  } catch (error) {
    dispatch(deleteProductsError(error.message))
    throw error
  }
};

export const updateProducts = (id, accessToken, productData) => async (dispatch) => {
  dispatch(updateProductsRequest)

  try {

    const data = await productApi.updateProduct(id, productData, accessToken);
    dispatch(updateProductsSuccess(data));
    return data;
  } catch (error) {
    dispatch(updateProductsError(error.message))
    throw error
  }
};