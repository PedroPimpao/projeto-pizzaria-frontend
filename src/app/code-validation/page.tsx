import { CodeValidationForm } from '@/components/forms/code-validation-form';

const CodeValidationPage = () => {
  return (
    <>
      <div className="bg-app-background flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full">
          <CodeValidationForm />
        </div>
      </div>
    </>
  );
};

export default CodeValidationPage;
