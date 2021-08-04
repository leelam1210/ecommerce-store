import imageApi from '../api/imageApi';

export const actionTypes = {
    
    UPLOAD_IMAGE: 'UPLOAD_IMAGE',
    UPLOAD_IMAGE_REQUEST: 'UPLOAD_IMAGE_REQUEST',
    UPLOAD_IMAGE_SUCCESS: 'UPLOAD_IMAGE_SUCCESS',
    UPLOAD_IMAGE_ERROR: 'UPLOAD_IMAGE_ERROR',

    DESTROY_IMAGE: 'DESTROY_IMAGE',
    DESTROY_IMAGE_REQUEST: 'DESTROY_IMAGE_REQUEST',
    DESTROY_IMAGE_SUCCESS: 'DESTROY_IMAGE_SUCCESS',
    DESTROY_IMAGE_ERROR: 'DESTROY_IMAGE_ERROR',
}
// ------------------------------

export const uploadImageRequest = () => ({
    type: actionTypes.UPLOAD_IMAGE_REQUEST,
    payload: null,
});
export const uploadImageSuccess = (data) => ({
    type: actionTypes.UPLOAD_IMAGE_SUCCESS,
    payload: { data},
});
export const uploadImageError = (error) => ({
    type: actionTypes.UPLOAD_IMAGE_ERROR,
    payload: { error },
});

export const destroyImageRequest = () => ({
    type: actionTypes.DESTROY_IMAGE_REQUEST,
    payload: null,
});
export const destroyImageSuccess = (id, accessToken) => ({
    type: actionTypes.DESTROY_IMAGE_SUCCESS,
    payload: { id, accessToken},
});
export const destroyImageError = (error) => ({
    type: actionTypes.DESTROY_IMAGE_ERROR,
    payload: { error },
});

// ---------------------------------

export const uploadImage = (formData, accessToken) => async (dispatch) => {
    dispatch(uploadImageRequest());

    try {

        const data = await imageApi.uploadImage(formData, accessToken);
        dispatch(uploadImageSuccess(data));
        return data;
    } catch (error) {

      dispatch(uploadImageError(error.message));
      throw error;
    }
};

export const destroyImage = (id, accessToken) => async (dispatch) => {
    dispatch(destroyImageRequest());

    try {

      await imageApi.destroyImage(id, accessToken);
      dispatch(destroyImageSuccess(id, accessToken));
    } catch (error) {

      dispatch(destroyImageError(error.message));
      throw error;
    }
};


