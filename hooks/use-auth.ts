import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';
import { authApi } from '../api-client';
import type { SWRConfiguration } from 'swr';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

export interface User {
  username: string;
  city: string;
  email: string;
}

const config: SWRConfiguration = {
  dedupingInterval: 360000,
  revalidateOnFocus: false,
};
export function useAuth(options?: Partial<PublicConfiguration>) {
  //   const {
  //     data: profile,
  //     error,
  //     mutate,
  //   } = useSWR('/profile', config);
  const { mutate, error } = useSWR('/profile', {
    dedupingInterval: 1000,
    revalidateOnFocus: false,
    ...options,
  });
  const router = useRouter();
  const { data: profile } = useSWR<User>('/profile', config);
  console.log({ profile, error });
  const firstLoading = profile === undefined && error === undefined;
  console.log(firstLoading);
  const login = async (username: string, password: string) => {
    try {
      await authApi.login({
        username: username,
        password: password,
      });
      await mutate();
      router.push('/')
    } catch (error) {
    //   setIsLoading(false);
    }
  };

  const logout = async () => {
    await authApi.logout();
    mutate({}, false);
  };

  return {
    profile,
    error,
    login,
    logout,
    firstLoading,
    mutate,
  };
}
