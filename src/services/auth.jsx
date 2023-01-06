import { postRequest } from '../lib/axios';

const login = async (data) => {
    const response = await postRequest('/auth/login', data);
    return response;
};

export { login };
