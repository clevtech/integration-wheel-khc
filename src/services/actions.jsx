import { api } from '../lib/axios';

const actions = {
  getAll: async (token, pageNumber = 0, pageSize = 10) =>
    api.request({
      method: 'GET',
      url: `/action-logs?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export { actions };
