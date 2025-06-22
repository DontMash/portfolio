import type { Alpine } from 'alpinejs';
import collapse from '@alpinejs/collapse';

export default (Alpine: Alpine) => {
  Alpine.plugin(collapse);

  Alpine.data('theme', () => ({
    theme: 'light',
    isLight() {
      return this.theme === 'light';
    },
    invert() {
      return this.isLight() ? 'dark' : 'light';
    },
    toggle() {
      this.theme = this.isLight() ? 'dark' : 'light';
    },
  }));

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
