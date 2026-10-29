interface Window {
  Alpine: import('alpinejs').Alpine;
}

declare namespace App {
  interface Locals {
    prefersMarkdown: boolean;
  }
}
