import { api } from '../lib/axios';

const providers = {
    getAll: async (token) =>
        api.request({
            method: 'GET',
            url: '/provider',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),

    create: async (token, data) =>
        api.request({
            method: 'POST',
            url: '/provider',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data,
        }),
};

export { providers };
