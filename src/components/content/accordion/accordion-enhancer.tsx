import { useEffect } from 'react';

type Props = {
  rootId: string;
};

export default function AccordionEnhancer({ rootId }: Props) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) {
      return;
    }

    const triggers = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]'),
    );
    const multiple = root.dataset.accordionMultiple === 'true';
    const closeTimers = new Map<HTMLElement, number>();

    const setExpanded = (
      trigger: HTMLButtonElement,
      expanded: boolean,
      immediate = false,
    ) => {
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      const item = trigger.closest<HTMLElement>('[data-accordion-item]');

      trigger.setAttribute('aria-expanded', String(expanded));
      trigger.dataset.state = expanded ? 'open' : 'closed';
      item?.setAttribute('data-state', expanded ? 'open' : 'closed');

      if (panel) {
        const previousTimer = closeTimers.get(panel);
        if (previousTimer) {
          window.clearTimeout(previousTimer);
        }

        panel.hidden = false;
        panel.dataset.state = expanded ? 'open' : 'closed';
        panel.setAttribute('aria-hidden', String(!expanded));

        if (!expanded) {
          const hide = () => {
            if (panel.dataset.state === 'closed') {
              panel.hidden = true;
            }
          };
          if (immediate) {
            hide();
          } else {
            closeTimers.set(panel, window.setTimeout(hide, 200));
          }
        }
      }
    };

    const onClick = (event: Event) => {
      const trigger = event.currentTarget as HTMLButtonElement;
      const expanded = trigger.getAttribute('aria-expanded') === 'true';

      if (!multiple && !expanded) {
        triggers.forEach((item) => {
          if (item !== trigger) {
            setExpanded(item, false);
          }
        });
      }

      setExpanded(trigger, !expanded);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const trigger = event.currentTarget as HTMLButtonElement;
      const index = triggers.indexOf(trigger);
      let nextIndex: number | undefined;

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          nextIndex = (index + 1) % triggers.length;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          nextIndex = (index - 1 + triggers.length) % triggers.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = triggers.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      triggers[nextIndex]?.focus();
    };

    triggers.forEach((trigger) => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      setExpanded(trigger, expanded, true);
      trigger.addEventListener('click', onClick);
      trigger.addEventListener('keydown', onKeyDown);
    });

    return () => {
      closeTimers.forEach((timer) => window.clearTimeout(timer));
      triggers.forEach((trigger) => {
        trigger.removeEventListener('click', onClick);
        trigger.removeEventListener('keydown', onKeyDown);
      });
    };
  }, [rootId]);

  return <span hidden aria-hidden='true' data-accordion-enhancer />;
}
