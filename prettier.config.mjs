/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  jsxSingleQuote: true,
  
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
