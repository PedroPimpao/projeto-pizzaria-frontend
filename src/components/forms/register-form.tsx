import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardHeader, CardDescription, CardContent, CardFooter, CardTitle } from '../ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '../ui/field';
import { Input } from '../ui/input';

const RegisterForm = () => {
  return (
    <>
      <Card className="bg-app-card border-app-border mx-auto w-full max-w-md border p-6 text-white">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold sm:text-4xl">
            Sujeito<span className="text-brand-primary">Pizza</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action="" className="space-y-4">
            <FieldSet>
              <FieldDescription className="text-center text-white">
                Preencha os dados para criar sua conta
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel>Nome</FieldLabel>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Digite seu nome"
                    required
                    minLength={3}
                    className="bg-app-card border-app-border border text-white"
                  />
                </Field>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="text"
                    id="email"
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
                    placeholder="Digite sua senha"
                    required
                    minLength={3}
                    className="bg-app-card border-app-border border text-white"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <Button className="w-full p-4" type="submit">
              Criar conta
            </Button>
          </form>
          <div className='mt-4 w-full text-center'>
            <span className="font-extralight">Já tem uma conta?</span>{' '}
            <span>
              <Link href={'/login'}>Faça login</Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterForm;
