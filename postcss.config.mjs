import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const config = {
    plugins: [
        tailwindcss("./tailwind.config.mjs"),
        autoprefixer,
    ]
};

export default config;
