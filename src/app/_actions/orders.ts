'use server';

import { apiClient } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export const finishOrderAction = async (orderID: string) => {
  try {
    if (!orderID) {
      return { success: false, error: 'Falha ao finalizar pedido' };
    }

    const token = await getToken();
    if (!token) {
      return { success: false, error: 'Usuário não autenticado' };
    }

    const data = {
      order_id: orderID,
    };
    await apiClient('/order/finish', {
      method: 'PATCH',
      body: JSON.stringify(data),
      token: token,
    });

    revalidatePath('/dashboard');
    return { success: true, error: '' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: 'Erro ao finalizar pedido' };
  }
};
