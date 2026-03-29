export type DashboardSegment = 'admin' | 'manager' | 'employee';

export function roleToSegment(role: string): DashboardSegment {
  switch (role) {
    case 'ADMIN':
      return 'admin';
    case 'MANAGER':
      return 'manager';
    default:
      return 'employee';
  }
}

export function dashboardPathForRole(role: string): `/dashboard/${DashboardSegment}` {
  return `/dashboard/${roleToSegment(role)}`;
}

export const DASHBOARD_SEGMENTS: DashboardSegment[] = ['admin', 'manager', 'employee'];
