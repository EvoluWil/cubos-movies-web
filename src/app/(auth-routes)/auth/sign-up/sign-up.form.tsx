'use client';

import { Title } from '@/components/atoms/title/title';
import { Button } from '@/components/molecules/button/button';
import { TextInput } from '@/components/molecules/text-input/text-input';
import { passwordValidations } from '@/validators/password-validator';
import Link from 'next/link';
import { useSignUp } from './sign-up.hook';

export const SignUpForm = () => {
  const { control, loading, handleSignUp } = useSignUp();

  return (
    <form
      className="flex flex-col gap-4 p-4 bg-mauve-100 rounded w-full max-w-[412px]"
      onSubmit={handleSignUp}
    >
      <Title
        title="Criar conta"
        subtitle="Digite suas informações para se cadastrar"
      />

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
        validators={passwordValidations}
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
