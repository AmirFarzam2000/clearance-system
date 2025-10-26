import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { currenciesApi } from '../api/currencies';
import type { Currency } from '../types/currencies';

interface CurrencyFormData {
  title: string;
  alternativeTitle: string;
  iso: string;
  decimalDigit: number;
}

export const useCurrencies = () => {
  return useQuery<Currency[], Error>({
    queryKey: ['currencies'],
    queryFn: () => currenciesApi.getAll(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCurrency = (id: number) => {
  return useQuery<Currency | null, Error>({
    queryKey: ['currency', id],
    queryFn: () => currenciesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateCurrency = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Currency, Error, CurrencyFormData>({
    mutationFn: (formData) => currenciesApi.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
    },
  });
};

export const useUpdateCurrency = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Currency, Error, Currency>({
    mutationFn: (currency) => currenciesApi.update(currency),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
    },
  });
};

export const useDeleteCurrency = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, number>({
    mutationFn: (currencyId) => currenciesApi.delete(currencyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
    },
  });
};
