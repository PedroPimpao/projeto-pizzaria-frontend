'use server';

import { apiClient } from '@/lib/api';
import { removeToken, setToken } from '@/lib/auth';
import {
  AuthResponse,
  OTPCodeValidationResponse,
  RecoverAccessResponse,
  RequestResetResponse,
  User,
} from '@/lib/types';
import { redirect } from 'next/navigation';

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

    await setToken(response.token);
    return { success: true, error: '', redirectTo: '/dashboard' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    console.log('Erro ao fazer login');
    return { success: false, error: 'Erro ao fazer login' };
  }
};

export const logoutAction = async () => {
  await removeToken();
  redirect('/login');
};

export const requestResetPasswordAction = async (prevState: State, formData: FormData) => {
  try {
    const data = {
      email: formData.get('email') as string,
    };

    const response = await apiClient<RequestResetResponse>('/session/request-reset', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    console.log(`Inserido -> Email: ${data.email}`);
    console.log(`User ID: ${response.userId} | OTP: ${response.OTP}`);
    return { success: true, error: '', redirectTo: `/code-validation?userId=${response.userId}` };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    console.log('Erro ao solicitar redefinição de senha');
    return { success: false, error: 'Erro ao solicitar redefinição de senha' };
  }
};

export const OTPCodeValidationAction = async (prevState: State, formData: FormData) => {
  try {
    const data = {
      user_id: formData.get('userId') as string,
      otp_code: formData.get('otpcode') as string,
    };

    const response = await apiClient<OTPCodeValidationResponse>('/session/code-validation', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    console.log(`Inserido -> User ID: ${data.user_id} | Código OTP: ${data.otp_code}`);
    console.log(`Mensagem: ${response.message}`);

    return { success: true, error: '', message: response.message, redirectTo: `/recover-access?userId=${data.user_id}` };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    console.log('Erro ao validar código OTP');
    return { success: false, error: 'Erro ao validar código OTP' };
  }
};

export const recoverAccessAction = async (prevState: State, formData: FormData) => {
  try {
    const data = {
      user_id: formData.get('userId') as string,
      new_password: formData.get('newPassword') as string,
      confirm_new_password: formData.get('confirmNewPassword') as string,
    };

    const response = await apiClient<RecoverAccessResponse>('/session/forgot-password', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    console.log(
      `Inserido -> User ID: ${data.user_id} | Nova senha: ${data.new_password} | Confirmação senha: ${data.confirm_new_password}`
    );
    console.log(`Mensagem: ${response.message}`);
    return { success: true, error: '', message: response.message, redirectTo: '/login' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    console.log('Erro ao redefinir senha');
    return { success: false, error: 'Erro ao redefinir senha' };
  }
};
