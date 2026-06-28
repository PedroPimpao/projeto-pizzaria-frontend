'use client';

import { OTPCodeValidationAction } from '@/app/_actions/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import Logo from '../logo';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Button } from '../ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

export const CodeValidationForm = () => {
  const [state, formAction, isPending] = useActionState(OTPCodeValidationAction, null);
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
                Insira o código OTP de 6 dígitos que você recebeu
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel className="mb-3 text-sm font-semibold tracking-wide text-white">
                    Código OTP
                  </FieldLabel>

                  <InputOTP
                    id="otpcode"
                    name="otpcode"
                    maxLength={6}
                    className="w-full justify-center"
                  >
                    <InputOTPGroup className="flex w-full justify-center gap-3">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="border-app-border bg-app-background data-[active=true]:border-brand-primary data-[active=true]:ring-brand-primary/30 data-[filled=true]:border-brand-primary/70 hover:border-brand-primary/60 h-12 w-12 rounded-md border text-2xl font-bold text-white transition-all duration-200 data-[active=true]:scale-105 data-[active=true]:shadow-[0_0_18px_rgba(255,63,75,0.45)] data-[active=true]:ring-2"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
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
