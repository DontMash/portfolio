import type { Alpine, AlpineComponent } from 'alpinejs';
import collapse from '@alpinejs/collapse';
import intersect from '@alpinejs/intersect';
import persist from '@alpinejs/persist';

import { create as createTheme } from '@/theme';
import { accordion } from '@/components/content/accordion';
import collapsible from '@/components/collapsible';
import captcha from '@/components/captcha/captcha';

export default (Alpine: Alpine) => {
  Alpine.plugin(collapse);
  Alpine.plugin(intersect);
  Alpine.plugin(persist);

  Alpine.store('theme', createTheme(Alpine));

  Alpine.data('accordion', accordion);
  Alpine.data('collapsible', collapsible);
  Alpine.data('captcha', captcha);
};
