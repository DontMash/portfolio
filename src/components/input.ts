import { cva } from 'class-variance-authority';

export const inputLabel = cva([
  'flex',
  'items-center',
  'border-3',
  'border-(--color-foreground)',
  'bg-(--color-background)',
  'text-(--color-foreground)',
  'transition',
  'cursor-pointer',
  'focus-within:bg-(--color-foreground)',
  'focus-within:text-(--color-background)',
  'focus-within:outline-dashed',
  'focus-within:outline-3',
  'focus-within:outline-offset-2',
  'focus-within:outline-(--color-foreground)',
  'hover:bg-(--color-foreground)',
  'hover:text-(--color-background)',
]);
export const inputText = cva([
  'w-full',
  'bg-transparent',
  'px-5',
  'py-3',
  'outline-hidden',
  'placeholder:text-base-300',
]);
export const inputCheckbox = cva([
  'inline-block',
  'size-6',
  'shrink-0',
  'cursor-pointer',
  'select-none',
  'appearance-none',
  'border-3',
  'bg-(--color-background)',
  'align-text-bottom',
  'text-(--color-foreground)',
  'transition',
  'checked:bg-(--color-primary)',
  'focus-visible:outline-dashed',
  'focus-visible:outline-current',
  'focus-visible:outline-3',
  'focus-visible:outline-offset-2',
]);
export const inputError = cva([
  'text-error',
  'paragraph',
  'mt-1',
  'mb-1',
  'before:inline-block',
  'before:content-[""]',
]);
