import {
  IconCode,
  IconDots,
  IconEdit,
  IconLayoutDashboard,
} from '@tabler/icons-react';

import './toolbar.css';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { buttonVariant } from '@/components/ui/button';

type Props = {
  editHref: string;
  dashboardHref: string;
  localHref?: string;
};

export default function Toolbar({ editHref, dashboardHref, localHref }: Props) {
  return (
    <Collapsible className='fixed right-4 bottom-4 z-(--z-global-overlay) hidden sm:flex sm:flex-col sm:items-end sm:gap-2'>
      <CollapsibleContent
        className='flex max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] flex-col items-end gap-2 overflow-x-hidden overflow-y-auto p-8'
        data-slot='toolbar-content'
      >
        <a
          className={buttonVariant({ intent: 'accent', shadow: 'pop' })}
          href={editHref}
          target='_blank'
          rel='noreferrer'
        >
          <IconEdit aria-hidden />
          Edit page
        </a>
        <a
          className={buttonVariant({ intent: 'accent', shadow: 'pop' })}
          href={dashboardHref}
          target='_blank'
          rel='noreferrer'
        >
          <IconLayoutDashboard aria-hidden />
          Go to dashboard
        </a>
        {localHref && (
          <a
            className={buttonVariant({ intent: 'accent', shadow: 'pop' })}
            href={localHref}
            target='_blank'
            rel='noreferrer'
          >
            <IconCode aria-hidden />
            Go to Local
          </a>
        )}
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
