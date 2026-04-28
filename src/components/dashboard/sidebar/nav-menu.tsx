import { menuItems } from '@/app/_constants/menu-items';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavMenu = () => {
  const pathname = usePathname();

  return (
    <>
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
    </>
  );
};

export default NavMenu;
