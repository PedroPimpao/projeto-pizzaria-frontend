import { logoutAction } from '@/app/_actions/auth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const LogOutBtn = () => {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant={'ghost'} className="w-full justify-start gap-3">
        <LogOut className="h-5 w-5" />
        Sair
      </Button>
    </form>
  );
};

export default LogOutBtn;
