import { Divider } from '@/components/atoms/divider/divider';
import { Icon } from '@/components/atoms/icon/icon';
import { ReactNode, useEffect } from 'react';
import { Button } from '../button/button';

type DrawerButton = {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  disabled?: boolean;
};

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  buttons?: DrawerButton[];
  width?: string;
}

export const BaseDrawer = ({
  open,
  onClose,
  children,
  title,
  buttons,
  width = 'w-full max-w-md',
}: DrawerProps) => {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-end bg-mauve-900/25 backdrop-blur-[2px] z-30">
      <div
        className={`relative z-50 h-full bg-mauve-100 ${width} shadow-lg animate-slide-in-right p-4 overflow-auto`}
        style={{ scrollbarWidth: 'thin' }}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-roboto text-2xl text-mauve-900">{title}</h2>
          <button onClick={onClose}>
            <Icon name="close" className="h-6 w-6 text-mauve-900" />
          </button>
        </div>

        <Divider className="border-mauve-900 mb-4 mt-2" />

        {children}

        <Divider className="border-mauve-900 my-4" />

        <div className="flex gap-2 items-center justify-end md:flex-row flex-col-reverse">
          {buttons?.map((button, index) => (
            <Button
              key={index}
              variant={button.variant}
              onClick={button.onClick}
              type={button.type}
              className="md:w-auto w-full"
              loading={button?.loading || false}
              disabled={button?.disabled || false}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="fixed inset-0" onClick={onClose} />
    </div>
  );
};
