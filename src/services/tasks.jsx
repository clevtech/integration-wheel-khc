import { api } from '../lib/axios';

const tasks = {
    getAll: async (token, pageNumber, pageSize) =>
        api.request({
            method: 'GET',
            url: `/tasks/all?pageNumber=${pageNumber}&pageSize=${pageSize}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),

    resend: async (token, id) =>
        api.request({
            method: 'GET',
            url: `/tasks/reSend/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),

    cancel: async (token, id) =>
        api.request({
            method: 'GET',
            url: `/tasks/cancel/${id}`,
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
