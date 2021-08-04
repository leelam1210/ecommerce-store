import axiosClient from './axiosClient';

const categoryApi  = {
    getCategory: () => {
        const url = '/api/category';
        return axiosClient.get(url);
    },
    createCategory: (category, accessToken) => {
        const url = '/api/category';
        return axiosClient.post(url, {name: category}, {
            headers: {Authorization: accessToken}
        })
    },
    deleteCategory: (id, accessToken) => {
        const url = `/api/category/${id}`;
        return axiosClient.delete(url, {
            headers: {Authorization: accessToken}
        })
    },
    updateCategory: (id, category, accessToken) => {
        const url = `/api/category/${id}`;
        return axiosClient.put(url, {name: category}, {
            headers: {Authorization: accessToken}
        })
    }
}

export default categoryApi;