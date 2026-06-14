'use server';

import { apiClient } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { User } from '@/lib/types';

interface ChangeRoleProps {
  userId: string;
  role: string;
}

export const changeRole = async ({ userId, role }: ChangeRoleProps) => {

  try {
    const token = await getToken();
    console.log(`Novo cargo selecionado: ${role}`);
    const data = {
      user_id: userId,
      role: role,
    };
    await apiClient('/user/role', {
      method: 'PATCH',
      body: JSON.stringify(data),
      token: token!,
    });
  } catch (error) {
    throw new Error('Erro ao atualizar cargo do usuário');
  }
};
