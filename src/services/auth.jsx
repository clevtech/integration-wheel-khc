import { api } from '../lib/axios';

const auth = {
    confirmRegistration: async (data, token) =>
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

    refresh: async (data, token) =>
        api.request({
            method: 'POST',
            url: '/auth/refresh',
            headers: {
                Authorization: `Bearer ${token}`,
            },
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
