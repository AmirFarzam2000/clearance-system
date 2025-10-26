import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productgroupsApi } from '../api/productgroups';
import type { Productgroup } from '../types/productgroup.dto';

export const useProductgroups = () => {
  return useQuery<Productgroup[]>({
    queryKey: ['productgroups'],
    queryFn: () => productgroupsApi.getProductgroups()
  });
};

export const useProductGroupLevels = () => {
  return useQuery({
    queryKey: ['productGroupLevels'],
    queryFn: () => productgroupsApi.getProductGroupLevels()
  });
};

export const useProductgroup = (id: number) => {
  return useQuery<Productgroup>({
    queryKey: ['productgroup', id],
    queryFn: () => productgroupsApi.getProductgroupById(id),
    enabled: !!id
  });
};

export const useCreateProductgroup = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productgroup: Productgroup) => productgroupsApi.createProductgroup(productgroup),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productgroups'] });
    }
  });
};

export const useUpdateProductgroup = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productgroup: Productgroup) => productgroupsApi.updateProductgroup(productgroup),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productgroups'] });
    }
  });
};

export const useDeleteProductgroup = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => productgroupsApi.deleteProductgroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productgroups'] });
    }
  });
};
