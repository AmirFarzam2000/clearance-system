import api from './Api';
import type { Currency } from '../types/currencies';

export const currenciesApi = {
  getAll: async (): Promise<Currency[]> => {
    const response = await api.get<Currency[]>("/Currencies");
    return response.data;
  },

  getById: async (id: number): Promise<Currency | null> => {
    try {
      const response = await api.get<Currency>(`/Currencies/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  create: async (formData: any): Promise<Currency> => {
    const currency = {
      Title: formData.title,
      AlternativeTitle: formData.alternativeTitle,
      ISO: formData.iso.toUpperCase(),
      DecimalDigit: formData.decimalDigit
    };
    
    try {
      const response = await api.post<Currency>("/Currencies", currency);
      return response.data;
    } catch (error: any) {

      if (error.response?.data?.ValidationErrors) {
        const validationErrors = error.response.data.ValidationErrors;
        const errorMessages = validationErrors.map((err: any) => err.ErrorMessage).join(', ');
        throw new Error(errorMessages);
      }
      throw error;
    }
  },

  update: async (currency: Currency): Promise<Currency> => {
    const updatedCurrency = {
      CurrencyID: currency.CurrencyID,
      Title: currency.Title,
      AlternativeTitle: currency.AlternativeTitle,
      ISO: currency.ISO.toUpperCase(),
      DecimalDigit: currency.DecimalDigit,
      RowVersion: currency.RowVersion
    };
    
    try {
      const response = await api.put<Currency>("/Currencies", updatedCurrency);
      return response.data;
    } catch (error: any) {

      if (error.response?.data?.ValidationErrors) {
        const validationErrors = error.response.data.ValidationErrors;
        const errorMessages = validationErrors.map((err: any) => err.ErrorMessage).join(', ');
        throw new Error(errorMessages);
      }
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<void>(`/Currencies/${id}`);
  }
};