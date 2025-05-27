'use client';

import { THEME_STORAGE_KEY, ThemeEnum } from '@/constants/theme';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeEnum>(ThemeEnum.DARK);

  const toggleTheme = () => {
    const newTheme =
      theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    setCookie(THEME_STORAGE_KEY, newTheme, { path: '/', maxAge: 31536000 });
    setTheme(newTheme);
    document.documentElement.classList.remove(ThemeEnum.LIGHT, ThemeEnum.DARK);
    document.documentElement.classList.add(newTheme);
  };

  useEffect(() => {
    const initialTheme = getCookie(THEME_STORAGE_KEY) as ThemeEnum;
    if (initialTheme) {
      setTheme(initialTheme);
      return document.documentElement.classList.add(initialTheme);
    }
    setCookie(THEME_STORAGE_KEY, ThemeEnum.DARK, {
      path: '/',
      maxAge: 31536000,
    });
    document.documentElement.classList.add(ThemeEnum.DARK);
  }, []);

  return { theme, toggleTheme };
}
