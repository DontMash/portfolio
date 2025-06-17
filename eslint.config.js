import { fileURLToPath, URL } from 'node:url';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-plugin-prettier/recommended';

const ignoreGit = fileURLToPath(new URL('.gitignore', import.meta.url));
const ignorePrettier = fileURLToPath(
  new URL('.prettierignore', import.meta.url),
);

export default ts.config(
  includeIgnoreFile(ignoreGit),
  includeIgnoreFile(ignorePrettier),
  js.configs.recommended,
  ts.configs.recommended,
  astro.configs.recommended,
  prettier,

  // https://github.com/withastro/prettier-plugin-astro/issues/407#issuecomment-2498306376
  {
    files: [
      '**/*.astro/*.js',
      '*.astro/*.js',
      '**/*.astro/*.ts',
      '*.astro/*.ts',
    ],
    rules: {
      'prettier/prettier': 'off',
    },
  },
);
