import apiClient from '../api';

export interface CreateExpensePayload {
  amount: number;
  currency: string;
  category: 'TRAVEL' | 'FOOD' | 'ACCOMMODATION' | 'EQUIPMENT' | 'OTHER';
  description: string;
  date: string;
  receiptUrl?: string;
  ocrJobId?: string;
}

export const expensesApi = {
  list: (params?: Record<string, string | number>) =>
    apiClient.get('/expenses', { params }).then((r) => r.data),
  get: (id: string) => apiClient.get(`/expenses/${id}`).then((r) => r.data),
  create: (data: CreateExpensePayload) => apiClient.post('/expenses', data).then((r) => r.data),
  cancel: (id: string) => apiClient.patch(`/expenses/${id}/cancel`).then((r) => r.data),
  stats: () => apiClient.get('/expenses/stats').then((r) => r.data),
};
