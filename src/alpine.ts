import type { Alpine, AlpineComponent, InterceptorObject } from 'alpinejs';
import collapse from '@alpinejs/collapse';
import persist from '@alpinejs/persist';

export default (Alpine: Alpine) => {
  Alpine.plugin(collapse);
  Alpine.plugin(persist);

  const defaultTheme = 'light' as const;
  const themes = [defaultTheme, 'dark'] as const;
  type Theme = (typeof themes)[number];
  type ThemeState = Theme | 'auto';
  type AlpineThemeStore = AlpineComponent<{
    state: InterceptorObject<ThemeState>;
    get: () => Theme;
    set: (value: Theme) => void;
    isDefault: () => boolean;
    invert: () => Theme;
    toggle: () => void;
  }>;
  Alpine.store('theme', {
    state: Alpine.$persist<ThemeState>('auto'),
    init() {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (event) => {
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
  } satisfies AlpineThemeStore);

  Alpine.data('collapsible', () => ({
    state: false,
    toggle() {
      this.state = !this.state;
    },
    open() {
      this.state = true;
    },
    close(focusElement?: HTMLElement) {
      this.state = false;

      if (focusElement) {
        focusElement.focus();
      }
    },
  }));
};
