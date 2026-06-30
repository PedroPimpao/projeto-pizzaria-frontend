'use server';

import { apiClient } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { Category } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export const createCategoryAction = async (formData: FormData) => {
  try {
    const token = await getToken();

    if (!token) {
      return { success: false, error: 'Usuário não autenticado' };
    }

    const categoryName = formData.get('categoryName');

    const data = {
      name: categoryName,
    };
    await apiClient<Category>('/category', {
      method: 'POST',
      body: JSON.stringify(data),
      token: token,
    });

    revalidatePath('/dashboard/categories');
    return { success: true, error: '' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Erro ao criar categoria' };
  }
};

export const renameCategoryAction = async (formData: FormData, categoryId: string) => {
  const token = await getToken();

  const categoryExists = await apiClient<Category>(`/category?categoryId=${categoryId}`, {
    method: 'GET',
    token: token,
  });

  if (!categoryExists) {
    return { success: false, error: 'Categoria não existe' };
  }

  try {
    const token = await getToken();

    if (!token) {
      return { success: false, error: 'Usuário não autenticado' };
    }

    const newCategoryName = formData.get('categoryName');

    const data = {
      categoryId: categoryId,
      newCategoryName: newCategoryName
    };

    await apiClient<Category>('/category/rename', {
      method: 'PATCH',
      body: JSON.stringify(data),
      token: token,
    });

    revalidatePath('/dashboard/categories');
    return { success: true, error: '' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Erro ao renomear categoria' };
  }
};
