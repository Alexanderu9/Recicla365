import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext } from './context/ThemeContext';
import type { Theme } from './context/ThemeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const temaInicial = (localStorage.getItem('recicla365-theme') as Theme) || 'light';
  const [theme, setTheme] = useState<Theme>(temaInicial);

  React.useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('recicla365-theme', next);
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}