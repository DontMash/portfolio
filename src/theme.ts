export const defaultTheme = 'light' as const;
export const themes = [defaultTheme, 'dark'] as const;
export type Theme = (typeof themes)[number];
export type ThemeState = Theme | 'auto';
