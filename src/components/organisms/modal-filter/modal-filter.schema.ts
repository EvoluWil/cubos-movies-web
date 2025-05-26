import { isValidDate } from '@/utils/date';
import * as yup from 'yup';

export type FiltersFormDto = {
  term: string;
  page: number;
  startDate: string;
  endDate: string;
  genre: string;
  startDuration: string;
  endDuration: string;
};

export const filterFormInitialValues: FiltersFormDto = {
  term: '',
  page: 1,
  startDate: '',
  endDate: '',
  genre: '',
  startDuration: '',
  endDuration: '',
};

export const filterFormSchema = yup.object().shape({
  term: yup.string().optional().nullable(),
  page: yup.number().optional().nullable(),
  startDate: yup
    .string()
    .test('startDate', 'Data inválida', function (value) {
      const { path, createError } = this;
      if (!value) {
        return true;
      }
      return (
        isValidDate(value) || createError({ path, message: 'Data inválida' })
      );
    })
    .optional()
    .nullable(),
  endDate: yup
    .string()
    .test('endDate', 'Data inválida', function (value) {
      const { path, createError } = this;
      if (!value) {
        return true;
      }
      return (
        isValidDate(value) || createError({ path, message: 'Data inválida' })
      );
    })
    .optional()
    .nullable(),
  genre: yup.string().optional().nullable(),
  startDuration: yup.string().optional().nullable(),
  endDuration: yup.string().optional().nullable(),
});
