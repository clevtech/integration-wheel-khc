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
};

export { services };
