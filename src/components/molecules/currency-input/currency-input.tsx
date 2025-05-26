'use client';

import { InputHTMLAttributes } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { TextInput } from '../text-input/text-input';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export type TextInputProps<T extends FieldValues> = Props &
  UseControllerProps<T>;

export const CurrencyInput = <T extends FieldValues>({
  label,
  defaultValue,
  name,
  control,
  rules,
  placeholder,
  shouldUnregister,
  className,
  disabled,
}: TextInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue, rules, shouldUnregister });

  const hasError = !!error?.message;

  return (
    <NumericFormat
      value={field.value}
      onValueChange={(values) => {
        field.onChange(values.value);
      }}
      prefix="$ "
      thousandSeparator
      decimalSeparator="."
      decimalScale={2}
      allowNegative={false}
      customInput={TextInput}
      disabled={disabled}
      name={field.name}
      label={label}
      errorMessage={hasError ? error.message : undefined}
      className={className}
      placeholder={placeholder}
    />
  );
};
