import { api } from '@/config/api/api';
import { Genre } from '@/types/genre.type';

class GenreService {
  async getAll(): Promise<Genre[]> {
    const { data } = await api.get<Genre[]>('/genres');
    return data;
  }
}

export const genreService = new GenreService();
