import { RecoverAccessForm } from '@/components/forms/recover-access-form';
import { Suspense } from 'react';

const RecoverAccessPage = () => {
  return (
    <>
      <div className="bg-app-background flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full">
          <Suspense fallback={<div className="text-center text-white">Carregando...</div>}>
            <RecoverAccessForm />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default RecoverAccessPage;
