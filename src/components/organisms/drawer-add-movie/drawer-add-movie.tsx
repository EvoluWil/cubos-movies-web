import { BaseSelectOption } from '@/components/atoms/base-select/base-select';
import { ImagePicker } from '@/components/atoms/image-picker/image-picker';
import { BaseDrawer } from '@/components/molecules/base-drawer/base-drawer';
import { CurrencyInput } from '@/components/molecules/currency-input/currency-input';
import { MultiSelectInput } from '@/components/molecules/multi-select/multi-select';
import { SelectInput } from '@/components/molecules/select-input/select-input';
import { TextAreaInput } from '@/components/molecules/text-area-input/text-area-input';
import { TextInput } from '@/components/molecules/text-input/text-input';
import { genreService } from '@/services/genre.service';
import { languageService } from '@/services/language.service';
import { formatSelectOption } from '@/utils/select-option';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AddMovieFormDto } from './drawer-add-movie.schema';

type DrawerAddMovieProps = {
  open: boolean;
  onClose: () => void;
  loading?: boolean;
  coverImage?: string;
  backdropImage?: string;
};

export const DrawerAddMovie: React.FC<DrawerAddMovieProps> = ({
  open,
  onClose,
  loading,
  coverImage,
  backdropImage,
}) => {
  const [genres, setGenres] = useState<BaseSelectOption[]>([]);
  const [languages, setLanguages] = useState<BaseSelectOption[]>([]);

  const { control } = useFormContext<AddMovieFormDto>();

  const getSelectOptions = async () => {
    const [genreResult, languageResult] = await Promise.all([
      genreService.getAll(),
      languageService.getAll(),
    ]);
    if (!genreResult || !languageResult) return;

    const formattedGenres = formatSelectOption(genreResult, 'id', 'name');
    const formattedLanguages = formatSelectOption(languageResult, 'id', 'name');
    setGenres(formattedGenres);
    setLanguages(formattedLanguages);
  };

  useEffect(() => {
    if (open) {
      getSelectOptions();
    }
  }, [open]);

  return (
    <BaseDrawer
      open={open}
      onClose={onClose}
      title="Filtrar"
      buttons={[
        {
          label: 'Cancelar',
          onClick: onClose,
          variant: 'secondary',
          type: 'button',
          disabled: loading,
        },
        {
          label: 'Adicionar Filme',
          onClick: () => null,
          variant: 'primary',
          type: 'submit',
          loading,
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        <TextInput
          label="Título"
          placeholder="Título do filme"
          name="title"
          control={control}
        />
        <TextInput
          label="Título original"
          placeholder="Título original do filme"
          name="originalTitle"
          control={control}
        />
        <TextInput
          label="Frase de destaque"
          placeholder="Frase de destaque do filme"
          name="promotionalText"
          control={control}
        />

        <TextAreaInput
          label="Sinopse"
          placeholder="Sinopse do filme"
          name="synopsis"
          control={control}
        />

        <TextInput
          label="Data de lançamento"
          name="releaseAt"
          placeholder='Ex: "01/01/2020"'
          control={control}
          mask="99/99/9999"
        />

        <TextInput
          label="ID do trailer no YouTube"
          placeholder='Ex: "dQw4w9WgXcQ"'
          name="videoYouTubeId"
          control={control}
        />

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <TextInput
            mask="999"
            label="Duração"
            placeholder='Ex: "120" (minutos)'
            name="duration"
            control={control}
          />

          <TextInput
            mask="9.9"
            label="Popularidade"
            placeholder='Ex: "7.5"'
            name="popularity"
            control={control}
          />
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <TextInput
            mask="99999999"
            label="Votos"
            placeholder='Ex: "1500"'
            name="votes"
            control={control}
          />

          <TextInput
            mask="99"
            label="Gostaram do filme"
            placeholder='Ex: "75" (em porcentagem)'
            name="rating"
            control={control}
          />
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <CurrencyInput
            label="Orçamento"
            placeholder='Ex: "1000000" (em dólares)'
            name="budget"
            control={control}
          />
          <CurrencyInput
            label="Receita"
            placeholder='Ex: "2000000" (em dólares)'
            name="revenue"
            control={control}
          />
        </div>

        <MultiSelectInput
          label="Gênero do filme"
          name="genreIds"
          placeholder="Selecione os gêneros"
          control={control}
          options={genres}
        />
        <SelectInput
          label="Idioma do filme"
          name="languageId"
          placeholder="Selecione um idioma"
          control={control}
          options={languages}
        />
        <ImagePicker
          control={control}
          name="coverBase64"
          label="Capa do filme"
          defaultValue={coverImage}
        />
        <ImagePicker
          control={control}
          name="backdropBase64"
          label="Backdrop do filme"
          orientation="horizontal"
          defaultValue={backdropImage}
        />
      </div>
    </BaseDrawer>
  );
};
