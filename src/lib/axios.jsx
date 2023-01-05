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

const getRequest = async (URL) => {
    return apiClient.get(`/${URL}`).then((response) => response);
};

const postRequest = async (URL, payload) => {
    return apiClient.post(`/${URL}`, payload).then((response) => response);
};

const patchRequest = async (URL, payload) => {
    return apiClient.patch(`/${URL}`, payload).then((response) => response);
};

const deleteRequest = async (URL) => {
    return apiClient.delete(`/${URL}`).then((response) => response);
};

export { getRequest, postRequest, patchRequest, deleteRequest };
