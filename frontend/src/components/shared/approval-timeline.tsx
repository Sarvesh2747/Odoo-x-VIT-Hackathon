import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, Clock, XCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineStep {
  id: string;
  stepOrder: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SKIPPED';
  approver: { name: string; email: string };
  comments?: string;
  actionedAt?: string;
}

export function ApprovalTimeline({ steps = [] }: { steps: TimelineStep[] }) {
  if (steps.length === 0) return <div className="text-muted-foreground text-sm">No approval workflow needed.</div>;

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isApproved = step.status === 'APPROVED';
        const isRejected = step.status === 'REJECTED';
        const isPending = step.status === 'PENDING';

        return (
          <div key={step.id} className="flex gap-4 group">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center border-2',
                  isApproved && 'border-green-500 bg-green-50',
                  isPending && 'border-yellow-500 bg-yellow-50',
                  isRejected && 'border-destructive bg-destructive/10'
                )}
              >
                {isApproved && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                {isPending && <Clock className="w-4 h-4 text-yellow-500" />}
                {isRejected && <XCircle className="w-4 h-4 text-destructive" />}
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    'w-px h-full flex-1 my-2',
                    isApproved ? 'bg-green-500' : 'bg-border'
                  )}
                />
              )}
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm">Step {step.stepOrder}</h4>
                  <p className="text-sm text-foreground">{step.approver.name}</p>
                </div>
                {step.actionedAt && (
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(step.actionedAt), { addSuffix: true })}
                  </span>
                )}
              </div>
              {step.comments && (
                <div className="mt-2 text-sm bg-muted/50 p-2 rounded italic text-muted-foreground">
                  "{step.comments}"
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
