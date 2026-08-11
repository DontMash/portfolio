import { atom } from 'nanostores';

export const defaultTheme = 'light' as const;
export const themes = [defaultTheme, 'dark'] as const;
export type Theme = (typeof themes)[number];
export type ThemeState = Theme | 'auto';

const storageKey = 'theme';

export const themePreference = atom<ThemeState>('auto');

export function getEffectiveTheme(
  state: ThemeState = themePreference.get(),
): Theme {
  if (state === 'light' || state === 'dark') {
    return state;
  }

  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function invertTheme(state: ThemeState = themePreference.get()): Theme {
  return getEffectiveTheme(state) === defaultTheme ? 'dark' : 'light';
}

function readStoredTheme(): ThemeState {
  if (typeof window === 'undefined') {
    return 'auto';
  }

  const value = window.localStorage.getItem(storageKey);
  if (!value) {
    return 'auto';
  }

  try {
    const parsed = JSON.parse(value);
    return parsed === 'light' || parsed === 'dark' || parsed === 'auto'
      ? parsed
      : 'auto';
  } catch {
    return 'auto';
  }
}

function applyTheme(state: ThemeState) {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.dataset.theme = getEffectiveTheme(state);
}

let initialized = false;

export function initializeTheme() {
  if (typeof window === 'undefined' || initialized) {
    return;
  }

  initialized = true;
  themePreference.set(readStoredTheme());
  themePreference.subscribe((state) => {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
    applyTheme(state);
  });

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    if (themePreference.get() === 'auto') {
      applyTheme('auto');
    }
  });
}

export function setTheme(state: ThemeState) {
  themePreference.set(state);
  applyTheme(state);
}

export function toggleTheme() {
  setTheme(getEffectiveTheme() === 'light' ? 'dark' : 'light');
}
