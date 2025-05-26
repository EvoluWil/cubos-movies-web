'use client';

import { Button } from '@/components/molecules/button/button';
import { useRouter } from 'next/navigation';
import { JSX } from 'react';

type TitleProps = {
  title: string | JSX.Element;
  subtitle: string | JSX.Element;
  size?: 'md' | 'lg';
  hasBackButton?: boolean;
};

export const Title = ({
  title,
  subtitle,
  size = 'md',
  hasBackButton = false,
  ...props
}: TitleProps) => {
  const { back } = useRouter();

  return (
    <div className="flex items-top gap-2">
      {hasBackButton && <Button icon="chevron-left" onClick={() => back()} />}
      <div>
        <h1
          className={`font-semibold text-mauve-950 ${
            size === 'lg' ? 'text-[2rem]' : 'text-xl'
          }`}
          {...props}
        >
          {title}
        </h1>
        {subtitle && <span className="text-mauve-950">{subtitle}</span>}
      </div>
    </div>
  );
};
