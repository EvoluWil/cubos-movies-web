'use client';

import { authService } from '@/services/auth.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  ResetPasswordFormDto,
  resetPasswordFormInitialValues,
  resetPasswordFormSchema,
} from './reset-password.schema';

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<ResetPasswordFormDto>({
    defaultValues: resetPasswordFormInitialValues,
    resolver: yupResolver(resetPasswordFormSchema),
  });
  const { replace } = useRouter();
  const { token } = useParams<{ token: string }>();

  const handleResetPassword = handleSubmit(
    async (data: ResetPasswordFormDto) => {
      setLoading(true);
      const result = await authService.resetPassword(token, data);

      if (result) {
        toast.success('Senha redefinida com sucesso!');
        return replace('/auth/sign-in');
      }

      setLoading(false);
    },
  );

  return {
    control,
    loading,
    handleResetPassword,
  };
};
