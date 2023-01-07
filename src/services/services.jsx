import { api } from '../lib/axios';

const services = {
    getAll: async (token) =>
        api.request({
            method: 'GET',
            url: '/provider_requests/services',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),

    create: async (token, data) =>
        api.request({
            method: 'POST',
            url: '/provider_requests',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data,
        }),

    archive: async (token, id) =>
        api.request({
            method: 'GET',
            url: `/provider_requests/archive/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),

    duplicate: async (token, id) =>
        api.request({
            method: 'GET',
            url: `/provider_requests/duplicate/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),

    delete: async (token, id) =>
        api.request({
            method: 'DELETE',
            url: `/provider_requests/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
};

export { services };
