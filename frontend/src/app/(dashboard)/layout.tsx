'use client';

import { useAuthStore } from '@/store/auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CanAccess } from '@/components/shared/can-access';
import { LayoutDashboard, Users, CreditCard, ClipboardCheck, Settings } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user?.mustChangePassword && pathname !== '/force-change-password') {
      router.push('/force-change-password');
    }
  }, [user, pathname, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/expenses', label: 'Expenses', icon: CreditCard },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2 font-bold text-lg">
          Odoo x VIT Check
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">{user?.name} ({user?.role})</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r bg-muted/40 flex-col py-6 px-4 hidden md:flex">
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname.startsWith(item.href) ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}

            <CanAccess roles={['ADMIN', 'MANAGER']}>
              <Link 
                href="/approvals"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname.startsWith('/approvals') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                <ClipboardCheck className="h-4 w-4" />
                Approvals
              </Link>
            </CanAccess>

            <CanAccess roles={['ADMIN']}>
              <Link 
                href="/users"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname.startsWith('/users') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                <Users className="h-4 w-4" />
                Users
              </Link>
              <Link 
                href="/settings"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname.startsWith('/settings') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </CanAccess>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
