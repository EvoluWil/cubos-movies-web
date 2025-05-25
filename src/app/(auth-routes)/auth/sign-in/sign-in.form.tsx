'use client';

import { Title } from '@/components/atoms/title/title';
import { Button } from '@/components/molecules/button/button';
import { TextInput } from '@/components/molecules/text-input/text-input';
import Link from 'next/link';
import { useSignIn } from './sign-in.hook';

export const SignInForm = () => {
  const { control, loading, handleSignIn } = useSignIn();
  return (
    <form
      className="flex flex-col gap-4 p-4 bg-mauve-100 rounded w-full max-w-[412px]"
      onSubmit={handleSignIn}
    >
      <Title
        title={
          <>
            Boas vindas ao
            <span className="text-2xl font-bold text-brand-700">
              {' '}
              Cubos Movies!
            </span>
          </>
        }
        subtitle="Digite suas credenciais para acessar sua conta"
      />

      <TextInput
        label="Nome/E-email"
        name="email"
        placeholder="Digite seu nome/e-mail"
        disabled={loading}
        control={control}
      />
      <TextInput
        label="Senha"
        name="password"
        placeholder="Digite sua senha"
        type="password"
        disabled={loading}
        control={control}
      />

      <Link
        href="/auth/forgot-password"
        className="text-brand-700 font-bold underline ml-auto text-sm w-fit"
      >
        Esqueci minha senha
      </Link>

      <Button loading={loading}>Entrar</Button>

      <span className="text-center text-mauve-900 text-sm">
        Não tem uma conta?{' '}
        <Link
          href="/auth/sign-up"
          className="text-brand-700 font-bold underline"
        >
          Cadastre-se
        </Link>
      </span>
    </form>
  );
};
