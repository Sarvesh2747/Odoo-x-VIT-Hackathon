import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  companyId: string;
  managerId?: string | null;
  isManagerApprover: boolean;
  mustChangePassword: boolean;
  company?: {
    id: string;
    name: string;
    defaultCurrency: string;
    country: string;
  };
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  updateToken: (token: string) => void;
  updateUser: (userData: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      login: (userData, token) =>
        set({
          user: userData,
          accessToken: token,
          isAuthenticated: true,
        }),

      updateToken: (token) =>
        set({
          accessToken: token,
          isAuthenticated: !!token,
        }),

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      logout: () => {
        // Clear supplemental auth status cookie used by middleware
        document.cookie = 'auth-status=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      // only persist user and accessToken. isAuthenticated is derived but we can persist it
    }
  )
);
