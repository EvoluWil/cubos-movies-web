import { Icon, IconName } from '@/components/atoms/icon/icon';
import { JSX, TextareaHTMLAttributes } from 'react';

export type BaseTextareaValidators = {
  regex: RegExp;
  message: string;
};

export type BaseTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  icon?: IconName;
  iconElement?: JSX.Element;
  errorMessage?: string;
};

export const BaseTextarea: React.FC<BaseTextareaProps> = ({
  label,
  className,
  iconElement,
  icon,
  errorMessage,
  ...textareaBaseProps
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

      <textarea
        className={`font-roboto text-base text-mauve-950 bg-mauve-50 placeholder:text-mauve-700 border border-mauve-400 w-full rounded px-3 py-2 resize-none focus:border-brand-700 focus:caret-brand-700 ${
          errorMessage ? 'border-error-500' : ''
        } ${icon ? 'pr-12' : ''} ${className}`}
        placeholder={label}
        {...textareaBaseProps}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
        }}
      />

      {errorMessage && (
        <span className="text-error-500 text-2xs flex items-start gap-1">
          <Icon name="info" className="!text-base -mt-1" /> {errorMessage}
        </span>
      )}

      {(icon || iconElement) && (
        <div
          className={`absolute text-mauve-900 end-4 top-10 flex items-center ps-4 pointer-events-none ${
            errorMessage && 'text-error-500'
          }`}
        >
          {!!icon && <Icon name={icon} className={`w-6 h-6`} />}
          {!!iconElement && iconElement}
        </div>
      )}
    </div>
  );
};
