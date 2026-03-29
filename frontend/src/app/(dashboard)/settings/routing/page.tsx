'use client';

import * as React from 'react';
import { useTemplates, useRoutingRules, useCreateRoutingRule } from '@/lib/hooks/useApprovals';
import { SkeletonTable } from '@/components/shared/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Route, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsRoutingPage() {
  const { data: routingRules, isLoading: loadingRules } = useRoutingRules();
  const { data: templates, isLoading: loadingTemplates } = useTemplates();
  const createMutation = useCreateRoutingRule();

  const [minAmount, setMinAmount] = React.useState('');
  const [maxAmount, setMaxAmount] = React.useState('');
  const [templateId, setTemplateId] = React.useState('');
  const [priority, setPriority] = React.useState('0');

  if (loadingRules || loadingTemplates) return <SkeletonTable rows={5} />;

  const handleCreate = () => {
    if (!minAmount || !templateId) return toast.error('Min amount and template are required');
    createMutation.mutate({
      minAmount: parseFloat(minAmount),
      maxAmount: maxAmount ? parseFloat(maxAmount) : null,
      templateId,
      priority: parseInt(priority, 10)
    }, {
      onSuccess: () => {
         setMinAmount('');
         setMaxAmount('');
         setTemplateId('');
         setPriority('0');
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Routing Rules</h1>
        <p className="text-muted-foreground mt-1 text-sm">Define how expenses are routed to templates based on converted amount</p>
      </div>

      <Card>
         <CardHeader>
           <CardTitle>Create Routing Rule</CardTitle>
           <CardDescription>Rules apply sequentially by Priority (highest first)</CardDescription>
         </CardHeader>
         <CardContent className="flex flex-wrap items-end gap-4">
            <div className="space-y-2 flex-1 min-w-[150px]">
               <label className="text-sm font-medium">Min Amount</label>
               <Input type="number" step="0.01" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} placeholder="0.00" />
            </div>
            <div className="space-y-2 flex-1 min-w-[150px]">
               <label className="text-sm font-medium">Max Amount</label>
               <Input type="number" step="0.01" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} placeholder="Leave blank for infinity" />
            </div>
            <div className="space-y-2 flex-1 min-w-[200px]">
               <label className="text-sm font-medium">Template to Trigger</label>
               <Select value={templateId} onValueChange={(val: string | null) => { if(val) setTemplateId(val); }}>
                 <SelectTrigger><SelectValue placeholder="Select template" /></SelectTrigger>
                 <SelectContent>
                   {templates?.map((t: any) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                 </SelectContent>
               </Select>
            </div>
            <div className="space-y-2 w-[100px]">
               <label className="text-sm font-medium">Priority</label>
               <Input type="number" value={priority} onChange={(e) => setPriority(e.target.value)} />
            </div>
            <Button className="shrink-0" onClick={handleCreate} disabled={createMutation.isPending}><Plus className="w-4 h-4 mr-2" />Add Rule</Button>
         </CardContent>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">System Currency Amount</th>
                <th className="px-4 py-3 font-medium">Routes To Template</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
               {routingRules?.map((r: any) => (
                 <tr key={r.id}>
                   <td className="px-4 py-4">{r.priority}</td>
                   <td className="px-4 py-4 font-mono">
                     {parseFloat(r.minAmount).toFixed(2)} - {r.maxAmount ? parseFloat(r.maxAmount).toFixed(2) : 'Infinity'}
                   </td>
                   <td className="px-4 py-4 font-medium flex items-center gap-2">
                     <Route className="w-4 h-4 text-muted-foreground"/> {r.template.name}
                   </td>
                   <td className="px-4 py-4">
                     <span className={r.isActive ? "text-green-600 bg-green-50 px-2 py-1 rounded" : "text-gray-500 bg-gray-50 px-2 py-1 rounded"}>
                        {r.isActive ? "Active" : "Disabled"}
                     </span>
                   </td>
                 </tr>
               ))}
               {!routingRules?.length && (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No routing rules defined. Using default template fallback.</td></tr>
               )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
