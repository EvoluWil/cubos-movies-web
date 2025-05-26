export type GenreCardProps = {
  name: string;
  onClick?: () => void;
  icon?: React.ReactNode;
};

export const GenreCard: React.FC<GenreCardProps> = ({
  name,
  onClick,
  icon,
}) => {
  return (
    <p
      className={`bg-brand_alpha-100 text-xs text-mauve-950 font-semibold backdrop-blur-[2px] p-2 rounded-sm flex items-center gap-2 ${
        !!onClick
          ? 'cursor-pointer hover:bg-brand_alpha-200 transition-colors duration-200'
          : ''
      }`}
      role={!!onClick ? 'button' : undefined}
      onClick={onClick}
    >
      {name}
      {icon}
    </p>
  );
};
