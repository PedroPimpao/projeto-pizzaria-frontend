'use server';

import { apiClient } from '@/lib/api';
import { User } from '@/lib/types';

type State = {
  success: boolean;
  error: string;
  redirectTo?: string
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
    return { success: true, error: "", redirectTo: "/login" }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Erro ao criar conta' };
  }
};
