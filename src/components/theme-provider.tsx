'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type Skin = 'default' | 'minimalist' | 'streetwear' | 'dark-academia' | 'y2k' | 'clean-girl';

interface ThemeContextType {
  skin: Skin;
  setSkin: (skin: Skin) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, ...props }: { children: React.ReactNode } & any) {
  const [skin, setSkin] = useState<Skin>('default');

  useEffect(() => {
    const savedSkin = localStorage.getItem('drip-skin') as Skin;
    if (savedSkin) setSkin(savedSkin);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-skin', skin);
    localStorage.setItem('drip-skin', skin);
  }, [skin]);

  return (
    <ThemeContext.Provider value={{ skin, setSkin }}>
      <NextThemesProvider {...props}>
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  );
}

export const useDripTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useDripTheme must be used within a ThemeProvider');
  return context;
};
