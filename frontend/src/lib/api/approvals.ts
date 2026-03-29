import apiClient from '../api';

export const approvalsApi = {
  pending: () => apiClient.get('/approvals/pending').then((r) => r.data),
  approve: (expenseId: string, comments?: string) =>
    apiClient.post(`/approvals/${expenseId}/approve`, { comments }).then((r) => r.data),
  reject: (expenseId: string, comments?: string) =>
    apiClient.post(`/approvals/${expenseId}/reject`, { comments }).then((r) => r.data),

  // Templates
  listTemplates: () => apiClient.get('/approvals/templates').then((r) => r.data),
  getTemplate: (id: string) => apiClient.get(`/approvals/templates/${id}`).then((r) => r.data),
  createTemplate: (data: Record<string, unknown>) =>
    apiClient.post('/approvals/templates', data).then((r) => r.data),
  updateTemplate: (id: string, data: Record<string, unknown>) =>
    apiClient.patch(`/approvals/templates/${id}`, data).then((r) => r.data),
  deleteTemplate: (id: string) =>
    apiClient.delete(`/approvals/templates/${id}`).then((r) => r.data),
  addStep: (templateId: string, data: Record<string, unknown>) =>
    apiClient.post(`/approvals/templates/${templateId}/steps`, data).then((r) => r.data),
  deleteStep: (stepId: string) =>
    apiClient.delete(`/approvals/steps/${stepId}`).then((r) => r.data),

  // Routing rules
  listRoutingRules: () => apiClient.get('/approvals/routing-rules').then((r) => r.data),
  createRoutingRule: (data: Record<string, unknown>) =>
    apiClient.post('/approvals/routing-rules', data).then((r) => r.data),
  updateRoutingRule: (id: string, data: Record<string, unknown>) =>
    apiClient.patch(`/approvals/routing-rules/${id}`, data).then((r) => r.data),
  deleteRoutingRule: (id: string) =>
    apiClient.delete(`/approvals/routing-rules/${id}`).then((r) => r.data),
  previewRouting: (amount: number) =>
    apiClient.get('/approvals/routing-rules/preview', { params: { amount } }).then((r) => r.data),
};
