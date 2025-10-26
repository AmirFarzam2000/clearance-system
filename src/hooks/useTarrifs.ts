import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tarrifsApi } from '../api/tarrifs';
import type { TarrifL1, TarrifL2, TarrifL3 } from '../types/dto/tarrifs.dto';

export const useTarrifs = () => {
  return useQuery<TarrifL1[], Error>({
    queryKey: ['tarrifs'],
    queryFn: () => tarrifsApi.getAll(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTarrif = (id: number) => {
  return useQuery<TarrifL1 | null, Error>({
    queryKey: ['tarrif', id],
    queryFn: () => tarrifsApi.getById(id),
    enabled: !!id,
  });
};

export const useTarrifL1s = () => {
  return useQuery<TarrifL1[], Error>({
    queryKey: ['tarrifL1s'],
    queryFn: () => tarrifsApi.getTarrifL1s(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTarrifL2s = () => {
  return useQuery<TarrifL2[], Error>({
    queryKey: ['tarrifL2s'],
    queryFn: () => tarrifsApi.getTarrifL2s(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateTarrif = () => {
  const queryClient = useQueryClient();
  
  return useMutation<TarrifL1, Error, Partial<TarrifL1>>({
    mutationFn: (tarrif) => tarrifsApi.create(tarrif),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarrifs'] });
    },
  });
};

export const useUpdateTarrif = () => {
  const queryClient = useQueryClient();
  
  return useMutation<TarrifL1, Error, TarrifL1>({
    mutationFn: (tarrif) => tarrifsApi.update(tarrif),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarrifs'] });
    },
  });
};

export const useDeleteTarrif = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, number>({
    mutationFn: (tarrifId) => tarrifsApi.delete(tarrifId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarrifs'] });
    },
  });
};

export const useCreateTarrifL2 = () => {
  const queryClient = useQueryClient();
  
  return useMutation<TarrifL2, Error, Partial<TarrifL2>>({
    mutationFn: (tarrifL2) => tarrifsApi.createL2(tarrifL2),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarrifs'] });
    },
  });
};

export const useUpdateTarrifL2 = () => {
  const queryClient = useQueryClient();
  
  return useMutation<TarrifL2, Error, TarrifL2>({
    mutationFn: (tarrifL2) => tarrifsApi.updateL2(tarrifL2),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarrifs'] });
    },
  });
};

export const useDeleteTarrifL2 = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, number>({
    mutationFn: (tarrifL2Id) => tarrifsApi.deleteL2(tarrifL2Id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarrifs'] });
    },
  });
};

export const useCreateTarrifL3 = () => {
  const queryClient = useQueryClient();
  
  return useMutation<TarrifL3, Error, Partial<TarrifL3>>({
    mutationFn: (tarrifL3) => tarrifsApi.createL3(tarrifL3),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarrifs'] });
    },
  });
};

export const useUpdateTarrifL3 = () => {
  const queryClient = useQueryClient();
  
  return useMutation<TarrifL3, Error, TarrifL3>({
    mutationFn: (tarrifL3) => tarrifsApi.updateL3(tarrifL3),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarrifs'] });
    },
  });
};

export const useDeleteTarrifL3 = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, number>({
    mutationFn: (tarrifL3Id) => tarrifsApi.deleteL3(tarrifL3Id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarrifs'] });
    },
  });
};
