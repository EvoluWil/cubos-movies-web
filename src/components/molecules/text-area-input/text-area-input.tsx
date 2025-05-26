import {
  BaseTextarea,
  BaseTextareaProps,
} from '@/components/atoms/base-area-text/base-area-text';

import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

export type TextAreaInputProps<T extends FieldValues> = BaseTextareaProps &
  UseControllerProps<T>;

export const TextAreaInput = <T extends FieldValues>({
  defaultValue,
  name,
  control,
  rules,
  shouldUnregister,
  ...inputBaseProps
}: TextAreaInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue, rules, shouldUnregister });

  return (
    <BaseTextarea
      errorMessage={error?.message}
      {...inputBaseProps}
      {...field}
    />
  );
};
