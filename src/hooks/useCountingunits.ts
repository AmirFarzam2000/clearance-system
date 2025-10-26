import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { countingunitsApi } from '../api/countingunits';
import type { CountingUnit } from '../types/countingunits.dto';

export const useCountingunits = () => {
  return useQuery<CountingUnit[]>({
    queryKey: ['countingunits'],
    queryFn: () => countingunitsApi.getCountingunits()
  });
};

export const useCountingunit = (id: number) => {
  return useQuery<CountingUnit>({
    queryKey: ['countingunit', id],
    queryFn: () => countingunitsApi.getCountingunitById(id),
    enabled: !!id
  });
};

export const useCreateCountingunit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (countingunit: CountingUnit) => countingunitsApi.createCountingunit(countingunit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countingunits'] });
    }
  });
};

export const useUpdateCountingunit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (countingunit: CountingUnit) => countingunitsApi.updateCountingunit(countingunit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countingunits'] });
    }
  });
};

export const useDeleteCountingunit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => countingunitsApi.deleteCountingunit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countingunits'] });
    }
  });
};
