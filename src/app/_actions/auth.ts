'use server';

type State = {
  success: boolean;
  error: string;
} | null;

export const registerAction = async (prevState: State, formData: FormData) => {
  const user = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  console.log(user);
  return { success: true, error: '' };
};
