import { Icon, IconName } from '@/atoms/icon/icon';
import React, { PropsWithChildren } from 'react';

type ButtonProps = {
  icon?: IconName;
  className?: string;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  icon,
  children,
  className = '',
  variant = 'primary',
  disabled = false,
  loading = false,
  ...rest
}) => {
  const variantClasses = {
    primary:
      'text-white bg-brand-700 hover:bg-brand-800 hover active:bg-brand-600 disabled:bg-mauve-700 disabled:text-mauve_alpha-800',
    secondary:
      'text-brand_alpha-950 bg-brand_alpha-50 hover:bg-brand_alpha-100 hover active:bg-brand_alpha-10 disabled:bg-mauve_alpha-100 disabled:text-mauve_alpha-800',
  };

  const getIconColor = () => {
    if (disabled) {
      return 'text-mauve_alpha-800';
    }
    return variant === 'primary' ? 'text-white' : 'text-brand_alpha-950';
  };

  return (
    <button
      className={`flex items-center whitespace-nowrap justify-center font-roboto h-11 px-5 text-base rounded-sm cursor-pointer disabled:cursor-not-allowed transition-all transform ${variantClasses[variant]} ${className}`}
      {...rest}
      disabled={disabled || loading}
    >
      {loading && (
        <Icon
          name="spinner"
          className={`!w-6 !h-6 animate-spin ${
            children ? 'ml-2' : ''
          } ${getIconColor()}`}
        />
      )}

      {!loading && (
        <>
          {icon && (
            <Icon
              name={icon}
              className={`!w-6 !h-6 ${
                children ? 'ml-2' : ''
              } ${getIconColor()}`}
            />
          )}
          {children}
        </>
      )}
    </button>
  );
};
