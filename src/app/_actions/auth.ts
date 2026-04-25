'use server';

import { apiClient } from '@/lib/api';
import { setToken } from '@/lib/auth';
import { AuthResponse, User } from '@/lib/types';

type State = {
  success: boolean;
  error: string;
  redirectTo?: string;
} | null;

export const registerAction = async (prevState: State, formData: FormData) => {
  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const user = await apiClient<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    console.log(user);
    return { success: true, error: '', redirectTo: '/login' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Erro ao criar conta' };
  }
};

export const loginAction = async (prevState: State, formData: FormData) => {
  try {
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const response = await apiClient<AuthResponse>('/session', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    await setToken(response.token)
    console.log(response);
    return { success: true, error: '', redirectTo: '/dashboard' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    console.log('Erro ao fazer login');
    return { success: false, error: 'Erro ao fazer login' };
  }
};
