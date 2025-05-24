'use client';

import { THEME_STORAGE_KEY, ThemeEnum } from '@/constants/theme';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeEnum>(() => {
    if (hasCookie(THEME_STORAGE_KEY)) {
      return getCookie(THEME_STORAGE_KEY) as ThemeEnum;
    }
    setCookie(THEME_STORAGE_KEY, ThemeEnum.DARK, {
      path: '/',
      maxAge: 31536000,
    });
    return ThemeEnum.DARK;
  });

  const toggleTheme = () => {
    const newTheme =
      theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    setCookie(THEME_STORAGE_KEY, newTheme, { path: '/', maxAge: 31536000 });
    setTheme(newTheme);
    document.documentElement.classList.remove(ThemeEnum.LIGHT, ThemeEnum.DARK);
    document.documentElement.classList.add(newTheme);
  };

  return { theme, toggleTheme };
}
