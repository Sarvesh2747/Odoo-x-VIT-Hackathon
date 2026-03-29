'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { expensesApi, CreateExpensePayload } from '../api/expenses';
import { toast } from 'sonner';

export const useExpenses = (params?: Record<string, string | number>) =>
  useQuery({ queryKey: ['expenses', params], queryFn: () => expensesApi.list(params) });

export const useExpense = (id: string) =>
  useQuery({ queryKey: ['expenses', id], queryFn: () => expensesApi.get(id), enabled: !!id });

export const useExpenseStats = () =>
  useQuery({ queryKey: ['expenses', 'stats'], queryFn: () => expensesApi.stats() });

export const useCreateExpense = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateExpensePayload) => expensesApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['expenses'] });
      toast.success('Expense submitted successfully');
    },
    onError: (err: any) =>
      toast.error(err?.response?.data?.message ?? 'Failed to submit expense'),
  });
};

export const useCancelExpense = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => expensesApi.cancel(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['expenses'] });
      toast.success('Expense cancelled');
    },
    onError: (err: any) =>
      toast.error(err?.response?.data?.message ?? 'Failed to cancel expense'),
  });
};
