import { Movie } from '@/types/movie.type';
import Image from 'next/image';
import { CircularProgress } from '../../atoms/circular-progress/circular-progress';

type BannerProps = {
  movie: Pick<Movie, 'title' | 'coverUrl' | 'genres' | 'rating'>;
  onClick: () => void;
};

export const Banner: React.FC<BannerProps> = ({ movie, onClick }) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="relative group max-w-[235px] max-h-[355px] w-full aspect-[2/3] shadow rounded overflow-hidden cursor-pointer mx-auto"
    >
      <Image
        src={movie.coverUrl}
        alt={movie.title}
        fill
        sizes="100%"
        className="object-cover rounded-lg"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 opacity-0 scale-95 transition duration-300 group-hover:opacity-100 group-hover:scale-100">
        <CircularProgress percentage={movie.rating} />
      </div>

      <div className="absolute bottom-0 w-full h-[47%] banner-shadow-gradient" />

      <div className="absolute bottom-4 px-4">
        <h3 className="text-[clamp(0.6rem,1.8vw,1rem)] font-semibold text-[#EEEEEE] uppercase">
          {movie.title}
        </h3>
        <p className="text-[clamp(0.5rem,1.8vw,0.8rem)] text-[#B4B4B4] mt-2 opacity-0 transition duration-300 group-hover:opacity-100">
          {movie.genres.map((genre) => genre.name).join(', ')}
        </p>
      </div>
    </div>
  );
};
