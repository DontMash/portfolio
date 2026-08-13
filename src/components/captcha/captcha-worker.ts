import { solveChallenge } from 'altcha-lib';
import type { Algorithm } from 'altcha-lib/types';

type WorkMessage = {
  type: 'work';
  payload: {
    algorithm: Algorithm;
    challenge: string;
    max: number;
    salt: string;
    start: number;
  };
};

type AbortMessage = {
  type: 'abort';
};

type WorkerMessage = WorkMessage | AbortMessage;

type WorkerError = {
  type: 'error';
  message: string;
};

let controller: AbortController | undefined;

async function handleMessage(event: MessageEvent<WorkerMessage>) {
  if (event.data.type === 'abort') {
    controller?.abort();
    controller = undefined;
    return;
  }

  const { payload } = event.data;

  try {
    const result = solveChallenge(
      payload.challenge,
      payload.salt,
      payload.algorithm,
      payload.max,
      payload.start,
    );
    controller = result.controller;
    const solution = await result.promise;

    globalThis.postMessage(solution ? { ...solution, worker: true } : null);
  } catch (error) {
    const message: WorkerError = {
      type: 'error',
      message:
        error instanceof Error ? error.message : 'CAPTCHA worker failed.',
    };
    globalThis.postMessage(message);
  } finally {
    controller = undefined;
  }
}

globalThis.addEventListener('message', (event) => {
  void handleMessage(event as MessageEvent<WorkerMessage>);
});
