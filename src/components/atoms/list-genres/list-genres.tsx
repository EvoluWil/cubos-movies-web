import { Genre } from '@/types/genre.type';
import { GenreCard } from '../card-genre/card-ganre';

type ListGenresProps = {
  genres: Genre[];
};

export const ListGenres = ({ genres }: ListGenresProps) => {
  return (
    <div className="flex flex-col gap-2 bg-mauve-100/60 p-4 rounded uppercase">
      <h3 className="text-sm text-brand-950 font-bold ">Gêneros</h3>
      <div className="flex flex-wrap gap-2 items-center">
        {genres.map((genre) => (
          <GenreCard name={genre.name} key={genre.id} />
        ))}
      </div>
    </div>
  );
};
