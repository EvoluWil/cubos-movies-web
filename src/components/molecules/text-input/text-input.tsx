import {
  BaseInput,
  BaseInputProps,
} from '@/components/atoms/base-input/base-input';

import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

export type TextInputProps<T extends FieldValues> = BaseInputProps &
  UseControllerProps<T>;

export const TextInput = <T extends FieldValues>({
  defaultValue,
  name,
  control,
  rules,
  shouldUnregister,
  ...inputBaseProps
}: TextInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue, rules, shouldUnregister });

  return (
    <BaseInput errorMessage={error?.message} {...inputBaseProps} {...field} />
  );
};
