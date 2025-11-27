import type { AlpineComponent } from 'alpinejs';

export default () =>
  ({
    get expanded() {
      return this.active === this.$id('accordion-item-button');
    },
    set expanded(value) {
      this.active = value ? this.$id('accordion-item-button') : null;
    },
  }) satisfies AlpineComponent<{
    active?: string | null;
    expanded: boolean;
  }>;
