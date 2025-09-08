import axios from 'axios';
import Api, { baseURL } from '../config/Api';

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

// ✅ Request interceptor
Axios.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

// ❌ you had request.use again, changing it to response interceptor
Axios.interceptors.response.use(
    (res) => res,
    async (error) => {
        let originalReq = error.config;
        if (error.response?.status === 401 && !originalReq._retry) {
            originalReq._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const newAccessToken = await refreshAccessToken(refreshToken);
                    if (newAccessToken) {
                        originalReq.headers.Authorization = `Bearer ${newAccessToken}`;
                        return Axios(originalReq);
                    }
                } catch (err) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/login";  // logout user
                }
            }
        }
        return Promise.reject(error);
    }
);

// ✅ function stays, but improve error handling
const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await Axios({
            ...Api.refreshToken,
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });
        const accessToken = response.data.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
};

export default Axios;
