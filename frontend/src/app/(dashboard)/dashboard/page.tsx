'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { dashboardPathForRole } from '@/lib/dashboard-path';
import { SkeletonCard } from '@/components/shared/skeleton';

export default function DashboardIndexPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) return;
    router.replace(dashboardPathForRole(user.role));
  }, [user, router]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
