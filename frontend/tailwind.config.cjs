/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['index.html', './src/**/*.jsx'],
    theme: {
        extend: {},
    },
    plugins: [],
};

/*                      Instalar TailwindCSS                         */
/*  1.  npm i -D tailwindcss postcss autoprefixer                    */
/*  2.  npx tailwindcss init -p                                      */
/*  3.  Agregar { content: ["index.html", "./src/estrellas/*.jsx"],} */
/*  4.  index.css @tailwind base, components, utilities              */
