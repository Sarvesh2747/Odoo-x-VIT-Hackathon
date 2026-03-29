'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CurrencySelector } from '@/components/shared/currency-selector';
import { FileUploader } from '@/components/shared/file-uploader';

const expenseSchema = z.object({
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
  currency: z.string().min(1, 'Currency is required'),
  category: z.enum(['TRAVEL', 'FOOD', 'ACCOMMODATION', 'EQUIPMENT', 'OTHER']),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  date: z.string().min(1, 'Date is required'),
  receiptUrl: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  initialValues?: Partial<ExpenseFormValues>;
  onSubmit: (values: ExpenseFormValues) => void;
  isLoading?: boolean;
}

export function ExpenseForm({ initialValues, onSubmit, isLoading }: ExpenseFormProps) {
  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: initialValues?.amount ?? 0,
      currency: initialValues?.currency ?? 'USD',
      category: initialValues?.category ?? 'OTHER',
      description: initialValues?.description ?? '',
      date: initialValues?.date ?? new Date().toISOString().split('T')[0],
      receiptUrl: initialValues?.receiptUrl ?? '',
    },
  });

  const handleUploadSuccess = (url: string) => {
    form.setValue('receiptUrl', url);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Amount</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input type="number" step="0.01" {...field} className="flex-1" />
                  </FormControl>
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field: currencyField }) => (
                      <CurrencySelector
                        value={currencyField.value}
                        onChange={currencyField.onChange}
                      />
                    )}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(val: string | null) => { if(val) field.onChange(val) }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="TRAVEL">Travel</SelectItem>
                    <SelectItem value="FOOD">Food</SelectItem>
                    <SelectItem value="ACCOMMODATION">Accommodation</SelectItem>
                    <SelectItem value="EQUIPMENT">Equipment</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., Client dinner at XYZ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Receipt (Optional)</h3>
          {!form.watch('receiptUrl') ? (
            <FileUploader onUploadSuccess={handleUploadSuccess} />
          ) : (
            <div className="flex items-center gap-4 p-4 border rounded-md bg-muted/20">
              <span className="text-sm text-muted-foreground truncate flex-1">
                Receipt uploaded
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => form.setValue('receiptUrl', '')}
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Expense'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
