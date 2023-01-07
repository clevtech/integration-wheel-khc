import { api } from '../lib/axios';

const users = {
    getAll: async (token) =>
        api.request({
            method: 'GET',
            url: '/users',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),

    approveByUserId: async (token, id) =>
        api.request({
            method: 'GET',
            url: `/users/approve/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),

    deleteByUserId: async (token, id) =>
        api.request({
            method: 'DELETE',
            url: `/users/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
};

export { users };
