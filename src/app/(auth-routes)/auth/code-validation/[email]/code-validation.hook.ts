'use client';

import { authService } from '@/services/auth.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  CodeValidationFormDto,
  codeValidationFormInitialValues,
  codeValidationFormSchema,
} from './code-validation.schema';

export const useCodeValidation = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<CodeValidationFormDto>({
    defaultValues: codeValidationFormInitialValues,
    resolver: yupResolver(codeValidationFormSchema),
  });
  const { replace } = useRouter();
  const { email } = useParams<{ email: string }>();

  const handleCodeValidation = handleSubmit(
    async (data: CodeValidationFormDto) => {
      setLoading(true);
      const result = await authService.validateCode(data.code, email);

      if (result) {
        toast.success('Código validado com sucesso!');
        return replace(`/auth/reset-password/${result.token}`);
      }
      setLoading(false);
    },
  );

  return {
    control,
    loading,
    handleCodeValidation,
  };
};
