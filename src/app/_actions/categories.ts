'use server';

export const getCategories = async (formData: FormData) => {
  const name = formData.get('categoryName');
  console.log(name);
};
