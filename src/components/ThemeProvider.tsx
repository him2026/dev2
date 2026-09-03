"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { THEMES } from '@/lib/themes';

type ThemeContextType = {
  theme: string;
  setTheme: (name: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'pink',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState('pink');

  useEffect(() => {
    const saved = localStorage.getItem('him_theme') || 'pink';
    setTheme(saved);
  }, []);

  const setTheme = (name: string) => {
    const vars = THEMES[name];
    if (!vars) return;

    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    localStorage.setItem('him_theme', name);
    setThemeState(name);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
