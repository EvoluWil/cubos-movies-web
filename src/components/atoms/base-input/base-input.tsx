import { Icon, IconName } from '@/components/atoms/icon/icon';
import { InputHTMLAttributes } from 'react';

export type BaseInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  loading?: boolean;
  icon?: IconName;
  iconClassName?: string;
  errorMessage?: string;
};

export const BaseInput: React.FC<BaseInputProps> = ({
  label,
  loading = false,
  className,
  iconClassName,
  icon,
  errorMessage,
  ...inputBaseProps
}) => {
  return (
    <div className="flex flex-col gap-2 w-full relative">
      <label
        className={`font-roboto text-mauve-950 text-xs ${
          errorMessage ? 'text-error-500' : ''
        }`}
      >
        {label}
      </label>

      <input
        type="text"
        className={`font-roboto text-md text-mauve-950 bg-mauve-50 placeholder:text-mauve-700 border border-mauve-400 w-full h-11 rounded px-3 focus:border-brand-700 focus:caret-brand-700 ${
          errorMessage ? 'border-error-500' : ''
        } ${icon ? 'pr-12' : ''} ${className}`}
        placeholder={label}
        disabled={!!loading}
        {...inputBaseProps}
      />
      {errorMessage && (
        <span className="text-error-500 text-xs flex items-center gap-1">
          <Icon name="info" className="w-4 h-4 -mt-0.5" /> {errorMessage}
        </span>
      )}

      {icon && (
        <div
          className={`absolute end-4 bottom-2.5 flex items-center ps-4 pointer-events-none`}
        >
          <Icon
            name={icon}
            className={`w-6 h-6 text-mauve-900 ${iconClassName}`}
          />
        </div>
      )}
    </div>
  );
};
