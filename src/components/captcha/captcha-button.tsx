import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Challenge, Payload, Solution } from 'altcha-lib/types';
import { IconLoader2 } from '@tabler/icons-react';

import ChallengeWorker from './captcha-worker?worker';

import { Button } from '@/components/ui/button';

type Status = 'none' | 'loading' | 'completed' | 'failed';

type StatusMessages = Record<Status, string>;

type Props = {
  children?: ReactNode;
  retryLabel?: string;
  statusMessages?: Partial<StatusMessages>;
};

const defaultStatusMessages: StatusMessages = {
  none: 'Preparing verification.',
  loading: 'Verifying your submission.',
  completed: 'Verification complete.',
  failed: 'Verification failed. Retry to try again.',
};

const workerCount = 4;

function solveChallengeWithWorkers(
  challenge: Challenge,
  signal: AbortSignal,
): Promise<Solution | null> {
  if (!globalThis.crypto?.subtle) {
    return Promise.reject(new Error('Web Crypto is unavailable.'));
  }

  const configuredMax = challenge.maxnumber ?? 1_000_000;
  const max = Number.isFinite(configuredMax)
    ? Math.min(Math.max(Math.floor(configuredMax), 0), 1_000_000)
    : 1_000_000;
  const rangeCount = Math.min(workerCount, max + 1);
  const workers = Array.from(
    { length: rangeCount },
    () => new ChallengeWorker(),
  );
  const step = Math.ceil((max + 1) / rangeCount);

  return new Promise((resolve, reject) => {
    let settled = false;

    type WorkerResponse = Solution | null | { type: 'error'; message: string };
    let remaining = workers.length;

    const cleanup = () => {
      signal.removeEventListener('abort', abort);
      workers.forEach((worker) => worker.terminate());
    };

    const finish = (callback: () => void) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      callback();
    };

    const abort = () => {
      finish(() => resolve(null));
    };

    const fail = (error: Error) => {
      finish(() => reject(error));
    };

    signal.addEventListener('abort', abort, { once: true });

    workers.forEach((worker, index) => {
      worker.addEventListener('error', () => {
        fail(new Error('CAPTCHA worker failed.'));
      });
      worker.addEventListener(
        'message',
        (event: MessageEvent<WorkerResponse>) => {
          const response = event.data;
          if (response && 'type' in response) {
            fail(new Error(response.message));
            return;
          }

          if (response) {
            workers.forEach((otherWorker) => {
              if (otherWorker !== worker) {
                otherWorker.postMessage({ type: 'abort' });
              }
            });
            finish(() => resolve(response));
            return;
          }

          remaining -= 1;
          if (remaining === 0) {
            finish(() => resolve(null));
          }
        },
      );

      const start = index * step;
      worker.postMessage({
        payload: {
          algorithm: challenge.algorithm,
          challenge: challenge.challenge,
          max: Math.min(start + step - 1, max),
          salt: challenge.salt,
          start,
        },
        type: 'work',
      });
    });
  });
}

export default function CaptchaButton({
  children = 'Send',
  retryLabel = 'Retry',
  statusMessages,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [challengeGeneration, setChallengeGeneration] = useState(0);
  const [status, setStatus] = useState<Status>('none');
  const [result, setResult] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function challenge() {
      try {
        setStatus('loading');
        setResult('');

        const response = await fetch('/api/challenge');
        if (response.status !== 200) {
          throw new Error('Failed to fetch challenge.');
        }

        const data = (await response.json()) as Challenge;
        const solution = await solveChallengeWithWorkers(
          data,
          controller.signal,
        );
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

        if (!controller.signal.aborted) {
          setResult(btoa(JSON.stringify(payload)));
          setStatus('completed');
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('CAPTCHA challenge failed.', error);
          setStatus('failed');
        }
      }
    }

    void challenge();
    return () => controller.abort();
  }, [challengeGeneration]);

  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) {
      return;
    }

    const handleReset = () => {
      setResult('');
      setStatus('none');
      setChallengeGeneration((value) => value + 1);
    };
    form.addEventListener('reset', handleReset);
    return () => form.removeEventListener('reset', handleReset);
  }, []);

  const isRetry = status === 'failed';
  const retry = () => {
    setResult('');
    setStatus('loading');
    setChallengeGeneration((value) => value + 1);
  };
  const statusMessage = {
    ...defaultStatusMessages,
    ...statusMessages,
  }[status];

  return (
    <>
      <input
        ref={inputRef}
        type='hidden'
        name='captcha'
        required
        value={result}
      />
      <Button
        type={isRetry ? 'button' : 'submit'}
        variant='default'
        shadow='pop'
        disabled={status !== 'completed' && !isRetry}
        aria-busy={status === 'loading'}
        data-active={status === 'loading' ? 'true' : undefined}
        className='group'
        onClick={isRetry ? retry : undefined}
      >
        <IconLoader2
          aria-hidden
          data-icon='inline-start'
          className='hidden group-data-[active=true]:inline-block group-data-[active=true]:animate-spin'
        />
        {isRetry ? retryLabel : children}
      </Button>
      <span className='sr-only' aria-live='polite'>
        {statusMessage}
      </span>
    </>
  );
}
