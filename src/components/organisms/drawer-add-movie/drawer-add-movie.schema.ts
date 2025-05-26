import { isValidDate } from '@/utils/date';
import * as yup from 'yup';

export type AddMovieFormDto = {
  title: string;
  originalTitle: string;
  promotionalText: string;
  synopsis: string;
  videoYouTubeId: string;
  duration: number;
  popularity: number;
  votes: number;
  rating: number;
  budget: number;
  revenue: number;
  releaseAt: string;
  languageId: string;
  genreIds: string[];
  coverBase64: string;
  backdropBase64: string;
};

export const addMovieFormInitialValues: AddMovieFormDto = {
  title: '',
  originalTitle: '',
  promotionalText: '',
  synopsis: '',
  videoYouTubeId: '',
  duration: 0,
  popularity: 0,
  votes: 0,
  rating: 0,
  budget: 0,
  revenue: 0,
  releaseAt: '',
  languageId: '',
  genreIds: [],
  coverBase64: '',
  backdropBase64: '',
};

export const addMovieFormSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  originalTitle: yup.string().required('Título original é obrigatório'),
  promotionalText: yup
    .string()
    .max(255, 'Texto promocional deve ter no máximo 255 caracteres')
    .required('Texto promocional é obrigatório'),
  synopsis: yup.string().required('Sinopse é obrigatória'),
  videoYouTubeId: yup
    .string()
    .required('ID do vídeo do YouTube é obrigatório')
    .matches(/^[a-zA-Z0-9_-]{11}$/, 'ID do vídeo inválido.'),
  duration: yup
    .number()
    .min(1, 'Duração deve ser maior ou igual a zero')
    .required('Duração é obrigatória'),
  popularity: yup
    .number()
    .min(1, 'Popularidade deve ser maior ou igual a zero')
    .required('Popularidade é obrigatória'),
  votes: yup
    .number()
    .min(1, 'Votos deve ser maior ou igual a zero')
    .required('Votos são obrigatórios'),
  rating: yup
    .number()
    .min(1, 'Qualidade deve ser maior ou igual a zero')
    .required('Qualidade é obrigatória'),
  budget: yup
    .number()
    .min(1, 'Orçamento deve ser maior ou igual a zero')
    .required('Orçamento é obrigatório'),
  revenue: yup
    .number()
    .min(1, 'Receita deve ser maior ou igual a zero')
    .required('Receita é obrigatória'),
  releaseAt: yup
    .string()
    .required('Data de lançamento é obrigatória')
    .test('releaseAt', 'Data inválida', function (value) {
      const { path, createError } = this;
      if (!value) {
        return true;
      }
      return (
        isValidDate(value) || createError({ path, message: 'Data inválida' })
      );
    }),
  languageId: yup.string().required('Idioma é obrigatório'),
  genreIds: yup
    .array()
    .of(yup.string())
    .min(1, 'Pelo menos um gênero é obrigatório'),
  coverBase64: yup.string().required('Capa é obrigatória'),

  backdropBase64: yup.string().required('Backdrop é obrigatória'),
});

export const updateMovieFormSchema = addMovieFormSchema.shape({
  coverBase64: yup.string().optional(),
  backdropBase64: yup.string().optional(),
});
