'use client';

import { LogOut, Package, ShoppingCart, Tags } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logo from '../logo';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { logoutAction } from '@/app/_actions/auth';
import { menuItems } from '@/app/_constants/menu-items';

export interface SidebarProps {
  username: string;
}

const Sidebar = ({ username }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <aside className="bg-app-sidebar border-app-border hidden h-screen w-64 flex-col overflow-hidden border-r lg:flex">
      {/* <h1>Sidebar: {username}</h1> */}
      <div className="border-app-border border-b p-6">
        <Logo textSize="text-xl" />
        <p className="mt-1 text-sm text-gray-300">Olá, {username}</p>
      </div>

      {/* MENU */}
      <nav className="flex flex-1 flex-col space-y-4 p-4">
        {menuItems.map((menu) => {
          const Icon = menu.icon;
          const isActive = pathname === menu.href;
          return (
            <Link
              href={menu.href}
              key={menu.title}
              className={cn(
                'flex flex-row items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300',
                isActive ? 'bg-brand-primary' : 'hover:bg-gray-800'
              )}
            >
              <>
                <Icon className="h-5 w-5" />
                {menu.title}
              </>
            </Link>
          );
        })}
      </nav>

      <div className="border-app-border border-t p-4">
        <form action={logoutAction}>
          <Button type="submit" variant={'ghost'} className="w-full justify-start gap-3">
            <LogOut className="h-5 w-5" />
            Sair
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;
