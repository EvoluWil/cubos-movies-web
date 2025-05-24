import { Icon, IconName } from '@/components/atoms/icon/icon';
import { InputHTMLAttributes, JSX } from 'react';

export type BaseInputValidators = {
  regex: RegExp;
  message: string;
};

export type BaseInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: IconName;
  iconElement?: JSX.Element;
  errorMessage?: string;
  validators?: BaseInputValidators[];
};

export const BaseInput: React.FC<BaseInputProps> = ({
  label,
  className,
  iconElement,
  icon,
  errorMessage,
  validators,
  ...inputBaseProps
}) => {
  const getValidatorColor = (isValid: boolean) => {
    if (isValid) {
      return 'text-success-500';
    }

    if (!errorMessage) {
      return 'text-mauve-800';
    }

    return 'text-error-500';
  };

  return (
    <div className="flex flex-col gap-2 w-full relative">
      <label
        className={`font-roboto text-mauve-950 text-xs leading-base font-bold ${
          errorMessage ? 'text-error-500' : ''
        }`}
      >
        {label}
      </label>

      <input
        type="text"
        className={`font-roboto text-base text-mauve-950 bg-mauve-50 placeholder:text-mauve-700 border border-mauve-400 w-full h-11 rounded px-3 focus:border-brand-700 focus:caret-brand-700 ${
          errorMessage ? 'border-error-500' : ''
        } ${icon ? 'pr-12' : ''} ${className}`}
        placeholder={label}
        {...inputBaseProps}
      />
      {errorMessage && !validators && (
        <span className="text-error-500 text-2xs flex items-center gap-1">
          <Icon name="info" className="w-3 h-3 -mt-[1.5px]" /> {errorMessage}
        </span>
      )}

      {validators && (
        <span
          className={`text-2xs flex flex-col gap-1 mt-1 ${
            !errorMessage ? '!text-mauve-500' : ''
          }`}
        >
          {validators?.map((validator, index) => {
            const isValid = validator.regex.test(`${inputBaseProps.value}`);
            return (
              <span
                key={index}
                className={`flex items-start gap-1 ${getValidatorColor(
                  isValid,
                )}`}
              >
                <Icon name="info" className="w-3 h-3 mt-[1.5px]" />
                <span>{validator.message}</span>
              </span>
            );
          })}
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
