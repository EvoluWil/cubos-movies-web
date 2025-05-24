import { BaseInputValidators } from '@/components/atoms/base-input/base-input';
import * as yup from 'yup';

export interface SignUpFormDto {
  profile: {
    name: string;
    email: string;
  };
  credentials: {
    password: string;
    passwordConfirmation: string;
  };
}

export const signUpFormInitialValues: SignUpFormDto = {
  profile: {
    name: '',
    email: '',
  },
  credentials: {
    password: '',
    passwordConfirmation: '',
  },
};

export const signUpPasswordValidations: BaseInputValidators[] = [
  {
    regex: /(?=.{8,})/,
    message: 'Deve ter pelo menos 8 caracteres',
  },
  {
    regex: /^(?=.*[a-z])/,
    message: 'Deve conter pelo menos uma letra minúscula',
  },
  {
    regex: /^(?=.*[A-Z])/,
    message: 'Deve conter pelo menos uma letra maiúscula',
  },
  {
    regex: /^(?=.*\d)/,
    message: 'Deve conter pelo menos um número',
  },
  {
    regex: /^(?=.*[@$!%*#?&])/,
    message: 'Deve conter pelo menos um caractere especial',
  },
];

export const signUpFormSchema = yup.object({
  profile: yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  }),
  credentials: yup.object().shape({
    password: yup
      .string()
      .required('')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])(?=.{8,})/, ''),
    passwordConfirmation: yup
      .string()
      .required('Confirmação de senha é obrigatória')
      .oneOf([yup.ref('password')], 'Senhas devem ser iguais'),
  }),
});
