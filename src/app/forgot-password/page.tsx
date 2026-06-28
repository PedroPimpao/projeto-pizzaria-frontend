import { RequestResetPasswordForm } from '@/components/forms/request-reset-password-form';

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="bg-app-background flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full">
          <RequestResetPasswordForm />
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
