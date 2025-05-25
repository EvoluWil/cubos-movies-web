'use client';

import { Title } from '@/components/atoms/title/title';
import { Button } from '@/components/molecules/button/button';
import { TextInput } from '@/components/molecules/text-input/text-input';
import { useForgotPassword } from './forgot-password.hook';

export const ForgotPasswordForm = () => {
  const { control, loading, handleForgotPassword } = useForgotPassword();

  return (
    <form
      className="flex flex-col gap-4 p-4 bg-mauve-100 rounded w-full max-w-[412px]"
      onSubmit={handleForgotPassword}
    >
      <Title
        title="Recuperar senha"
        subtitle="Digite seu e-mail para recuperar sua senha"
      />

      <TextInput
        label="E-mail"
        name="email"
        type="email"
        placeholder="Digite seu e-mail"
        control={control}
        disabled={loading}
      />

      <Button type="submit" loading={loading} className="mt-2 w-full">
        Recuperar senha
      </Button>
    </form>
  );
};
