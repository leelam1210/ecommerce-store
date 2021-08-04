import axiosClient from './axiosClient';

const productApi  = {
    getProducts: (page, category, sort, search) => {
        const url = `/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`;
        return axiosClient.get(url);
    },
    createProduct: (formData, accessToken) => {
        const url = '/api/products';
        return axiosClient.post(url, formData, {
            headers: {Authorization: accessToken}
        })
    },
    deleteProduct: (id, accessToken) => {
        const url = `/api/products/${id}`;
        return axiosClient.delete(url, {
            headers: {Authorization: accessToken}
        })
    },
    updateProduct: (id, productData, accessToken) => {
        const url = `/api/products/${id}`;
        return axiosClient.put(url, productData, {
            headers: {Authorization: accessToken}
        })
    }
}

export default productApi;