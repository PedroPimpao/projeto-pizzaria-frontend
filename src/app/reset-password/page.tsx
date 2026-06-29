import { ResetPasswordForm } from '@/components/forms/reset-password-form';

const ResetPasswordPage = () => {
  return (
    <>
      <div className="bg-app-background flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full">
          <ResetPasswordForm />
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
