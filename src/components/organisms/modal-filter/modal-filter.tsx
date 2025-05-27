import { BaseSelectOption } from '@/components/atoms/base-select/base-select';
import { BaseModal } from '@/components/molecules/base-modal/base-modal';
import { SelectInput } from '@/components/molecules/select-input/select-input';
import { TextInput } from '@/components/molecules/text-input/text-input';
import { languageService } from '@/services/language.service';
import { formatSelectOption } from '@/utils/select-option';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiltersFormDto } from './modal-filter.schema';

type ModalFilterProps = {
  open: boolean;
  onClose: () => void;
  loading?: boolean;
};

export const ModalFilter: React.FC<ModalFilterProps> = ({
  open,
  onClose,
  loading,
}) => {
  const [languageOptions, setLanguageOptions] = useState<BaseSelectOption[]>(
    [],
  );

  const { control } = useFormContext<FiltersFormDto>();

  const getSelectOptions = async () => {
    const result = await languageService.getAll();
    if (!result) return [];

    const formattedLanguages = formatSelectOption(result, 'id', 'name');
    setLanguageOptions([
      { value: '', label: 'Selecione um idioma' },
      ...formattedLanguages,
    ]);
  };

  useEffect(() => {
    if (open) {
      getSelectOptions();
    }
  }, [open]);

  return (
    <BaseModal
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
          label: 'Aplicar filtros',
          onClick: () => null,
          variant: 'primary',
          type: 'submit',
          loading: loading,
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <TextInput
            mask="99/99/9999"
            label="Lançado a partir de"
            placeholder='Ex: "01/01/2020"'
            name="startDate"
            control={control}
          />
          <TextInput
            mask="99/99/9999"
            label="Lançado até"
            placeholder='Ex: "20/12/2020"'
            name="endDate"
            control={control}
          />
        </div>
        <SelectInput
          label="Idioma"
          name="languageId"
          placeholder="Selecione um idioma"
          control={control}
          options={languageOptions}
        />
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <TextInput
            label="Duração a partir de"
            name="startDuration"
            placeholder='Ex: "120" (minutos)'
            control={control}
            mask="999"
          />
          <TextInput
            label="Duração até"
            name="endDuration"
            placeholder='Ex: "180" (minutos)'
            control={control}
            mask="999"
          />
        </div>
      </div>
    </BaseModal>
  );
};
