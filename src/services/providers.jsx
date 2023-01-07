import { api } from '../lib/axios';

const providers = {
    create: async (token, data) =>
        api.request({
            method: 'POST',
            url: '/provider',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data,
        }),
};

export { providers };
