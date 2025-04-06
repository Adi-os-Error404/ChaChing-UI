/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    extend: {
        colors: {
        'cust-light-gray': '#FDFBFB',
        'cust-gray': '#EEEEEE',
        'cust-pink': '#FF75A8',
        'cust-green': '#B3D44F',

        },
    },
    },
    plugins: [],
}
