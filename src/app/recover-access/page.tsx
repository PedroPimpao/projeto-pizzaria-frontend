import { RecoverAccessForm } from "@/components/forms/recover-access-form";

const RecoverAccessPage = () => {
  return (
    <>
      <div className="bg-app-background flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full">
          <RecoverAccessForm />
        </div>
      </div>
    </>
  );
};

export default RecoverAccessPage;
