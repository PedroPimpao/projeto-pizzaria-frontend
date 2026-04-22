import RegisterForm from '@/components/forms/register-form';
import { Button } from '@/components/ui/button';

const Register = () => {
  return (
    <>
      <div className="bg-app-background flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full">
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Register;
