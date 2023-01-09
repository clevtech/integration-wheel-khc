import { api } from '../lib/axios';

const tasks = {
    getAll: async (token) =>
        api.request({
            method: 'GET',
            url: '/tasks/all',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),

    analytics: async (token, data) =>
        api.request({
            method: 'POST',
            url: '/tasks/analytics',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        }),
};

export { tasks };
