'use client';
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { currencyApi } from '@/lib/api/misc';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function CurrencySelector({ value, onChange, disabled }: CurrencySelectorProps) {
  const { data: countries, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: () => currencyApi.countries(),
  });

  const currencies = React.useMemo(() => {
    if (!countries) return [];
    const arr = countries.flatMap((c: any) => c.currencies);
    const unique = Array.from(new Map(arr.map((item: any) => [item.code, item])).values());
    return (unique as any[]).sort((a, b) => a.code.localeCompare(b.code));
  }, [countries]);

  return (
    <Select value={value} onValueChange={(val: string | null) => { if(val) onChange(val); }} disabled={disabled || isLoading}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            {currency.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
