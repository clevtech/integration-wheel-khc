import { api } from '../lib/axios';

const actions = {
  getAll: async (token) => {
    api.request({
      method: 'GET',
      url: '/action-logs',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export { actions };
