import axiosClient from './axiosClient';

const imageApi  = {
    uploadImage: (formData, accessToken) => {
        const url = '/api/upload';
        return axiosClient.post(url, formData, {
            headers: {Authorization: accessToken}
        });
    },
    destroyImage: (public_id, accessToken) => {
        const url = '/api/destroy';
        return axiosClient.post(url, {public_id}, {
            headers: {Authorization: accessToken}
        })
    },
}

export default imageApi;