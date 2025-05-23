import { Icon, IconName } from '@/components/atoms/icon/icon';
import { InputHTMLAttributes, JSX } from 'react';

export type BaseInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: IconName;
  iconElement?: JSX.Element;
  errorMessage?: string;
};

export const BaseInput: React.FC<BaseInputProps> = ({
  label,
  className,
  iconElement,
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
        {...inputBaseProps}
      />
      {errorMessage && (
        <span className="text-error-500 text-2xs flex items-center gap-1">
          <Icon name="info" className="w-3 h-3 -mt-[1.5px]" /> {errorMessage}
        </span>
      )}

      {(icon || iconElement) && (
        <div
          className={`absolute text-mauve-900 end-4 bottom-2.5 flex items-center ps-4 pointer-events-none ${
            errorMessage && 'bottom-8 text-error-500'
          }`}
        >
          {!!icon && <Icon name={icon} className={`w-6 h-6 `} />}
          {!!iconElement && iconElement}
        </div>
      )}
    </div>
  );
};
