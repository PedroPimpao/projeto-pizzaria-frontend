import { ResetEmailForm } from '@/components/forms/reset-email-form';

const ResetEmailPage = () => {
  return (
    <>
      <div className="bg-app-background flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full">
          <ResetEmailForm />
        </div>
      </div>
    </>
  );
};

export default ResetEmailPage;
