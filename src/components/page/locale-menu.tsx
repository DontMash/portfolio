import { IconCheck, IconLanguage } from '@tabler/icons-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { buttonVariant } from '@/components/ui/button';

type LocaleOption = {
  label: string;
  href: string;
  current?: boolean;
};

type Props = {
  currentLabel: string;
  options: LocaleOption[];
};

export default function LocaleMenu({ currentLabel, options }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Language: ${currentLabel}`}
        className={buttonVariant({ kind: 'link', intent: 'primary' })}
        type='button'
      >
        <IconLanguage aria-hidden />
        <span className='sr-only'>{currentLabel}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {options.map((option) =>
          option.current ? (
            <DropdownMenuItem
              disabled
              key={option.href}
              render={<span aria-current='page' />}
            >
              <span>{option.label}</span>
              <IconCheck aria-hidden className='ml-auto' />
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              key={option.href}
              render={<a href={option.href} />}
            >
              <span>{option.label}</span>
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
