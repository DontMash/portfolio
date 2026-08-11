import { useEffect, useState, type ReactNode } from 'react';
import { solveChallengeWorkers } from 'altcha-lib';
import ChallengeWorker from 'altcha-lib/worker?worker';
import type { Challenge, Payload } from 'altcha-lib/types';
import { IconLoader2 } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';

type Status = 'none' | 'loading' | 'completed' | 'failed';

type Props = {
  children?: ReactNode;
};

export default function CaptchaButton({ children = 'Send' }: Props) {
  const [status, setStatus] = useState<Status>('none');
  const [result, setResult] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function challenge() {
      try {
        setStatus('loading');
        setResult('');

        const response = await fetch('/api/challenge');
        if (response.status !== 200) {
          throw new Error('Failed to fetch challenge.');
        }

        const data = (await response.json()) as Challenge;
        const solve = solveChallengeWorkers(
          () => new ChallengeWorker(),
          4,
          data.challenge,
          data.salt,
        );
        const solution = await solve;
        if (!solution) {
          throw new Error('Failed to solve challenge.');
        }

        const payload: Payload = {
          algorithm: data.algorithm,
          challenge: data.challenge,
          number: solution.number,
          salt: data.salt,
          signature: data.signature,
        };

        if (!cancelled) {
          setResult(btoa(JSON.stringify(payload)));
          setStatus('completed');
        }
      } catch (error) {
        if (!cancelled) {
          console.error(error);
          setStatus('failed');
        }
      }
    }

    void challenge();
    return () => {
      cancelled = true;
    };
  }, []);

  const statusMessage = {
    none: 'Preparing verification.',
    loading: 'Verifying your submission.',
    completed: 'Verification complete.',
    failed: 'Verification failed.',
  }[status];

  return (
    <>
      <input type='hidden' name='captcha' required value={result} />
      <Button
        type='submit'
        variant='default'
        shadow='pop'
        disabled={status !== 'completed'}
        aria-busy={status === 'loading'}
        data-active={status === 'loading' ? 'true' : undefined}
        className='group'
      >
        <IconLoader2
          aria-hidden
          data-icon='inline-start'
          className='hidden group-data-[active=true]:inline-block group-data-[active=true]:animate-spin'
        />
        {children}
      </Button>
      <span className='sr-only' aria-live='polite'>
        {statusMessage}
      </span>
    </>
  );
}
