'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
import { useActionState, useEffect } from 'react';
import { loginAction } from '@/app/_actions/auth';
import { useRouter } from 'next/navigation';
import Logo from '../logo';

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(loginAction, null);
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
          {/* <CardTitle className="text-center text-3xl font-bold sm:text-4xl">
            Sujeito<span className="text-brand-primary">Pizza</span>
          </CardTitle> */}
          <Logo/>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <FieldSet>
              <FieldDescription className="text-center text-white">
                Preencha os dados para entrar na sua conta
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="text"
                    id="email"
                    name="email"
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
              {isPending ? 'Entrando...' : 'Entrar'}
            </Button>

            {state?.error && (
                <div className='text-sm text-red-400'>
                    {state.error}
                </div>
            )}
          </form>
          <div className="mt-4 w-full text-center">
            <span className="font-extralight">Não tem uma conta?</span>{' '}
            <span>
              <Link href={'/register'}>Crie a sua</Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginForm;
