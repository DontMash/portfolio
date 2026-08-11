import {
  IconCode,
  IconDots,
  IconEdit,
  IconLayoutDashboard,
} from '@tabler/icons-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { buttonVariant } from '@/components/ui/button';

type Link = {
  href: string;
  label: string;
  icon: 'edit' | 'dashboard' | 'code';
};

type Props = {
  links: Link[];
};

const linkIcons = {
  edit: IconEdit,
  dashboard: IconLayoutDashboard,
  code: IconCode,
};

export default function Toolbar({ links }: Props) {
  return (
    <Collapsible className='fixed right-4 bottom-4 z-50 hidden sm:flex sm:flex-col sm:items-end sm:gap-2'>
      <CollapsibleContent className='flex flex-col items-end gap-2 border border-(--color-foreground)/30 p-8 shadow-2xl backdrop-blur-sm'>
        {links.map((link) => {
          const Icon = linkIcons[link.icon];

          return (
            <a
              className={buttonVariant({ intent: 'accent', shadow: 'pop' })}
              href={link.href}
              key={link.href}
              target='_blank'
              rel='noreferrer'
            >
              <Icon aria-hidden />
              {link.label}
            </a>
          );
        })}
      </CollapsibleContent>
      <CollapsibleTrigger
        aria-label='Toggle preview toolbar'
        className={buttonVariant({ intent: 'accent', size: 'icon' })}
        type='button'
      >
        <IconDots aria-hidden />
      </CollapsibleTrigger>
    </Collapsible>
  );
}
