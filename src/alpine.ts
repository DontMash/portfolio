import type { Alpine } from 'alpinejs';
import collapse from '@alpinejs/collapse';
import persist from '@alpinejs/persist';

import { create as createTheme } from '@/theme';
import collapsible from '@/components/collapsible';
import captcha from '@/components/captcha/captcha';

export default (Alpine: Alpine) => {
  Alpine.plugin(collapse);
  Alpine.plugin(persist);

  Alpine.store('theme', createTheme(Alpine));

  Alpine.data('collapsible', collapsible);
  Alpine.data('captcha', captcha);
};
