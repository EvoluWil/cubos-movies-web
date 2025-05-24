'use client';

import { IconName } from '@/components/atoms/icon/icon';
import { ThemeEnum } from '@/constants/theme';
import { useTheme } from '@/hooks/theme';
import { useEffect, useState } from 'react';
import { Button } from '../button/button';

type ThemeButtonVariantType = 'primary' | 'secondary';

const TOGGLE_THEME_ICON: Record<ThemeEnum, IconName> = {
  light: 'moon',
  dark: 'sun',
};

const TOGGLE_THEME_BUTTON_VARIANT: Record<ThemeEnum, ThemeButtonVariantType> = {
  light: 'primary',
  dark: 'secondary',
};

export const ToggleTheme = () => {
  const [stated, setStated] = useState(false);
  const { toggleTheme, theme } = useTheme();

  useEffect(() => {
    setStated(true);
  }, []);

  if (!stated) {
    return null;
  }

  return (
    <Button
      onClick={toggleTheme}
      icon={TOGGLE_THEME_ICON[theme]}
      variant={TOGGLE_THEME_BUTTON_VARIANT[theme]}
    />
  );
};
