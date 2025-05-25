'use client';

import { Title } from '@/components/atoms/title/title';
import { Button } from '@/components/molecules/button/button';
import { TextInput } from '@/components/molecules/text-input/text-input';
import { useCodeValidation } from './code-validation.hook';

export const CodeValidationForm = () => {
  const { control, loading, handleCodeValidation } = useCodeValidation();

  return (
    <form
      className="flex flex-col gap-4 p-4 bg-mauve-100 rounded w-full max-w-[412px]"
      onSubmit={handleCodeValidation}
    >
      <Title
        title="Validação de código"
        subtitle="Digite o código enviado para seu e-mail"
      />
      <TextInput
        name="code"
        control={control}
        placeholder="Digite o código de validação"
        label="Código"
        maxLength={6}
        disabled={loading}
      />

      <Button type="submit" loading={loading} className="mt-2 w-full">
        Validar código
      </Button>
    </form>
  );
};
