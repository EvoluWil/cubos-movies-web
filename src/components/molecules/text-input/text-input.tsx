import {
  BaseInput,
  BaseInputProps,
} from '@/components/atoms/base-input/base-input';
import InputMask from '@mona-health/react-input-mask';
import { ChangeEvent } from 'react';

import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

export type TextInputProps<T extends FieldValues> = BaseInputProps &
  UseControllerProps<T> & {
    mask?: string;
  };

export const TextInput = <T extends FieldValues>({
  defaultValue,
  name,
  control,
  rules,
  shouldUnregister,
  mask,
  ...inputBaseProps
}: TextInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue, rules, shouldUnregister });

  if (mask) {
    return (
      <InputMask
        mask={mask}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
          field.onChange(target.value)
        }
        maskPlaceholder={null}
      >
        <div>
          <BaseInput
            errorMessage={error?.message}
            {...inputBaseProps}
            value={field.value}
            onChange={() => null}
          />
        </div>
      </InputMask>
    );
  }

  return (
    <BaseInput errorMessage={error?.message} {...inputBaseProps} {...field} />
  );
};
