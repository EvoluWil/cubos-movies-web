/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/molecules/button/button';
import { DebounceInput } from '@/components/molecules/debounce-input/debounce-input';
import { Pagination } from '@/components/molecules/pagination/pagination';
import {
  AddMovieFormDto,
  addMovieFormInitialValues,
  addMovieFormSchema,
} from '@/components/organisms/drawer-add-movie/drawer-add-movie.schema';
import { movieService, queryMovies } from '@/services/movie.service';
import { Movie } from '@/types/movie.type';
import { formatDateToSend } from '@/utils/date';
import { yupResolver } from '@hookform/resolvers/yup';
import { Filter, Query } from 'nestjs-prisma-querybuilder-interface';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Banner } from '../../molecules/banner/banner';
import { DrawerAddMovie } from '../../organisms/drawer-add-movie/drawer-add-movie';
import { ModalFilter } from '../../organisms/modal-filter/modal-filter';
import {
  filterFormInitialValues,
  filterFormSchema,
  FiltersFormDto,
} from '../../organisms/modal-filter/modal-filter.schema';

type ListMoviesProps = {
  movies: Movie[];
  total: number;
};

export const ListMovies = ({ movies, total }: ListMoviesProps) => {
  const [loading, setLoading] = useState(false);
  const [moviesList, setMoviesList] = useState<Movie[]>(movies);
  const [totalItems, setTotalItems] = useState<number>(total);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [addMovieDrawerOpen, setAddMovieDrawerOpen] = useState(false);

  const { push } = useRouter();

  const formFilter = useForm<FiltersFormDto>({
    defaultValues: filterFormInitialValues,
    resolver: yupResolver(filterFormSchema as any),
  });
  const formAdd = useForm<AddMovieFormDto>({
    defaultValues: addMovieFormInitialValues,
    resolver: yupResolver(addMovieFormSchema as any),
  });

  const currentPage = formFilter.watch('page');

  const handleAddMovie = async (data: AddMovieFormDto) => {
    setLoading(true);
    const result = await movieService.create({
      ...data,
      releaseAt: formatDateToSend(data.releaseAt),
    });
    if (result) {
      const moviesData = await movieService.getAll();

      if (moviesData) {
        setMoviesList(moviesData?.movies || []);
        setTotalItems(moviesData?.total || 0);
      }

      setAddMovieDrawerOpen(false);
      formAdd.reset(addMovieFormInitialValues);
    }

    setLoading(false);
  };

  const handleFilter = async (data: FiltersFormDto) => {
    const query: Query = {
      ...queryMovies,
      filter: [],
    };

    if (data.term) {
      const textFilterKeys = [
        'title',
        'promotionalText',
        'synopsis',
        'originalTitle',
      ];
      query.filter?.push({
        or: [
          ...textFilterKeys.map(
            (key) =>
              ({
                path: key,
                operator: 'contains',
                value: data.term,
                insensitive: true,
                filterGroup: 'or',
              } as Filter[number]),
          ),
        ],
      });
    }

    if (data.languageId) {
      query.filter?.push({
        path: 'languageId',
        operator: 'equals',
        value: data.languageId,
        filterGroup: 'and',
      });
    }

    if (data.startDate) {
      query.filter?.push({
        path: 'releaseAt',
        operator: 'gte',
        value: new Date(formatDateToSend(data.startDate)),
        filterGroup: 'and',
      });
    }

    if (data.endDate) {
      query.filter?.push({
        path: 'releaseAt',
        operator: 'lte',
        value: new Date(formatDateToSend(data.endDate)),
        filterGroup: 'and',
      });
    }

    if (data.startDuration) {
      query.filter?.push({
        path: 'duration',
        operator: 'gte',
        value: Number(data.startDuration),
        filterGroup: 'and',
      });
    }

    if (data.endDuration) {
      query.filter?.push({
        path: 'duration',
        operator: 'lte',
        value: Number(data.endDuration),
        filterGroup: 'and',
      });
    }

    if (data?.page > 1) {
      query.page = data.page;
    }

    console.log(query);
    setLoading(true);
    const { movies, total } = await movieService.getAll(query);
    if (movies) {
      setMoviesList(movies);
      setTotalItems(total);
      setFilterModalOpen(false);
    }

    setLoading(false);
  };

  const handleSelectMovie = (movie: Movie) => {
    push(`/movies/${movie.id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-center gap-2.5">
        <DebounceInput
          placeholder="Pesquise por filmes"
          onChangeValue={(value) => {
            formFilter.setValue('term', value);
            formFilter.setValue('page', 1);
            handleFilter(formFilter.getValues());
          }}
          icon="search"
          className="w-full max-w-[488px] ml-auto"
          loading={loading}
        />
        <Button variant="secondary" onClick={() => setFilterModalOpen(true)}>
          Filtros
        </Button>
        <Button onClick={() => setAddMovieDrawerOpen(true)}>
          Adicionar filme
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6 bg-mauve_alpha-100 rounded backdrop-blur-[2px]">
        {moviesList.map((movie) => (
          <Banner
            key={movie.id}
            movie={movie}
            onClick={() => handleSelectMovie(movie)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / 10)}
          onPageChange={(newPage) => {
            formFilter.setValue('page', newPage);
            handleFilter(formFilter.getValues());
          }}
        />
      </div>
      <FormProvider {...formFilter}>
        <form
          onSubmit={formFilter.handleSubmit(() => {
            formFilter.setValue('page', 1);
            handleFilter(formFilter.getValues());
          })}
        >
          <ModalFilter
            open={filterModalOpen}
            onClose={() => setFilterModalOpen(false)}
            loading={loading}
          />
        </form>
      </FormProvider>
      <FormProvider {...formAdd}>
        <form onSubmit={formAdd.handleSubmit(handleAddMovie)}>
          <DrawerAddMovie
            open={addMovieDrawerOpen}
            onClose={() => {
              setAddMovieDrawerOpen(false);
              formAdd.reset(addMovieFormInitialValues);
            }}
            loading={loading}
          />
        </form>
      </FormProvider>
    </div>
  );
};
