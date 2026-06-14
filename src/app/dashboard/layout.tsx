import MobileSidebar from '@/components/dashboard/mobile-sidebar';
import Sidebar from '@/components/dashboard/sidebar';
import { requiredAdmin } from '@/lib/auth';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requiredAdmin();

  return (
    <div className="flex h-screen overflow-hidden text-white">
      {/* SIDEBAR DESKTOP */}
      <Sidebar username={user.name} />
      {/* {children} */}

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* HEADER MOBILE */}
        <MobileSidebar username={user.name} />
        <main className="bg-app-background flex-1 overflow-y-auto">
          <div className="container max-w-full px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
