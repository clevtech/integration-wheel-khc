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

    updateByToken: async (token, data) =>
        api.request({
            method: 'PUT',
            url: '/users',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
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

    generate: async (token, data) =>
        api.request({
            method: 'POST',
            url: '/users/generate',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        }),
};

export { users };
