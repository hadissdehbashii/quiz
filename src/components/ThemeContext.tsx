import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContextInstance';
import type { Theme } from './ThemeContextInstance';


const getSystemTheme = (): Theme => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>('system');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            setThemeState(savedTheme);
        }
    }, []);

    useEffect(() => {
        let appliedTheme = theme;
        if (theme === 'system') {
            appliedTheme = getSystemTheme();
        }
        document.documentElement.setAttribute('data-theme', appliedTheme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
