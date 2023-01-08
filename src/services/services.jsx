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

    getByUserId: async (token, id) =>
        api.request({
            method: 'GET',
            url: `/provider_requests/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),

    permitByUserId: async (token, data) =>
        api.request({
            method: 'PUT',
            url: `/provider_requests/permission/add`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        }),

    denyByUserId: async (token, data) =>
        api.request({
            method: 'PUT',
            url: `/provider_requests/permission/remove`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
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

    generate: async (token, data) =>
        api.request({
            method: 'POST',
            url: '/provider_requests/generate',
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
