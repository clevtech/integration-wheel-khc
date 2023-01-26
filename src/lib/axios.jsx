import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const errorHandler = (error) => {
    const statusCode = error.response?.status;

    if (statusCode) {
        console.error(error);
    }

    return Promise.reject(error);
};

api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error);
});

export { api };
