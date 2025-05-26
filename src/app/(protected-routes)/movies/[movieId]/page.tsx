/* eslint-disable @next/next/no-img-element */
import { CardInfo } from '@/components/atoms/card-info/card-info';
import { CardSynopsys } from '@/components/atoms/card-sinopses/card-sinopses';
import { CircularProgress } from '@/components/atoms/circular-progress/circular-progress';
import { ListGenres } from '@/components/atoms/list-genres/list-genres';
import { Title } from '@/components/atoms/title/title';
import { Youtube } from '@/components/atoms/youtube/youtube';
import { movieService } from '@/services/movie.service';
import { formatCurrency, formatNumber } from '@/utils/number';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { MovieActions } from './movie.actions';

type MovieDetailPageProps = {
  params: Promise<{ movieId: string }>;
};

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { movieId } = await params;
  const movie = await movieService.getById(movieId);

  if (!movie) {
    return redirect('/movies');
  }
  return (
    <div className="relative container py-8">
      <div className="relative p-4 sm:p-8">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="object-cover w-full absolute inset-0 md:block hidden"
        />

        <div className="movie-detail-grid relative">
          <div
            className="flex gap-4 items-center justify-between sm:flex-row flex-col-reverse w-full text-center sm:text-left"
            style={{ gridArea: 'title' }}
          >
            <Title
              title={movie.title}
              subtitle={`Titulo original: ${movie.originalTitle}`}
              size="lg"
              hasBackButton
            />

            <div className="flex sm:w-auto w-full">
              <MovieActions movie={movie} />
            </div>
          </div>

          <div className="w-full" style={{ gridArea: 'poster' }}>
            <Image
              src={movie.coverUrl}
              alt={movie.title}
              width={374}
              height={542}
              className="object-contain w-full z-10 relative"
            />
          </div>

          <div
            className="flex flex-col md:flex-row-reverse items-center justify-between"
            style={{ gridArea: 'popularity' }}
          >
            <div className="flex flex-row gap-4 items-center justify-center xs:justify-between md:justify-end w-full flex-wrap-reverse xs:flex-nowrap">
              <CardInfo
                title="Popularidade"
                value={formatNumber(movie.popularity)}
              />
              <CardInfo title="Votos" value={formatNumber(movie.votes)} />
              <CircularProgress percentage={movie.rating} size="sm" />
            </div>
            <h3 className="text-mauve-950 italic">{movie.promotionalText}</h3>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start justify-between w-full"
            style={{ gridArea: 'details' }}
          >
            <div className="w-full">
              <CardSynopsys sinopse={movie.synopsis} />
            </div>

            <div className="flex flex-col gap-4 w-full">
              <div className="grid grid-cols-2 gap-4">
                <CardInfo
                  title="Lançamento"
                  value={new Date(movie.releaseAt).toLocaleDateString('pt-BR')}
                />
                <CardInfo
                  title="Duração"
                  value={formatNumber(movie.duration)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <CardInfo
                  title="Situação"
                  value={
                    new Date(movie.releaseAt) < new Date()
                      ? 'Lançado'
                      : 'Em breve'
                  }
                />
                <CardInfo title="Idioma" value={movie.language?.name} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <CardInfo
                  title="Orçamento"
                  value={formatCurrency(movie.budget)}
                />
                <CardInfo
                  title="Receita"
                  value={formatCurrency(movie.revenue)}
                />
                <CardInfo
                  title="Lucro"
                  value={formatCurrency(movie.revenue - movie.budget)}
                />
              </div>
            </div>
            <div className="w-full">
              <ListGenres genres={movie.genres} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-mauve-950 text-xl font-bold mb-4">Trailer</h3>

        <Youtube url={movie.videoUrl} />
      </div>
    </div>
  );
}
