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
