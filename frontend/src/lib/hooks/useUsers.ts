'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi, CreateUserPayload, UpdateUserPayload } from '../api/users';
import { toast } from 'sonner';

export const useUsers = () =>
  useQuery({ queryKey: ['users'], queryFn: () => usersApi.list() });

export const useUser = (id: string) =>
  useQuery({ queryKey: ['users', id], queryFn: () => usersApi.get(id), enabled: !!id });

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserPayload) => usersApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
    },
    onError: (err: any) => toast.error(err?.response?.data?.message ?? 'Failed to create user'),
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserPayload }) =>
      usersApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully');
    },
    onError: (err: any) => toast.error(err?.response?.data?.message ?? 'Failed to update user'),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast.success('User removed');
    },
    onError: (err: any) => toast.error(err?.response?.data?.message ?? 'Failed to delete user'),
  });
};
