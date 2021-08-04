import axiosClient from './axiosClient';

const paymentApi = {
    getPayment: (accessToken) => {
        const url = '/api/payment';
        return axiosClient.get(url, {
            headers: {Authorization: accessToken}
        });
    },
    postPayment: (cart, paymentID, address, accessToken) => {
        const url = '/api/payment';
        return axiosClient.post(url, {cart, paymentID, address}, {
            headers: {Authorization: accessToken}
        })
    }
}

export default paymentApi;