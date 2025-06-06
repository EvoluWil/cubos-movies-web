import { Icon, IconName } from '@/components/atoms/icon/icon';
import { JSX, SelectHTMLAttributes } from 'react';

export type BaseSelectOption = {
  value: string;
  label: string;
};

export type BaseSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  icon?: IconName;
  iconElement?: JSX.Element;
  errorMessage?: string;
  placeholder?: string;
  options: BaseSelectOption[];
};

export const BaseSelect: React.FC<BaseSelectProps> = ({
  label,
  className,
  iconElement,
  icon,
  errorMessage,
  options,
  placeholder,
  value,
  ...selectBaseProps
}) => {
  return (
    <div className="flex flex-col gap-2 w-full relative">
      {label && (
        <label
          className={`font-roboto text-mauve-950 text-xs leading-base font-bold ${
            errorMessage ? 'text-error-500' : ''
          }`}
        >
          {label}
        </label>
      )}

      <select
        className={`font-roboto appearance-none text-base bg-mauve-50 placeholder:text-mauve-700 border border-mauve-400 w-full h-11 rounded px-3 focus:border-brand-700 focus:caret-brand-700 ${
          errorMessage ? 'border-error-500' : ''
        } ${value ? 'text-mauve-950' : 'text-mauve-700'} ${
          icon ? 'pr-12' : ''
        } ${className}`}
        {...selectBaseProps}
        value={value}
      >
        <option value="" disabled hidden>
          {placeholder || 'Selecione uma opção'}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <span className="text-error-500 text-2xs flex items-start gap-1">
          <Icon name="info" className="-mt-1 !text-base" /> {errorMessage}
        </span>
      )}

      <div
        className={`absolute text-mauve-900 end-4 bottom-2.5 flex items-center ps-4 pointer-events-none ${
          errorMessage && 'bottom-8 text-error-500'
        }`}
      >
        {!!iconElement ? (
          iconElement
        ) : (
          <Icon name="chevron-down" className={`!text-sm !text-mauve-700`} />
        )}
      </div>
    </div>
  );
};
