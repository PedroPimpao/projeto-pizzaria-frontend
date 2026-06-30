import PageTitle from '@/components/pageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getUser } from '@/lib/auth';
import { User } from '@/lib/types';
import { Home, Mail, ShieldCheck, User2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import ProfileEditDialog from '@/components/dashboard/profile-edit-dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const roleLabels: Record<User['role'], string> = {
  ADMIN: 'Administrador',
  STAFF: 'Atendente',
  EXTERNAL: 'Externo',
  SUPER_ADMIN: 'Super administrador',
  USER_ROOT: 'Usuario root',
};

const ProfilePage = async () => {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const userInfo = [
    {
      label: 'Nome',
      value: user.name,
      icon: User2,
    },
    {
      label: 'Email',
      value: user.email,
      icon: Mail,
    },
    {
      label: 'Role',
      value: roleLabels[user.role],
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 text-white sm:space-y-6">
      <PageTitle title="Perfil" subtitle="Dados da sua conta" />

      <Card className="border-app-border bg-app-card mr-4 ml-4 w-full max-w-3xl border text-white">
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-brand-primary/15 text-brand-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                <User2 className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold sm:text-2xl">{user.name}</CardTitle>
                <p className="mt-1 text-sm text-gray-300">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link href={'/dashboard'}>
                <Button size={'default'}>
                  <Home />
                  Painel Admnistrativo
                </Button>
              </Link>
              <ProfileEditDialog />
            </div>
          </div>
        </CardHeader>

        <Separator className="bg-app-border" />

        <CardContent className="grid w-full gap-3 pt-2 sm:grid-cols-3">
          {userInfo.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="border-app-border bg-app-background/60 rounded-lg border p-4"
              >
                <div className="mb-3 flex items-center gap-2 text-gray-400">
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <p className="text-base font-semibold wrap-break-word text-white">{item.value}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
