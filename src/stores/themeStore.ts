import { create } from 'zustand';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  syncTheme: () => void;
}

const getSystemTheme = (): Theme => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'system',
  setTheme: (theme: Theme) => {
    set({ theme });
    let appliedTheme = theme;
    if (theme === 'system') {
      appliedTheme = getSystemTheme();
    }
    document.documentElement.setAttribute('data-theme', appliedTheme);
    localStorage.setItem('theme', theme);
  },
  syncTheme: () => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      get().setTheme(savedTheme);
    } else {
      get().setTheme('system');
    }
  },
}));
