'use client';

import { Button } from '@/components/molecules/button/button';
import { TextInput } from '@/components/molecules/text-input/text-input';
import Link from 'next/link';
import { useSignUp } from './sign-up.hook';
import { signUpPasswordValidations } from './sign-up.schema';

export const SignUpForm = () => {
  const { control, loading, handleSignUp } = useSignUp();

  return (
    <form
      className="flex flex-col gap-4 p-4 bg-mauve-100 rounded w-full max-w-[412px]"
      onSubmit={handleSignUp}
    >
      <TextInput
        label="Nome"
        name="profile.name"
        placeholder="Digite seu nome"
        disabled={loading}
        control={control}
      />
      <TextInput
        label="E-mail"
        name="profile.email"
        placeholder="Digite seu e-mail"
        disabled={loading}
        control={control}
      />

      <TextInput
        label="Senha"
        name="credentials.password"
        placeholder="Digite sua senha"
        type="password"
        disabled={loading}
        control={control}
        validators={signUpPasswordValidations}
      />

      <TextInput
        label="Confirmação de senha"
        name="credentials.passwordConfirmation"
        placeholder="Digite sua senha novamente"
        type="password"
        disabled={loading}
        control={control}
      />

      <Button loading={loading}>Cadastrar</Button>

      <span className="text-center text-mauve-900 text-sm">
        Já tem uma conta?{' '}
        <Link
          href="/auth/sign-in"
          className="text-brand-700 font-bold underline"
        >
          Entre
        </Link>
      </span>
    </form>
  );
};
