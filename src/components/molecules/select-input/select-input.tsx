import {
  BaseSelect,
  BaseSelectOption,
  BaseSelectProps,
} from '@/components/atoms/base-select/base-select';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

export type SelectInputProps<T extends FieldValues> = Omit<
  BaseSelectProps,
  'options'
> &
  UseControllerProps<T> & {
    options: BaseSelectOption[];
  };

export const SelectInput = <T extends FieldValues>({
  defaultValue,
  name,
  control,
  rules,
  shouldUnregister,
  options,
  ...selectBaseProps
}: SelectInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue, rules, shouldUnregister });

  return (
    <BaseSelect
      errorMessage={error?.message}
      options={options}
      {...selectBaseProps}
      {...field}
    />
  );
};
