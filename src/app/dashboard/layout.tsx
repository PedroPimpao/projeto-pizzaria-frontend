import { requiredAdmin } from "@/lib/auth";
import { User } from "@/lib/types";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requiredAdmin();

  console.log('USUÁRIO LOGADO ', user)

  return (
    <div className="text-white">
      <h1>AAAAA</h1>
      {children}
    </div>
  );
}
