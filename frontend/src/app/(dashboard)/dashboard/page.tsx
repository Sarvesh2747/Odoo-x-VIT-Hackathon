'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenseStats } from '@/lib/hooks/useExpenses';
import { SkeletonCard } from '@/components/shared/skeleton';
import { Banknote, CheckCircle, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { data: stats, isLoading } = useExpenseStats();

  if (isLoading) return (
    <div className="grid gap-4 md:grid-cols-3">
       <SkeletonCard />
       <SkeletonCard />
       <SkeletonCard />
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Financial Overview</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Approved Volume</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${parseFloat(stats?.totalApprovedAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground mt-1">Converted to system currency</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Action Needed</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats?.pending || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Pending approval requests</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requests Cleared</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats?.approved || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Total approved historically</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

