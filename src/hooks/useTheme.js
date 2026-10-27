import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'da-theme';

/** index.html already set data-theme before React loaded, so we start from that. */
function readInitialTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Storage can be blocked (private mode). The toggle still works for this visit.
    }
  }, [theme]);

  return { theme, toggleTheme };
}
