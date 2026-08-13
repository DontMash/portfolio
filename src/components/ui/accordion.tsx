import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { IconCaretDown } from '@tabler/icons-react';

import { cn } from '@/lib/utils';

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot='accordion'
      className={cn('flex w-full flex-col gap-4', className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot='accordion-item'
      className={cn('w-full', className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        data-slot='accordion-trigger'
        className={cn(
          'group paragraph-highlight relative flex w-full cursor-pointer gap-4 border-b-3 p-4 text-left after:absolute after:top-[calc(100%+var(--border-3))] after:right-0 after:left-1 after:h-(--border-3) after:w-full after:bg-(--color-primary) focus-visible:outline-3 focus-visible:outline-current focus-visible:outline-dashed',
          className,
        )}
        {...props}
      >
        {children}
        <IconCaretDown
          aria-hidden
          data-icon='inline-end'
          className='ml-auto min-w-fit self-end transition group-data-panel-open:rotate-180'
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot='accordion-content'
      keepMounted
      className={cn(
        'data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden motion-reduce:animate-none',
        className,
      )}
      {...props}
    >
      <div
        className={cn('px-4 pt-4 [&>*]:first:mt-0 [&>*]:last:mb-0', className)}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
