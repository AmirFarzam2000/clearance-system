import api from "./Api";
import type { TarrifL1, TarrifL2, TarrifL3 } from "../types/dto/tarrifs.dto";

export const tarrifsApi = {
  getAll: async (): Promise<TarrifL1[]> => {
    const response = await api.get<TarrifL1[]>("/TarrifL1s/WithChilds");
    return response.data;
  },

  getById: async (id: number): Promise<TarrifL1 | null> => {
    const response = await api.get<TarrifL1>(`/TarrifL1s/${id}`);
    return response.data;
  },

  getTarrifL1s: async (): Promise<TarrifL1[]> => {
    const response = await api.get<TarrifL1[]>("/TarrifL1s");
    return response.data;
  },

  create: async (tarrif: Partial<TarrifL1>): Promise<TarrifL1> => {
    const response = await api.post<TarrifL1>("/TarrifL1s", tarrif);
    return response.data;
  },

  update: async (tarrif: TarrifL1): Promise<TarrifL1> => {
    const response = await api.put<TarrifL1>("/TarrifL1s", tarrif);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<void>(`/TarrifL1s/${id}`);
  },


  getTarrifL2s: async (): Promise<TarrifL2[]> => {
    const response = await api.get<TarrifL2[]>("/TarrifL2s");
    return response.data;
  },
  createL2: async (tarrifL2: Partial<TarrifL2>): Promise<TarrifL2> => {
    const response = await api.post<TarrifL2>("/TarrifL2s", tarrifL2);
    return response.data;
  },

  updateL2: async (tarrifL2: TarrifL2): Promise<TarrifL2> => {
    const response = await api.put<TarrifL2>("/TarrifL2s", tarrifL2);
    return response.data;
  },

  deleteL2: async (id: number): Promise<void> => {
    await api.delete<void>(`/TarrifL2s/${id}`);
  },

  createL3: async (tarrifL3: Partial<TarrifL3>): Promise<TarrifL3> => {
    const response = await api.post<TarrifL3>("/TarrifL3s", tarrifL3);
    return response.data;
  },

  updateL3: async (tarrifL3: TarrifL3): Promise<TarrifL3> => {
    const response = await api.put<TarrifL3>("/TarrifL3s", tarrifL3);
    return response.data;
  },

  deleteL3: async (id: number): Promise<void> => {
    await api.delete<void>(`/TarrifL3s/${id}`);
  }
};