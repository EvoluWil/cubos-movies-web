'use client';

import { encrypt } from '@/app/utils/crypto';
import { authService } from '@/services/auth.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  ForgotPasswordFormDto,
  forgotPasswordFormInitialValues,
  forgotPasswordFormSchema,
} from './forgot-password.schema';

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<ForgotPasswordFormDto>({
    defaultValues: forgotPasswordFormInitialValues,
    resolver: yupResolver(forgotPasswordFormSchema),
  });

  const { replace } = useRouter();

  const handleForgotPassword = handleSubmit(
    async (data: ForgotPasswordFormDto) => {
      setLoading(true);
      const email = encrypt(data.email);
      const result = await authService.forgotPassword(email);

      if (result) {
        toast.success('E-mail de recuperação enviado!');
        return replace(`/auth/code-validation/${email}`);
      }
      setLoading(false);
    },
  );

  return {
    control,
    loading,
    handleForgotPassword,
  };
};
