import axios from 'axios';
import queryString from 'query-string';

/*
  Base client config for your application.
  Here you can define your base url, headers,
  timeouts and middleware used for each request.
*/
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

//Phần mềm trung gian tùy chỉnh cho các yêu cầu (cái này chỉ ghi lại lỗi).
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
})

// Custom middleware for responses (this one just logs the error).
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    // Handle errors
    throw error;
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {

}
export default axiosClient;