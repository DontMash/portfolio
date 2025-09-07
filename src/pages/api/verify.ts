import type { APIRoute } from 'astro';
import { CAPTCHA_KEY } from 'astro:env/server';
import { createChallenge } from 'altcha-lib';

export const GET: APIRoute = async () => {
  const challenge = await createChallenge({
    hmacKey: CAPTCHA_KEY,
  });
  return new Response(JSON.stringify(challenge), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
