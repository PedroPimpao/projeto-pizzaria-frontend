import { CodeValidationForm } from '@/components/forms/code-validation-form';
import { Suspense } from 'react';

const CodeValidationPage = () => {
  return (
    <>
      <div className="bg-app-background flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full">
          <Suspense fallback={<div className="text-center text-white">Carregando...</div>}>
            <CodeValidationForm />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default CodeValidationPage;
