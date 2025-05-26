/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useMemo } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { Icon } from '../icon/icon';

interface BaseProps {
  defaultValue?: string;
  label: string;
  placeholder?: string;
  accept?: string;
  orientation?: 'horizontal' | 'vertical';
}

export type ImagePickerProps<T extends FieldValues> = BaseProps &
  UseControllerProps<T>;

export const ImagePicker = <T extends FieldValues>({
  defaultValue,
  label,
  placeholder = 'Adicionar imagem',
  accept = 'image/*',
  name,
  control,
  rules,
  shouldUnregister = false,
  orientation = 'vertical',
}: ImagePickerProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, shouldUnregister });

  const preview = useMemo(() => {
    if (field.value?.startsWith?.('data:image')) return field.value; // base64
    if (defaultValue) return defaultValue;
    return null;
  }, [field.value, defaultValue]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        field.onChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <label className="cursor-pointer flex flex-col items-center gap-2">
        {label && (
          <span
            className={`font-roboto text-mauve-950 text-xs leading-base font-bold ${
              error?.message ? 'text-error-500' : ''
            }`}
          >
            {label}
          </span>
        )}

        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <div
          className={`flex flex-col items-center justify-center object-cover border-2 border-mauve-700 border-dashed hover:opacity-80 transition cursor-pointer ${
            orientation === 'horizontal'
              ? 'aspect-[2.1/1] w-60'
              : 'aspect-[2.5/3] w-40'
          } overflow-hidden`}
        >
          {!preview && (
            <>
              <Icon name="camera" className="w-6 h-6 text-mauve-700" />
              <span className="text-mauve-700 text-2xs font-medium text-center">
                {placeholder}
              </span>
            </>
          )}

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </label>

      {error?.message && (
        <span className="text-error-500 text-2xs flex items-center gap-1 mt-1">
          <Icon name="info" className="w-3 h-3 -mt-[1.5px]" /> {error.message}
        </span>
      )}
    </div>
  );
};
