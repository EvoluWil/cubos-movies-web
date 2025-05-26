type CardSynopsysProps = {
  sinopse: string | number;
};

export const CardSynopsys: React.FC<CardSynopsysProps> = ({ sinopse }) => {
  return (
    <div
      className="flex flex-col gap-2 bg-mauve-100/75 backdrop-blur-[2px] p-4 rounded max-h-[400px] overflow-y-auto"
      style={{ scrollbarWidth: 'none' }}
    >
      <h3 className="text text-mauve-900 font-bold uppercase">Sinopse</h3>
      <p className="text text-mauve-950 font-normal">{sinopse}</p>
    </div>
  );
};
