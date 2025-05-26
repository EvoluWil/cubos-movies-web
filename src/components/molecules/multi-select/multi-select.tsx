import {
  BaseSelect,
  BaseSelectOption,
  BaseSelectProps,
} from '@/components/atoms/base-select/base-select';
import { GenreCard } from '@/components/atoms/card-genre/card-ganre';
import { Icon } from '@/components/atoms/icon/icon';
import { ChangeEvent } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

export type MultiSelectInputProps<T extends FieldValues> = Omit<
  BaseSelectProps,
  'options' | 'value' | 'onChange'
> &
  UseControllerProps<T> & {
    options: BaseSelectOption[];
  };

export const MultiSelectInput = <T extends FieldValues>({
  name,
  control,
  rules,
  shouldUnregister,
  options,
  ...selectBaseProps
}: MultiSelectInputProps<T>) => {
  const {
    field: { value = [] as string[], onChange, ...fieldRest },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    shouldUnregister,
  });

  const handleSelect = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = target.value;
    if (!selectedOption) {
      return;
    }

    if (value.some((v) => selectedOption === v)) {
      onChange(value.filter((v) => v !== selectedOption));
      return;
    }

    onChange([...value, selectedOption]);
  };

  const handleRemove = (option: string) => {
    onChange(value.filter((v) => v !== option));
  };

  return (
    <div className="space-y-2">
      <BaseSelect
        {...selectBaseProps}
        {...fieldRest}
        options={[
          { label: 'Selecione um ou mais itens', value: '' },
          ...options?.filter((o) => !value.includes(o.value)),
        ]}
        onChange={handleSelect}
        errorMessage={error?.message}
        placeholder="Selecione um ou mais itens"
      />

      <div className="flex flex-wrap gap-2">
        {value.map((item) => {
          const option = options.find((o) => o.value === item);
          if (!option) return null;

          return (
            <GenreCard
              name={option.label}
              key={option.value}
              onClick={() => handleRemove(item)}
              icon={<Icon name="close" className="w-3 h-3 !text-error-500" />}
            />
          );
        })}
      </div>
    </div>
  );
};
