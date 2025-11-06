import axios from 'axios';
import { BASE_URL } from './apiPath';


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {'Content-Type': 'application/json',
        Accept: 'application/json'},
});

//REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }   
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }

);
// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    }),
    (error) => {
        // haandle common errors globally
        if (error.response) {
            if (error.response.status === 401) {
                // redirect to login page or perform logout operation
                window.location.href = '/login';    
            }
        else if (error.response.status === 500) {
            console.error("Server Error. Please try again later.");
        }
            // handle other status codes if needed
        } else if (error.request === "ECONNABORTED") {
            console.error("Request timeout. Please try again.");
        }
        return Promise.reject(error);
    };

export default axiosInstance;