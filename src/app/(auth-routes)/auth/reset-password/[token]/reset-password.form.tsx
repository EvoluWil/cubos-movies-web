'use client';

import { Title } from '@/components/atoms/title/title';
import { Button } from '@/components/molecules/button/button';
import { TextInput } from '@/components/molecules/text-input/text-input';
import { passwordValidations } from '@/validators/password-validator';
import { useResetPassword } from './reset-password.hook';

export const ResetPasswordForm = () => {
  const { control, loading, handleResetPassword } = useResetPassword();

  return (
    <form
      className="flex flex-col gap-4 p-4 bg-mauve-100 rounded w-full max-w-[412px]"
      onSubmit={handleResetPassword}
    >
      <Title title="Redefinir senha" subtitle="Digite sua nova senha abaixo" />

      <TextInput
        name="password"
        placeholder="Digite sua nova senha"
        control={control}
        label="Nova senha"
        type="password"
        disabled={loading}
        validators={passwordValidations}
      />

      <TextInput
        name="passwordConfirmation"
        placeholder="Digite sua nova senha novamente"
        control={control}
        label="Confirmar nova senha"
        type="password"
        disabled={loading}
      />

      <Button type="submit" loading={loading} className="mt-2 w-full">
        Redefinir senha
      </Button>
    </form>
  );
};
