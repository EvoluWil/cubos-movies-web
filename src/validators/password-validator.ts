import { BaseInputValidators } from '@/components/atoms/base-input/base-input';

export const passwordValidations: BaseInputValidators[] = [
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
