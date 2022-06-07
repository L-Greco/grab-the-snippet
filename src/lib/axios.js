import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
const axiosClient = axios.create();
axiosClient.defaults.baseURL = process.env.REACT_APP_BE_URL;
// console.log(axiosClient.defaults.baseURL)
// axiosClient.defaults.headers = {
//     'Content-Type': 'application/json',
//     "Accept": "application/json"
// };
axiosClient.defaults.timeout = 20000;
axiosClient.defaults.withCredentials = true;



export const getRequest = (URL, options = {}) =>
    axiosClient.get(`/${URL}`, options).then((response) => response).catch(e => e)

export const newGetRequest = async (URL, options = {}) => {
    try {
        const res = await axiosClient.get(`/${URL}`, options)
        if (res) return res
        if (!res) {
            const refr = await refreshRequest()
            if (!refr) return "noCookies"
            const res1 = await axiosClient.get(`/${URL}`, options)
            if (res1) return res1

        }
    } catch (error) {
        console.log(error)
    }

}

export const postRequest = (URL, payload) =>
    axiosClient.post(`/${URL}`, payload).then((response) => response).catch(e => e);

export const putRequest = (URL, payload, options = {}) =>
    axiosClient.put(`/${URL}`, payload, options).then((response) => response).catch(e => e);

export const deleteRequest = (URL) =>
    axiosClient.delete(`/${URL}`).then((response) => response).catch(e => e);

export const refreshRequest = async () => {
    try {

        const res = await axiosClient.post("/users/refreshToken")


        if (!res.status === 200) {
            localStorage.setItem("userLanded", false)

            return false
        }
        return res
    } catch (error) {
        localStorage.setItem("userLanded", false)
    }

}

const refreshAuthLogic = failedRequest => axiosClient.post(`${process.env.REACT_APP_BE_URL}/users/refreshToken`,)
    .then(tokenRefreshResponse => {
        return Promise.resolve();

    }).catch(e => console.log(e))

//     }).catch(e => localStorage.setItem("userLanded", false))
// const refreshAuthLogic = failedRequest => axiosClient.post(`${process.env.REACT_APP_BE_URL}/users/refreshToken`,)
//     .then(tokenRefreshResponse => {
//         console.log("am i herE?")
//         localStorage.setItem("userLanded", false)
//         return Promise.resolve();



//     }).catch(e => localStorage.setItem("userLanded", false))

// Response interceptor for API calls
// axiosClient.interceptors.response.use(response => {
//     return response
// }, async function (error) {

//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         refreshRequest();

//         return Promise.reject(error);
//     }
//     return Promise.reject(error);
// });






// createAuthRefreshInterceptor(axiosClient, refreshAuthLogic)

