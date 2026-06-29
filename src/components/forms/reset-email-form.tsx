'use client';

import { Button } from '../ui/button';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
import { useActionState, useEffect } from 'react';
import { resetEmailAction } from '@/app/_actions/auth';
import { useRouter } from 'next/navigation';
import Logo from '../logo';

export const ResetEmailForm = () => {
  const [state, formAction, isPending] = useActionState(resetEmailAction, null);
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
                Insira seu novo email
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel>Novo Email</FieldLabel>
                  <Input
                    type="text"
                    id="newEmail"
                    name="newEmail"
                    placeholder="Digite seu email"
                    required
                    minLength={3}
                    className="bg-app-card border-app-border border text-white"
                  />
                </Field>
                <Field>
                  <FieldLabel>Senha</FieldLabel>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Digite sua senha"
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
