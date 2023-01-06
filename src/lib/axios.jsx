import axios from 'axios';

const api = axios.create({
    baseURL: 'http://193.106.99.147:32777/api/v1',
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
