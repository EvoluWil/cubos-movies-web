import { Genre } from './genre.type';
import { Language } from './language.type';
import { User } from './user.type';

export type Movie = {
  id: string;
  title: string;
  originalTitle: string;
  promotionalText: string;
  synopsis: string;
  coverUrl: string;
  videoUrl: string;
  backdropUrl: string;
  duration: number;
  popularity: number;
  votes: number;
  rating: number;
  budget: number;
  revenue: number;
  releaseAt: string;
  createdById: string;
  createdBy: User;
  languageId: string;
  language: Language;
  genres: Genre[];
};
