'use client';

import { LogOut, Menu, Package, ShoppingCart, Tags } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logo from '../logo';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { logoutAction } from '@/app/_actions/auth';
import { menuItems } from '@/app/_constants/menu-items';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { SidebarProps } from './sidebar';

const MobileSidebar = ({ username }: SidebarProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <header className="border-app-border bg-app-card sticky top-0 z-50 border-b">
        <div className="flex h-16 items-center justify-between px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant={'ghost'} size={'icon'}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="bg-app-sidebar border-app-border w-72 border-b p-0 text-white"
              side="left"
            >
              <SheetHeader className="border-app-border border-b p-6">
                <SheetTitle className="text-xl font-bold text-white">Menu</SheetTitle>
                <SheetDescription>Olá, {username}!</SheetDescription>
              </SheetHeader>
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
            </SheetContent>
          </Sheet>
          <div>
            <Logo textSize="text-xl" />
          </div>
          <div className="w-10"></div>
        </div>
      </header>
    </div>
  );
};

export default MobileSidebar;
