import api, { makeRequest } from "./request";

const controller = {
  getAll: async (endpoint) => {
    return await makeRequest(api.get(endpoint));
  },

  getOne: async (endpoint, id) => {
    return await makeRequest(api.get(`${endpoint}/${id}`));
  },

  post: async (endpoint, data) => {
    return await makeRequest(api.post(endpoint, data));
  },

  put: async (endpoint, id, data) => {
    return await makeRequest(api.put(`${endpoint}/${id}`, data));
  },

  patch: async (endpoint, id, data) => {
    return await makeRequest(api.patch(`${endpoint}/${id}`, data));
  },

  delete: async (endpoint, id) => {
    return await makeRequest(api.delete(`${endpoint}/${id}`));
  },

  search: async (endpoint, queryParams) => {
    return await makeRequest(api.get(endpoint, { params: queryParams }));
  },
};

export default controller;
