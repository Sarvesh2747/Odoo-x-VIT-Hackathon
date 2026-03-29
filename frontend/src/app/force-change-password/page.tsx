'use client';

import * as React from 'react';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ForceChangePasswordPage() {
  const { user, updateToken, updateUser } = useAuthStore();
  const router = useRouter();
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');

  const mutation = useMutation({
    mutationFn: (newPassword: string) => apiClient.post('/auth/change-password', { newPassword }),
    onSuccess: (data) => {
      updateToken(data.data.accessToken);
      updateUser({ mustChangePassword: false });
      toast.success('Password changed successfully');
      router.push('/dashboard');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to change password');
    }
  });

  if (!user || !user.mustChangePassword) {
    if (typeof window !== 'undefined') router.push('/dashboard');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    mutation.mutate(password);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">Update Your Password</CardTitle>
          <CardDescription className="text-center">
            You are using an auto-generated password. Please change it before continuing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full mt-4" disabled={mutation.isPending}>
              {mutation.isPending ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
