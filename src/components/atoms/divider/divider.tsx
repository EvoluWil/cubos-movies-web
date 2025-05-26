type DividerProps = {
  className?: string;
};

export const Divider: React.FC<DividerProps> = ({ className }) => {
  return <hr className={`border-t border-secondary w-full ${className}`} />;
};
