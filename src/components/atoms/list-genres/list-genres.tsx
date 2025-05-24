import { Genre } from '@/types/genre.type';

type ListGenresProps = {
  genres: Genre[];
};

export const ListGenres = ({ genres }: ListGenresProps) => {
  return (
    <div className="flex flex-col gap-2 bg-mauve-100/60 p-4 rounded uppercase">
      <h3 className="text-sm text-brand-950 font-bold ">Gêneros</h3>
      <div className="flex flex-wrap gap-2 items-center">
        {genres.map((genre) => (
          <p
            key={genre.id}
            className="bg-brand_alpha-100 text-xs text-mauve-950 font-semibold backdrop-blur-[2px] p-2 rounded-sm"
          >
            {genre.name}
          </p>
        ))}
      </div>
    </div>
  );
};
