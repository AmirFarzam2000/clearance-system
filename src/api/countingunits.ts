import api from "./Api";
import type { CountingUnit } from "../types/countingunits.dto";

export const countingunitsApi = {
  getCountingunits: async (): Promise<CountingUnit[]> => {
    const response = await api.get('/countingunits');
    return response.data;
  },
  getCountingunitById: async (id: number): Promise<CountingUnit> => {
    const response = await api.get(`/countingunits/${id}`);
    return response.data;
  },

  createCountingunit: async (countingunit: CountingUnit): Promise<CountingUnit> => {
    const response = await api.post('/countingunits', countingunit);
    return response.data;
  },

  updateCountingunit: async (countingunit: CountingUnit): Promise<CountingUnit> => {
    const response = await api.put(`/countingunits/${countingunit.CountingUnitID}`, countingunit);
    return response.data;
  },

  deleteCountingunit: async (id: number): Promise<void> => {
    await api.delete(`/countingunits/${id}`);
  }
}