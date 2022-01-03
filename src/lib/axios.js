import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
const axiosClient = axios.create();
axiosClient.defaults.baseURL = process.env.REACT_APP_BE_URL;
// console.log(axiosClient.defaults.baseURL)
axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": `*`,
    "Access-Control-Allow-Credentials": true,
    "Accept": "application/json"
};
axiosClient.defaults.timeout = 20000;
axiosClient.defaults.withCredentials = true;



export const getRequest = (URL, options = {}) =>
    axiosClient.get(`/${URL}`, options).then((response) => response).catch(e => localStorage.setItem("userLanded", false))

export const postRequest = (URL, payload) =>
    axiosClient.post(`/${URL}`, payload).then((response) => response);


export const putRequest = (URL, payload, options = {}) =>
    axiosClient.put(`/${URL}`, payload, options).then((response) => response);

export const deleteRequest = (URL) =>
    axiosClient.delete(`/${URL}`).then((response) => response);

const refreshAuthLogic = failedRequest => axiosClient.post(`${process.env.REACT_APP_BE_URL}/users/refreshToken`,)
    .then(tokenRefreshResponse => {
        if (tokenRefreshResponse.status === 200) {
            return Promise.resolve();
        } else return Promise.reject(failedRequest)


    })


createAuthRefreshInterceptor(axiosClient, refreshAuthLogic);

