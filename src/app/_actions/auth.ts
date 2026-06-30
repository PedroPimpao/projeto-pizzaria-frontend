'use server';

import { apiClient } from '@/lib/api';
import { getToken, getUser, removeToken, setToken } from '@/lib/auth';
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

    let redirectPage = '/profile';

    const allowedRoles = ['ADMIN', 'SUPER_ADMIN', 'USER_ROOT'];

    if (allowedRoles.includes(response.role)) {
      redirectPage = '/dashboard';
    }

    await setToken(response.token);
    return { success: true, error: '', redirectTo: `/${redirectPage}` };
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
      user_id: formData.get('userId') as string,
      email: formData.get('email') as string,
    };

    const response = await apiClient<RequestResetResponse>('/session/request-reset', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    console.log(`Inserido -> Email: ${data.email}`);
    console.log(`User ID: ${response.userId} | OTP: ${response.OTP}`);
    return {
      success: true,
      error: '',
      redirectTo: `/code-validation?userId=${response.userId}&otpCode=${response.OTP}`,
    };
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

    return {
      success: true,
      error: '',
      message: response.message,
      redirectTo: `/recover-access?userId=${data.user_id}`,
    };
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

export const resetEmailAction = async (prevState: State | null | undefined, formData: FormData) => {
  try {
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        error: 'Usuário não autenticado.',
      };
    }

    const user = await getUser();

    const data = {
      user_id: user?.id,
      password: formData.get('password') as string,
      new_email: formData.get('newEmail') as string,
    };

    const response = await apiClient('/session/reset-email', {
      method: 'PATCH',
      body: JSON.stringify(data),
      token: token!,
    });

    return { success: true, error: '', redirectTo: '/profile' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    console.log('Erro ao redefinir email');
    return { success: false, error: 'Erro ao redefinir email' };
  }
};

export const resetPasswordAction = async (
  prevState: State | null | undefined,
  formData: FormData
) => {
  try {
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        error: 'Usuário não autenticado.',
      };
    }

    const user = await getUser();

    const data = {
      user_id: user?.id,
      current_password: formData.get('currentPassword') as string,
      new_password: formData.get('newPassword') as string,
      confirm_new_password: formData.get('confirmNewPassword') as string,
    };

    const response = await apiClient('/session/reset-password', {
      method: 'PATCH',
      body: JSON.stringify(data),
      token: token!,
    });

    return { success: true, error: '', redirectTo: '/profile' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    console.log('Erro ao redefinir senha');
    return { success: false, error: 'Erro ao redefinir senha' };
  }
};

export const resetUsernameAction = async (prevState: State | null, formData: FormData) => {
  try {
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        error: 'Usuário não autenticado.',
      };
    }

    const user = await getUser();

    const data = {
      user_id: user?.id,
      new_name: formData.get('newName') as string,
    };

    const response = await apiClient('/session/update-username', {
      method: 'PATCH',
      body: JSON.stringify(data),
      token: token!,
    });

    return { success: true, error: '', redirectTo: '/profile' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    console.log('Erro ao redefinir nome de usuário');
    return { success: false, error: 'Erro ao redefinir nome de usuário' };
  }
};
