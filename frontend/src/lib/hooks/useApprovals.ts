'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { approvalsApi } from '../api/approvals';
import { toast } from 'sonner';

export const usePendingApprovals = () =>
  useQuery({ queryKey: ['approvals', 'pending'], queryFn: () => approvalsApi.pending() });

export const useApprove = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ expenseId, comments }: { expenseId: string; comments?: string }) =>
      approvalsApi.approve(expenseId, comments),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['approvals'] });
      qc.invalidateQueries({ queryKey: ['expenses'] });
      toast.success('Expense approved');
    },
    onError: (err: any) => toast.error(err?.response?.data?.message ?? 'Approval failed'),
  });
};

export const useReject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ expenseId, comments }: { expenseId: string; comments?: string }) =>
      approvalsApi.reject(expenseId, comments),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['approvals'] });
      qc.invalidateQueries({ queryKey: ['expenses'] });
      toast.success('Expense rejected');
    },
    onError: (err: any) => toast.error(err?.response?.data?.message ?? 'Rejection failed'),
  });
};

export const useTemplates = () =>
  useQuery({ queryKey: ['templates'], queryFn: () => approvalsApi.listTemplates() });

export const useRoutingRules = () =>
  useQuery({ queryKey: ['routing-rules'], queryFn: () => approvalsApi.listRoutingRules() });

export const useCreateTemplate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => approvalsApi.createTemplate(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template created');
    },
    onError: (err: any) => toast.error(err?.response?.data?.message ?? 'Failed to create template'),
  });
};

export const useDeleteTemplate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approvalsApi.deleteTemplate(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template deleted');
    },
  });
};

export const useCreateRoutingRule = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => approvalsApi.createRoutingRule(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['routing-rules'] });
      toast.success('Routing rule created');
    },
    onError: (err: any) =>
      toast.error(err?.response?.data?.message ?? 'Failed to create routing rule'),
  });
};

export const useDeleteRoutingRule = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approvalsApi.deleteRoutingRule(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['routing-rules'] });
      toast.success('Routing rule deleted');
    },
  });
};
