'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import {
  DASHBOARD_SEGMENTS,
  dashboardPathForRole,
  roleToSegment,
  type DashboardSegment,
} from '@/lib/dashboard-path';
import { AdminDashboard } from '@/components/dashboard/admin-dashboard';
import { ManagerDashboard } from '@/components/dashboard/manager-dashboard';
import { EmployeeDashboard } from '@/components/dashboard/employee-dashboard';
import { SkeletonCard } from '@/components/shared/skeleton';

function isSegment(value: string): value is DashboardSegment {
  return DASHBOARD_SEGMENTS.includes(value as DashboardSegment);
}

export default function RoleDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const raw = typeof params?.role === 'string' ? params.role.toLowerCase() : '';
  const segment = isSegment(raw) ? raw : null;

  useEffect(() => {
    if (!user) return;
    if (!segment) {
      router.replace(dashboardPathForRole(user.role));
      return;
    }
    if (roleToSegment(user.role) !== segment) {
      router.replace(dashboardPathForRole(user.role));
    }
  }, [user, segment, router]);

  if (!user || !segment) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (roleToSegment(user.role) !== segment) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  switch (segment) {
    case 'admin':
      return <AdminDashboard />;
    case 'manager':
      return <ManagerDashboard />;
    case 'employee':
      return <EmployeeDashboard />;
    default:
      return null;
  }
}
