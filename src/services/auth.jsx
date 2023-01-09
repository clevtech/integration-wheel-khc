import { api } from '../lib/axios';

const auth = {
    confirm: async (data, token) =>
        api.request({
            method: 'GET',
            url: '/auth/confirm-registration',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        }),

    login: async (data) =>
        api.request({
            method: 'POST',
            url: '/auth/login',
            data: data,
        }),

    refresh: async (data) =>
        api.request({
            method: 'POST',
            url: '/auth/refresh',
            data: data,
        }),

    register: async (data) =>
        api.request({
            method: 'POST',
            url: '/auth/register',
            data: data,
        }),
};

export { auth };
