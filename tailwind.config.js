/** @type {import('tailwindcss').Config} */
module.exports = {
    // experimental: {
    //     disableTailwindcssOxi: true, // ✅ disables native oxide binding
    // },
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
