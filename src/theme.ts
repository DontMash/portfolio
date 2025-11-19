import type { Alpine, AlpineComponent, InterceptorObject } from 'alpinejs';

export const defaultTheme = 'light' as const;
export const themes = [defaultTheme, 'dark'] as const;
export type Theme = (typeof themes)[number];
export type ThemeState = Theme | 'auto';

type AlpineThemeStore = AlpineComponent<{
  state: InterceptorObject<ThemeState>;
  get: () => Theme;
  set: (value: Theme) => void;
  isDefault: () => boolean;
  invert: () => Theme;
  toggle: () => void;
}>;
export const create = (Alpine: Alpine) =>
  ({
    state: Alpine.$persist<ThemeState>('auto').as('theme'),
    init() {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        if (this.state !== 'auto') {
          return;
        }
        // overwrite for change detection - value doesnt matter
        this.state = 'light';
        this.state = 'auto';
      });
    },
    isDefault() {
      return this.get() === defaultTheme;
    },
    invert() {
      return this.isDefault() ? 'dark' : 'light';
    },
    get() {
      switch (this.state) {
        case 'light':
        case 'dark':
          return this.state;
        default:
          return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
      }
    },
    set(value: Theme) {
      this.state = value;
    },
    toggle() {
      this.state = this.isDefault() ? 'dark' : 'light';
    },
  }) satisfies AlpineThemeStore;
