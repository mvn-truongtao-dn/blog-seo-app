import { useAuth } from '@/hooks/use-auth';
import { LoginPayload } from '@/models/auth';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';
export interface AuthProps {
  children: React.ReactNode;

}
export interface User {
  username: string; city: string; email: string;
}

export function Auth({ children }: AuthProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();
  useEffect(() => {
    if (!firstLoading && !profile?.username) {
      router.push('/login')
    }
  }, [router, profile, firstLoading])
  if (!profile?.username) return <Spin></Spin>;
  return <div>{children}</div>;
}
