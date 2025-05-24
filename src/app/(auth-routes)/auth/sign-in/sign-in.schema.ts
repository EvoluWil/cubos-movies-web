import * as yup from 'yup';

export type SignInFormDto = {
  email: string;
  password: string;
};

export const signInFormInitialValues: SignInFormDto = {
  email: '',
  password: '',
};

export const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('E-mail invalido'),
  password: yup.string().required('Senha é obrigatória'),
});
