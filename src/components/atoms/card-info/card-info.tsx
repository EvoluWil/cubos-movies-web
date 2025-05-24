type CardInfoProps = {
  title: string;
  value: string | number;
};

export const CardInfo: React.FC<CardInfoProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col gap-2 bg-mauve-100/75 backdrop-blur-[2px] p-4 rounded">
      <h3 className="text-xs text-mauve-900 font-bold uppercase">{title}</h3>
      <p className="text-sm text-mauve-950 font-normal ">{value}</p>
    </div>
  );
};
