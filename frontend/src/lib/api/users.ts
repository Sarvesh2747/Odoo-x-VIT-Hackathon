import apiClient from '../api';

export interface CreateUserPayload {
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
  managerId?: string;
  isManagerApprover?: boolean;
}

export interface UpdateUserPayload {
  name?: string;
  role?: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
  managerId?: string;
  isManagerApprover?: boolean;
}

export const usersApi = {
  list: () => apiClient.get('/users').then((r) => r.data),
  get: (id: string) => apiClient.get(`/users/${id}`).then((r) => r.data),
  create: (data: CreateUserPayload) => apiClient.post('/users', data).then((r) => r.data),
  update: (id: string, data: UpdateUserPayload) =>
    apiClient.patch(`/users/${id}`, data).then((r) => r.data),
  assignRole: (id: string, role: string) =>
    apiClient.patch(`/users/${id}/role`, { role }).then((r) => r.data),
  assignManager: (id: string, managerId: string) =>
    apiClient.patch(`/users/${id}/manager`, { managerId }).then((r) => r.data),
  remove: (id: string) => apiClient.delete(`/users/${id}`).then((r) => r.data),
};
