'use client';

import { useRouter } from 'next/navigation';
import { useCreateExpense } from '@/lib/hooks/useExpenses';
import { ExpenseForm } from '@/components/forms/expense-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewExpensePage() {
  const router = useRouter();
  const createMutation = useCreateExpense();

  const handleSubmit = (values: any) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        router.push('/expenses');
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">New Expense</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
