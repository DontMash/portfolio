import { cva } from 'class-variance-authority';

export const inputLabel = cva([
  'flex',
  'items-center',
  'border-3',
  'border-foreground',
  'bg-background',
  'text-foreground',
  'transition',
  'cursor-pointer',
  'focus-within:bg-foreground',
  'focus-within:text-background',
  'focus-within:outline-dashed',
  'focus-within:outline-3',
  'focus-within:outline-offset-2',
  'focus-within:outline-foreground',
  'hover:bg-foreground',
  'hover:text-background',
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
  'bg-background',
  'align-text-bottom',
  'text-foreground',
  'transition',
  'checked:bg-primary',
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
