import { useEffect } from 'react';
import {
  IconContrastFilled,
  IconDeviceDesktop,
  IconMoon,
  IconSun,
} from '@tabler/icons-react';
import { useStore } from '@nanostores/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { buttonVariant } from '@/components/ui/button';
import {
  initializeTheme,
  setTheme,
  themePreference,
  type ThemeState,
} from '@/theme';

export default function ThemeMenu() {
  const preference = useStore(themePreference);

  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Theme: ${preference}`}
        className={buttonVariant({ kind: 'link', intent: 'primary' })}
        type='button'
      >
        <IconContrastFilled aria-hidden />
        <span className='sr-only'>{preference}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuRadioGroup
          value={preference}
          onValueChange={(value) => setTheme(value as ThemeState)}
        >
          <DropdownMenuRadioItem value='light'>
            <IconSun aria-hidden />
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='dark'>
            <IconMoon aria-hidden />
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='auto'>
            <IconDeviceDesktop aria-hidden />
            <span>Auto</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
