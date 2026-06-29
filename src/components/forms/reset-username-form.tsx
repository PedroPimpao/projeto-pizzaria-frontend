'use client';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Field, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
import { useActionState, useEffect } from 'react';
import { resetUsernameAction } from '@/app/_actions/auth';
import { useRouter } from 'next/navigation';

export const ResetUsernameForm = () => {
  const [state, formAction, isPending] = useActionState(resetUsernameAction, null);
  const router = useRouter();
  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      router.replace(state.redirectTo);
    }
  }, [state, router]);
  return (
    <>
      <Card className="bg-app-card w-full max-w-md border-0 p-0 text-white">
        <CardContent>
          <form action={formAction} className="space-y-4">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel>Novo nome</FieldLabel>
                  <Input
                    type="text"
                    id="newName"
                    name="newName"
                    placeholder="Digite o novo nome"
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
