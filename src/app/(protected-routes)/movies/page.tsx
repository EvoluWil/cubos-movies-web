import { ListMovies } from '@/components/template/list-movies/list-movies';
import { movieService } from '@/services/movie.service';

export default async function MoviesPage() {
  const { movies, total } = await movieService.getAll();

  return (
    <div className="container p-6">
      <ListMovies movies={movies} total={total} />
    </div>
  );
}
