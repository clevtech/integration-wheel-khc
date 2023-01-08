import { api } from '../lib/axios';

const tokens = {
    getAll: async (token) =>
        api.request({
            method: 'GET',
            url: '/eds',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),

    getById: async (token, id) =>
        api.request({
            method: 'GET',
            url: `/eds/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),

    create: async (token, data) =>
        api.request({
            method: 'POST',
            url: '/eds',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        }),
};

export { tokens };
