import { AddMovieFormDto } from '@/components/organisms/drawer-add-movie/drawer-add-movie.schema';
import { api } from '@/config/api/api';
import { Movie } from '@/types/movie.type';
import { Query } from 'nestjs-prisma-querybuilder-interface';

type GetMoviesResponse = {
  movies: Movie[];
  total: number;
};

export const queryMovies: Query = {
  select: 'all',
  limit: 10,
  page: 1,
  sort: {
    field: 'releaseAt',
    criteria: 'desc',
  },
};

class MovieService {
  async getAll(query = queryMovies): Promise<GetMoviesResponse> {
    const { data } = await api.get<GetMoviesResponse>('/movies', {
      params: { query },
    });
    return data;
  }

  async getById(movieId: string): Promise<Movie> {
    const { data } = await api.get<Movie>(`/movies/${movieId}`);
    return data;
  }

  async create(addMovieFormDto: AddMovieFormDto) {
    const { data } = await api.post('/movies', addMovieFormDto);
    return data;
  }

  async update(movieId: string, addMovieFormDto: AddMovieFormDto) {
    const { data } = await api.put(`/movies/${movieId}`, addMovieFormDto);
    return data;
  }

  async delete(movieId: string) {
    const { data } = await api.delete(`/movies/${movieId}`);
    return data;
  }
}

export const movieService = new MovieService();
