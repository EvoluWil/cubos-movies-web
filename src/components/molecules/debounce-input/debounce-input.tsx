/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import {
  BaseInput,
  BaseInputProps,
} from '@/components/atoms/base-input/base-input';
import { Icon } from '@/components/atoms/icon/icon';
import { useDebounce } from '@/hooks/debounce';
import { useEffect, useState } from 'react';

type DebounceInputProps = BaseInputProps & {
  debounceTime?: number;
  onChangeValue?: (value: string) => void;
  loading?: boolean;
};

export const DebounceInput: React.FC<DebounceInputProps> = ({
  loading = false,
  debounceTime = 500,
  onChangeValue,
  icon,
  ...inputBaseProps
}) => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce(value, debounceTime);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    return setValue(target.value);
  };

  useEffect(() => {
    if (onChangeValue) {
      onChangeValue(debouncedValue);
    }
  }, [debouncedValue]);

  const isLoading = loading || (!!value && value !== debouncedValue);
  return (
    <BaseInput
      value={value}
      onChange={handleChange}
      {...inputBaseProps}
      iconElement={
        isLoading ? (
          <Icon
            name="spinner"
            className={`w-6 h-6 text-mauve-900 animate-spin`}
          />
        ) : (
          <Icon name={icon || 'spinner'} className={`w-6 h-6 text-mauve-900`} />
        )
      }
    />
  );
};
