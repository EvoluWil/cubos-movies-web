import { authService } from '@/services/auth.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  SignUpFormDto,
  signUpFormInitialValues,
  signUpFormSchema,
} from './sign-up.schema';

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<SignUpFormDto>({
    defaultValues: signUpFormInitialValues,
    resolver: yupResolver(signUpFormSchema),
  });

  const { replace } = useRouter();

  const handleSignUp = handleSubmit(async (signUpFormDto: SignUpFormDto) => {
    setLoading(true);
    const result = await authService.signUp(signUpFormDto);

    if (result) {
      toast.success('Cadastro realizado com sucesso!');
      return replace('/auth/sign-in');
    }

    setLoading(false);
  });

  return {
    control,
    loading,
    handleSignUp,
  };
};
