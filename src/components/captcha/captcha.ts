import type { AlpineComponent } from 'alpinejs';
import { solveChallenge } from 'altcha-lib';
import type { Challenge, Payload } from 'altcha-lib/types';

type AlpineCaptchaComponent = AlpineComponent<
  (
    | { state: 'none' | 'loading'; result: undefined; error: undefined }
    | { state: 'completed'; result: string; error: undefined }
    | { state: 'failed'; result: undefined; error: string }
  ) & {
    challenge: () => Promise<void>;
  }
>;

export default () =>
  ({
    state: 'none',
    result: undefined,
    error: undefined,
    init() {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.challenge();
            observer.unobserve(this.$el);
          }
        });
      });
      observer.observe(this.$el);
    },
    async challenge() {
      try {
        console.info('Challenge started.');

        this.state = 'loading';
        this.result = undefined;
        this.error = undefined;

        const response = await fetch('/api/challenge');
        if (response.status != 200) {
          throw new Error('Failed to fetch challenge.');
        }

        const data = (await response.json()) as Challenge;
        const solve = solveChallenge(data.challenge, data.salt);
        const solution = await solve.promise;
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
        const json = JSON.stringify(payload);
        this.state = 'completed';
        this.result = btoa(json);

        console.info('Challenge completed.');
      } catch (err) {
        console.error(err);

        if (err instanceof Error) {
          this.state = 'failed';
          this.error = err.message;
        }
      }
    },
  }) satisfies AlpineCaptchaComponent;
