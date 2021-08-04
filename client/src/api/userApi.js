import axiosClient from './axiosClient';

const userApi  = {
    login: (formData) => {
        const url = '/user/login';
        return axiosClient.post(url, formData);
    },
    register: (formData) => {
        const url = '/user/register';
        return axiosClient.post(url, formData);
    },
    inforUser: (accessToken) => {
        const url = '/user/infor';
        return axiosClient.get(url, {
            headers: {Authorization: accessToken}
        });
    },
    logout: () => {
        const url = '/user/logout';
        return axiosClient.get(url);
    },
    addCart: (cart, accessToken) => {
        const url = '/user/addcart';
        return axiosClient.patch(url, {cart: cart}, {
            headers: {Authorization: accessToken}
        })
    },
    getHistory: (accessToken) => {
        const url = '/user/history';
        return axiosClient.get(url, {
            headers: {Authorization: accessToken}
        })
    }
}

export default userApi;