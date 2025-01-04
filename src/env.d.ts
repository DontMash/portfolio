/// <reference path="../.astro/types.d.ts" />
/// <reference path="@/.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SMTP_HOST: string;
  readonly SMTP_PORT: number;
  readonly SMTP_USER: string;
  readonly SMTP_PASSWORD: string;
  readonly SMTP_TARGET: string;
  readonly SMTP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
