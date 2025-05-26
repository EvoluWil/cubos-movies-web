/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/molecules/button/button';
import { DrawerAddMovie } from '@/components/organisms/drawer-add-movie/drawer-add-movie';
import {
  AddMovieFormDto,
  updateMovieFormSchema,
} from '@/components/organisms/drawer-add-movie/drawer-add-movie.schema';
import { movieService } from '@/services/movie.service';
import { Movie } from '@/types/movie.type';
import { formatDateToSend } from '@/utils/date';
import { extractYouTubeId } from '@/utils/youtube';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

type MovieActionsProps = {
  movie: Movie;
};

export const MovieActions: React.FC<MovieActionsProps> = ({ movie }) => {
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const addMovieFormInitialValues: AddMovieFormDto = {
    title: movie.title,
    originalTitle: movie.originalTitle,
    promotionalText: movie.promotionalText,
    synopsis: movie.synopsis,
    videoYouTubeId: extractYouTubeId(movie.videoUrl),
    duration: movie.duration,
    popularity: movie.popularity,
    votes: movie.votes,
    rating: movie.rating,
    budget: movie.budget,
    revenue: movie.revenue,
    releaseAt: new Date(movie.releaseAt).toLocaleDateString('pt-BR'),
    languageId: movie.languageId,
    genreIds: movie.genres.map((genre) => genre.id),
    coverBase64: '',
    backdropBase64: '',
  };

  const formAdd = useForm<AddMovieFormDto>({
    defaultValues: addMovieFormInitialValues,
    resolver: yupResolver(updateMovieFormSchema as any),
  });

  const { replace, refresh } = useRouter();
  const { movieId } = useParams<{ movieId: string }>();

  const handleDelete = async () => {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este filme?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const result = await movieService.delete(movieId);
        if (result) {
          toast.success('Filme deletado com sucesso!');
          replace('/movies');
        }
      },
    });
  };

  const handleUpdate = async (data: AddMovieFormDto) => {
    setLoading(true);
    const result = await movieService.update(movieId, {
      ...data,
      releaseAt: formatDateToSend(data.releaseAt),
    });
    if (result) {
      toast.success('Filme atualizado com sucesso!');
      setUpdateDrawerOpen(false);
      refresh();
    }
    setLoading(false);
  };

  return (
    <>
      <Button variant="secondary" onClick={handleDelete}>
        Deletar
      </Button>
      <Button
        className="sm:w-auto w-full ml-4"
        onClick={() => setUpdateDrawerOpen(true)}
      >
        Editar
      </Button>

      <FormProvider {...formAdd}>
        <form
          onSubmit={formAdd.handleSubmit(handleUpdate)}
          className="relative z-50"
        >
          <DrawerAddMovie
            open={updateDrawerOpen}
            onClose={() => {
              setUpdateDrawerOpen(false);
              formAdd.reset(addMovieFormInitialValues);
            }}
            loading={loading}
            coverImage={movie.coverUrl}
            backdropImage={movie.backdropUrl}
          />
        </form>
      </FormProvider>
    </>
  );
};
