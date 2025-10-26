import api from "./Api";
import type { Productgroup } from "../types/productgroup.dto";

export const productgroupsApi = {
  getProductgroups: async () => {
    const response = await api.get('/productgroups');
    return response.data;
  },
  getProductgroupById: async (id: number) => {
    const response = await api.get(`/productgroups/${id}`);
    return response.data;
  },
  createProductgroup: async (productgroup: Productgroup) => {
    const response = await api.post('/productgroups', productgroup);
    return response.data;
  },
  updateProductgroup: async (productgroup: Productgroup) => {
    const response = await api.put('/productgroups', productgroup);
    return response.data;
  },
  deleteProductgroup: async (id: number) => {
    const response = await api.delete(`/productgroups/${id}`);
    return response.data;
  }
};