import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://193.106.99.147:32777/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
    timeoutErrorMessage: 'Request timed out',
    withCredentials: true,
});

const getRequest = async (url) => {
    return apiClient.get(url).then((response) => response);
};

const postRequest = async (url, payload) => {
    return apiClient.post(url, payload).then((response) => response);
};

const putRequest = async (url, payload) => {
    return apiClient.put(url, payload).then((response) => response);
};

const patchRequest = async (url, payload) => {
    return apiClient.patch(url, payload).then((response) => response);
};

const deleteRequest = async (url) => {
    return apiClient.delete(url).then((response) => response);
};

export { getRequest, postRequest, putRequest, patchRequest, deleteRequest };
