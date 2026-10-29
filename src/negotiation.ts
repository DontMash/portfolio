const MARKDOWN_ACCEPT = /text\/markdown(?:[^\w-]|$)/i;

export const prefersMarkdown = (header: string | null): boolean =>
  !!header && MARKDOWN_ACCEPT.test(header);

export const appendVaryAccept = (headers: Headers): void => {
  const existing = headers.get('Vary');
  if (!existing) {
    headers.set('Vary', 'Accept');
    return;
  }
  const tokens = existing.split(',').map((s) => s.trim().toLowerCase());
  if (!tokens.includes('accept')) {
    headers.set('Vary', `${existing}, Accept`);
  }
};
