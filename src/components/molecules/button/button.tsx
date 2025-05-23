import { Icon, IconName } from '@/atoms/icon/icon';
import React, { PropsWithChildren } from 'react';

type ButtonProps = {
  icon?: IconName;
  className?: string;
  variant?: 'primary' | 'secondary';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  icon,
  children,
  className = '',
  variant = 'primary',
  ...rest
}) => {
  const variantClasses = {
    primary:
      'text-white bg-brand-700 hover:bg-brand-800 hover active:bg-brand-600 disabled:bg-mauve-700 disabled:text-mauve_alpha-800',
    secondary:
      'text-brand_alpha-950 bg-brand_alpha-50 hover:bg-brand_alpha-100 hover active:bg-brand_alpha-10 disabled:bg-mauve_alpha-100 disabled:text-mauve_alpha-800',
  };

  return (
    <button
      className={`flex items-center justify-center font-roboto h-11 px-5 text-md rounded-sm cursor-pointer transition-all transform ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {icon && (
        <Icon
          name={icon}
          className={`!w-6 !h-6 ${children ? 'ml-2' : ''} ${
            variant === 'primary' ? 'text-white' : 'text-brand_alpha-950'
          }`}
        />
      )}
      {children}
    </button>
  );
};
