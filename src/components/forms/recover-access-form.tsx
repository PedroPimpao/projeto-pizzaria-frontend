'use client';

import { recoverAccessAction } from '@/app/_actions/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Logo from '../logo';

export const RecoverAccessForm = () => {
  const [state, formAction, isPending] = useActionState(recoverAccessAction, null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
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
            <input type="hidden" name="userId" value={userId ?? ''} />
            <FieldSet>
              <FieldDescription className="text-center text-white">
                Defina sua nova senha
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel>Nova senha</FieldLabel>
                  <Input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Senha..."
                    required
                    minLength={3}
                    className="bg-app-card border-app-border border text-white"
                  />
                </Field>
                <Field>
                  <FieldLabel>Confirme a nova senha</FieldLabel>
                  <Input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    placeholder="Senha..."
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
