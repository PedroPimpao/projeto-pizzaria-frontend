'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logo from '../logo';
import { Button } from '../ui/button';
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
import NavMenu from './sidebar/nav-menu';
import LogOutBtn from './sidebar/logout-btn';

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
              <NavMenu />
              <div className="border-app-border border-t p-4">
                <LogOutBtn />
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
