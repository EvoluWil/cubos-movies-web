import { JSX } from 'react';

type TitleProps = {
  title: string | JSX.Element;
  subtitle: string | JSX.Element;
};

export const Title = ({ title, subtitle, ...props }: TitleProps) => {
  return (
    <div>
      <h1 className="text-xl font-bold text-mauve-950" {...props}>
        {title}
      </h1>
      {subtitle && <span className="text-mauve-700">{subtitle}</span>}
    </div>
  );
};
