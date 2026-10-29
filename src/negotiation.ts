export const produces = ['text/html', 'text/markdown'] as const;

export type Produces = (typeof produces)[number];

export interface AcceptEntry {
  type: string;
  q: number;
  specificity: number;
}

export const parseAccept = (header: string): Array<AcceptEntry> => {
  return header
    .split(',')
    .map((raw) => {
      const parts = raw
        .trim()
        .split(';')
        .map((s) => s.trim());
      const type = parts[0].toLowerCase();
      let q = 1;
      for (const param of parts.slice(1)) {
        const [name, value] = param.split('=').map((s) => s.trim());
        if (name === 'q') {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
        }
      }
      const specificity = type === '*/*' ? 0 : type.endsWith('/*') ? 1 : 2;
      return { type, q, specificity };
    })
    .filter((entry) => entry.type.length > 0);
};

const matches = (entry: AcceptEntry, candidate: string): boolean => {
  if (entry.type === '*/*') return true;
  if (entry.type.endsWith('/*'))
    return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
};

export const preferredType = (header: string | null): Produces => {
  if (!header) return produces[0];
  const entries = parseAccept(header);
  if (entries.length === 0) return produces[0];

  let best: Produces | null = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of produces) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;
    for (let idx = 0; idx < entries.length; idx++) {
      const entry = entries[idx];
      if (!matches(entry, candidate)) continue;
      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = entry;
        matchedPosition = idx;
      }
    }
    if (matched === null) continue;
    if (matched.q <= 0) continue;

    if (
      matched.q > bestQ ||
      (matched.q === bestQ && matchedPosition < bestPosition)
    ) {
      bestQ = matched.q;
      bestPosition = matchedPosition;
      best = candidate;
    }
  }

  return best ?? produces[0];
};

export const prefersMarkdown = (header: string | null): boolean =>
  preferredType(header) === 'text/markdown';

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
