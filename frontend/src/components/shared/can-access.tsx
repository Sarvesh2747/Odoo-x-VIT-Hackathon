'use client';
import { useAuthStore } from '@/store/auth';

type Role = 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

interface CanAccessProps {
  roles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function CanAccess({ roles, children, fallback = null }: CanAccessProps) {
  const user = useAuthStore((s) => s.user);
  if (!user) return <>{fallback}</>;
  if (!roles.includes(user.role as Role)) return <>{fallback}</>;
  return <>{children}</>;
}
