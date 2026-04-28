'use client';

import { usePathname } from 'next/navigation';
import Logo from '../logo';
import NavMenu from './sidebar/nav-menu';
import LogOutBtn from './sidebar/logout-btn';

export interface SidebarProps {
  username: string;
}

const Sidebar = ({ username }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <aside className="bg-app-sidebar border-app-border hidden h-screen w-64 flex-col overflow-hidden border-r lg:flex">
      <div className="border-app-border border-b p-6">
        <Logo textSize="text-xl" />
        <p className="mt-1 text-sm text-gray-300">Olá, {username}</p>
      </div>

      {/* MENU */}
      <NavMenu />

      <div className="border-app-border border-t p-4">
        <LogOutBtn />
      </div>
    </aside>
  );
};

export default Sidebar;
