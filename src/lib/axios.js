import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { clearUserAction } from "../redux/actions.js"
import { useDispatch } from "react-redux";
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
    axiosClient.get(`/${URL}`, options).then((response) => response)

export const postRequest = (URL, payload) =>
    axiosClient.post(`/${URL}`, payload).then((response) => response);


export const putRequest = (URL, payload, options = {}) =>
    axiosClient.put(`/${URL}`, payload, options).then((response) => response);

export const deleteRequest = (URL) =>
    axiosClient.delete(`/${URL}`).then((response) => response);

const refreshAuthLogic = failedRequest => axiosClient.post(`${process.env.REACT_APP_BE_URL}/users/refreshToken`,)
    .then(tokenRefreshResponse => {
        console.log(tokenRefreshResponse)
        return Promise.resolve();
    })










createAuthRefreshInterceptor(axiosClient, refreshAuthLogic);

// const refreshAuthLogic = async (failedRequest) => {
//     try {
//         const tokenRefreshResponse = await axiosClient.post(`${process.env.REACT_APP_BE_URL}/users/refreshToken`,)
//         if (tokenRefreshResponse.status === 401) {
//             console.log("yaaa")
//             console.log(tokenRefreshResponse)
//             const res = await postRequest("users/logout")
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }


// export const postRequest = async (URL, payload) => {
//     try {
//         const res = await axiosClient.post(`/${URL}`, payload)
//         console.log(res.status)
//         if (res.status !== 401) return res
//         if (res.status === 401 || res.status === 403) {
//             const refreshTokenRes = await axiosClient.post(`/users/refreshToken`)
//             if (refreshTokenRes.status === 200) {
//                 const secondRes = await axiosClient.post(`/${URL}`, payload)
//                 return secondRes
//             } else if (refreshTokenRes.status === 401) {
//                 return false
//             }
//         }
//     } catch (error) {
//         console.log(error);
//     }

// }