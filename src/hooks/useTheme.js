import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'bryl-theme';

/**
 * Three-way theme hook: 'light' | 'dark' | 'system'
 * Persists choice in localStorage, defaults to 'system'.
 */
export function useTheme() {
  const [preference, setPreference] = useState(() => {
    if (typeof window === 'undefined') return 'system';
    return localStorage.getItem(STORAGE_KEY) || 'system';
  });

  const applyTheme = useCallback((pref) => {
    const root = document.documentElement;
    let isDark;

    if (pref === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      isDark = pref === 'dark';
    }

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    applyTheme(preference);
    localStorage.setItem(STORAGE_KEY, preference);
  }, [preference, applyTheme]);

  // Listen for OS-level changes when in "system" mode
  useEffect(() => {
    if (preference !== 'system') return;

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [preference, applyTheme]);

  const cycle = useCallback(() => {
    setPreference((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  }, []);

  return { preference, setPreference, cycle };
}
