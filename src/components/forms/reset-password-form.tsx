'use client';

import { Button } from '../ui/button';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
import { useActionState, useEffect } from 'react';
import { resetPasswordAction } from '@/app/_actions/auth';
import { useRouter } from 'next/navigation';
import Logo from '../logo';

export const ResetPasswordForm = () => {
  const [state, formAction, isPending] = useActionState(resetPasswordAction, null);
  const router = useRouter();
  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      router.replace(state.redirectTo);
    }
  }, [state, router]);
  return (
    <>
      <Card className="bg-app-card border-app-border mx-auto w-full max-w-md border p-6 text-white">
        <CardHeader>
          <Logo textSize="text-3xl" textSizeSm="text-4xl" />
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <FieldSet>
              <FieldDescription className="text-center text-white">
                Redefinição de senha
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel>Senha atual</FieldLabel>
                  <Input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    placeholder="Senha atual..."
                    required
                    minLength={3}
                    className="bg-app-card border-app-border border text-white"
                  />
                </Field>
                <Field>
                  <FieldLabel>Nova Senha</FieldLabel>
                  <Input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Nova senha..."
                    required
                    minLength={3}
                    className="bg-app-card border-app-border border text-white"
                  />
                </Field>
                <Field>
                  <FieldLabel>Nova Senha</FieldLabel>
                  <Input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    placeholder="Confirme a nova senha..."
                    required
                    minLength={3}
                    className="bg-app-card border-app-border border text-white"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <Button className="w-full p-4" type="submit">
              {isPending ? 'Confirmando...' : 'Confirmar'}
            </Button>

            {state?.error && <div className="text-sm text-red-400">{state.error}</div>}
          </form>
        </CardContent>
      </Card>
    </>
  );
};
