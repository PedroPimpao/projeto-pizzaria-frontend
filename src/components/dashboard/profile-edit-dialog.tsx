'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { KeyRound, Mail, Pencil, UserCog } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ResetUsernameForm } from '../forms/reset-username-form';

const editOptions = [
  {
    label: 'Alterar nome do usuário',
    icon: UserCog,
    action: 'name',
  },
  {
    label: 'Redefinir email',
    icon: Mail,
    action: 'email',
  },
  {
    label: 'Redefinir senha',
    icon: KeyRound,
    action: 'password',
  },
];

const ProfileEditDialog = () => {
  const router = useRouter();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [nameOpen, setNameOpen] = useState(false);

  const handleNameOptionClick = () => {
    setOptionsOpen(false);
    setNameOpen(true);
  };

  const handleOptionClick = (action: string) => {
    if (action === 'name') {
      handleNameOptionClick();
      return;
    }

    if (action === 'email') {
      router.push('/profile/reset-email');
      return;
    }

    if (action === 'password') {
      router.push('/profile/reset-password');
    }
  };

  return (
    <>
      <Dialog open={optionsOpen} onOpenChange={setOptionsOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="border-app-border bg-app-sidebar hover:bg-app-background text-white hover:text-white"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Editar informações</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="border-app-border bg-app-card border p-6 text-white">
          <DialogHeader>
            <DialogTitle>Editar informações</DialogTitle>
            <DialogDescription className="text-gray-400">
              Escolha qual dado do perfil deseja atualizar.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            {editOptions.map((option) => {
              const Icon = option.icon;

              return (
                <Button
                  key={option.label}
                  type="button"
                  variant="outline"
                  onClick={() => handleOptionClick(option.action)}
                  className="border-app-border bg-app-background/60 hover:bg-app-background h-auto justify-start gap-3 px-4 py-3 text-white hover:text-white"
                >
                  <Icon className="text-brand-primary h-4 w-4" />
                  {option.label}
                </Button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={nameOpen} onOpenChange={setNameOpen}>
        <DialogContent className="border-app-border bg-app-card border p-6 text-white">
          <DialogHeader>
            <DialogTitle>Alterar nome do usuário</DialogTitle>
            <DialogDescription className="text-gray-400">
              Informe o novo nome para o perfil.
            </DialogDescription>
          </DialogHeader>
          <ResetUsernameForm/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileEditDialog;
