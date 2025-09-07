import type { Alpine, AlpineComponent, InterceptorObject } from 'alpinejs';
import collapse from '@alpinejs/collapse';
import persist from '@alpinejs/persist';
import { solveChallenge } from 'altcha-lib';
import type { Challenge, Payload } from 'altcha-lib/types';

import { defaultTheme, type Theme, type ThemeState } from '@/theme';

export default (Alpine: Alpine) => {
  Alpine.plugin(collapse);
  Alpine.plugin(persist);

  type AlpineThemeStore = AlpineComponent<{
    state: InterceptorObject<ThemeState>;
    get: () => Theme;
    set: (value: Theme) => void;
    isDefault: () => boolean;
    invert: () => Theme;
    toggle: () => void;
  }>;
  Alpine.store('theme', {
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

  Alpine.data<
    | { state: 'none' | 'loading'; result: undefined; error: undefined }
    | { state: 'completed'; result: string; error: undefined }
    | ({ state: 'failed'; result: undefined; error: string } & {
        verify: () => Promise<void>;
      }),
    []
  >('captcha', () => ({
    state: 'none',
    result: undefined,
    error: undefined,
    async verify() {
      try {
        console.info('Challenge started.');

        this.state = 'loading';
        this.result = undefined;
        this.error = undefined;

        const response = await fetch('/api/verify');
        if (response.status != 200) {
          throw new Error('Failed to fetch challenge.');
        }

        const data = (await response.json()) as Challenge;
        const solve = solveChallenge(data.challenge, data.salt);
        const solution = await solve.promise;
        if (!solution) {
          throw new Error('Failed to solve challenge.');
        }

        const payload: Payload = {
          algorithm: data.algorithm,
          challenge: data.challenge,
          number: solution.number,
          salt: data.salt,
          signature: data.signature,
        };
        const json = JSON.stringify(payload);
        this.state = 'completed';
        this.result = btoa(json);

        console.info('Challenge completed.');
      } catch (err) {
        console.error(err);

        if (err instanceof Error) {
          this.state = 'failed';
          this.error = err.message;
        }
      }
    },
  }));
};
