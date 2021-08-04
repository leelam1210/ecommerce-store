import categoryApi from '../api/categoryApi';

export const actionTypes = {

    GET_CATEGORY: 'GET_CATEGORY',
    GET_CATEGORY_REQUEST: 'GET_CATEGORY_REQUEST',
    GET_CATEGORY_SUCCESS: 'GET_CATEGORY_SUCCESS',
    GET_CATEGORY_ERROR: 'GET_CATEGORY_ERROR',

    CREATE_CATEGORY: 'CREATE_CATEGORY',
    CREATE_CATEGORY_REQUEST: 'CREATE_CATEGORY_REQUEST',
    CREATE_CATEGORY_SUCCESS: 'CREATE_CATEGORY_SUCCESS',
    CREATE_CATEGORY_ERROR: 'CREATE_CATEGORY_ERROR',

    DELETE_CATEGORY: 'DELETE_CATEGORY',
    DELETE_CATEGORY_REQUEST: 'DELETE_CATEGORY_REQUEST',
    DELETE_CATEGORY_SUCCESS: 'DELETE_CATEGORY_SUCCESS',
    DELETE_CATEGORY_ERROR: 'DELETE_CATEGORY_ERROR',

    UPDATE_CATEGORY: 'UPDATE_CATEGORY',
    UPDATE_CATEGORY_REQUEST: 'UPDATE_CATEGORY_REQUEST',
    UPDATE_CATEGORY_SUCCESS: 'UPDATE_CATEGORY_SUCCESS',
    UPDATE_CATEGORY_ERROR: 'UPDATE_CATEGORY_ERROR',
}
// ------------------------------
export const getCategoryRequest = () => ({
    type: actionTypes.GET_CATEGORY_REQUEST,
    payload: null,
});
export const getCategorySuccess = (data) => ({
    type: actionTypes.GET_CATEGORY_SUCCESS,
    payload: { data },
});
export const getCategoryError = (error) => ({
    type: actionTypes.GET_CATEGORY_ERROR,
    payload: { error },
});

export const createCategoryRequest = () => ({
    type: actionTypes.CREATE_CATEGORY_REQUEST,
    payload: null,
});
export const createCategorySuccess = (data) => ({
    type: actionTypes.CREATE_CATEGORY_SUCCESS,
    payload: { data },
});
export const createCategoryError = (error) => ({
    type: actionTypes.CREATE_CATEGORY_ERROR,
    payload: { error },
});

export const deleteCategoryRequest = () => ({
    type: actionTypes.DELETE_CATEGORY_REQUEST,
    payload: null,
});
export const deleteCategorySuccess = (id) => ({
    type: actionTypes.DELETE_CATEGORY_SUCCESS,
    payload: { id },
});
export const deleteCategoryError = (error) => ({
    type: actionTypes.DELETE_CATEGORY_ERROR,
    payload: { error },
});

export const updateCategoryRequest = () => ({
    type: actionTypes.UPDATE_CATEGORY_REQUEST,
    payload: null,
});
export const updateCategorySuccess = (data) => ({
    type: actionTypes.UPDATE_CATEGORY_SUCCESS,
    payload: {data},
});
export const updateCategoryError = (error) => ({
    type: actionTypes.UPDATE_CATEGORY_ERROR,
    payload: { error },
});

// ---------------------------------
export const getCategory = () => async (dispatch) => {
    dispatch(getCategoryRequest())

    try {
      const data = await categoryApi.getCategory();
      dispatch(getCategorySuccess(data))

      return data;
    } catch (error) {
      dispatch(getCategoryError(error.message))
      throw error
    }
};

export const createCategory = (accessToken, category) => async (dispatch) => {
    dispatch(createCategoryRequest());
    try {
      const data = await categoryApi.createCategory(category, accessToken);
      dispatch(createCategorySuccess(data))

      return data;
    } catch (error) {
      dispatch(createCategoryError(error.message))
      throw error
    }
};

export const deleteCategory = (id, accessToken) => async (dispatch) => {
    dispatch(deleteCategoryRequest());
    try {
      await categoryApi.deleteCategory(id, accessToken);
      dispatch(deleteCategorySuccess(id, accessToken));
    } catch (error) {
      dispatch(deleteCategoryError(error.message))
      throw error
    }
};

export const updateCategory = (id, accessToken, category) => async (dispatch) => {
    dispatch(updateCategoryRequest());

    try {
      const data = await categoryApi.updateCategory(id, category, accessToken);
      dispatch(updateCategorySuccess(data));
      console.log(data);

      return data;
    } catch (error) {
      dispatch(updateCategoryError(error.message))
      throw error
    }

};
