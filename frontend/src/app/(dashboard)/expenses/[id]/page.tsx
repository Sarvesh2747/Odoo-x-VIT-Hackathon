'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useExpense, useCancelExpense } from '@/hooks/useExpenses';
import { ApprovalTimeline } from '@/components/shared/approval-timeline';
import { SkeletonCard } from '@/components/shared/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ArrowLeft, CheckCircle2, FileText, Ban } from 'lucide-react';

export default function ExpenseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: expense, isLoading } = useExpense(id);
  const cancelMutation = useCancelExpense();

  if (isLoading) return <SkeletonCard />;
  if (!expense) return <div>Expense not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Expense Details</h1>
        </div>
        {expense.status === 'PENDING' && (
          <Button 
            variant="destructive" 
            onClick={() => {
              if (confirm('Are you sure you want to cancel this expense?')) {
                cancelMutation.mutate(expense.id, {
                  onSuccess: () => router.push('/expenses')
                });
              }
            }}
            disabled={cancelMutation.isPending}
          >
            <Ban className="w-4 h-4 mr-2" /> Cancel Request
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <span className="text-muted-foreground block text-xs uppercase">Amount</span>
                <span className="font-semibold text-lg">{expense.currency} {parseFloat(expense.amount).toFixed(2)}</span>
                {expense.currency !== expense.companyCurrency && (
                  <div className="text-xs text-muted-foreground mt-1 text-yellow-600">
                    ≈ {expense.companyCurrency} {parseFloat(expense.convertedAmount).toFixed(2)}
                  </div>
                )}
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase">Status</span>
                <span className={`inline-flex mt-1 items-center rounded-full border px-2.5 py-0.5 font-semibold ${
                  expense.status === 'APPROVED' ? 'bg-green-100 text-green-700 border-green-200' :
                  expense.status === 'REJECTED' ? 'bg-red-100 text-red-700 border-red-200' :
                  expense.status === 'CANCELLED' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                  'bg-yellow-100 text-yellow-700 border-yellow-200'
                }`}>
                  {expense.status}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase">Submitter</span>
                <span className="font-medium mt-1">{expense.submittedBy.name}</span>
                <div className="text-muted-foreground text-xs">{expense.submittedBy.email}</div>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase">Category</span>
                <span className="font-medium mt-1 inline-block bg-muted px-2 py-0.5 rounded">{expense.category}</span>
              </div>
               <div className="col-span-2">
                <span className="text-muted-foreground block text-xs uppercase">Description</span>
                <p className="mt-1">{expense.description}</p>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase">Date Incurred</span>
                <span className="font-medium mt-1">{format(new Date(expense.date), 'MMMM dd, yyyy')}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase">Submitted On</span>
                <span className="font-medium mt-1">{format(new Date(expense.createdAt), 'MMMM dd, yyyy HH:mm')}</span>
              </div>
            </div>

            {expense.receiptUrl && (
              <div className="pt-4 border-t mt-4">
                <span className="text-muted-foreground block text-xs uppercase mb-2">Receipt</span>
                <a href={expense.receiptUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:underline group">
                  <div className="bg-primary/10 p-2 rounded group-hover:bg-primary/20 transition-colors">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  View attached receipt
                </a>
              </div>
            )}
            
            {expense.ocrExtracted && (
               <div className="flex items-center gap-2 mt-4 text-xs text-green-600 bg-green-50 p-2 rounded">
                 <CheckCircle2 className="w-4 h-4" />
                 Verified by OCR match
               </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approval Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            {expense.template ? (
              <div className="mb-4">
                <span className="text-muted-foreground block text-xs uppercase">Route</span>
                <div className="font-medium mt-1">{expense.template.name}</div>
              </div>
            ) : (
                <div className="mb-4 text-xs text-muted-foreground italic">No specific template assigned</div>
            )}
            <ApprovalTimeline steps={expense.approvals} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
