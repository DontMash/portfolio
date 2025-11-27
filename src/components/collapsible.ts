import type { AlpineComponent } from 'alpinejs';

export default (initialState: boolean = false) =>
  ({
    state: initialState,
    toggle() {
      if (this.state) {
        return this.close();
      }

      this.$refs.button?.focus();

      this.state = true;
    },
    close(focusElement?: HTMLElement) {
      if (!this.state) return;

      this.state = false;

      focusElement && focusElement.focus();
    },
  }) satisfies AlpineComponent<{
    state: boolean;
    toggle: () => void;
    close: () => void;
  }>;
