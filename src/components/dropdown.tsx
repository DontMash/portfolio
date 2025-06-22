import { cva } from 'class-variance-authority';

export const dropdownItem = cva([
  'inline-flex',
  'gap-2',
  'w-full',
  'p-2',
  'transition',
  'select-none',
  'hover:bg-(--color-foreground)',
  'hover:text-(--color-background)',
  'focus-visible:bg-(--color-foreground)',
  'focus-visible:text-(--color-background)',
  'focus-visible:outline-3',
  'focus-visible:outline-offset-4',
  'focus-visible:outline-(--color-foreground)',
  'focus-visible:outline-dashed',
]);
