/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#09090b', // zinc-950
                surface: '#18181b', // zinc-900
                primary: '#fafafa', // zinc-50
                secondary: '#a1a1aa', // zinc-400
                accent: '#fb7185', // rose-400 (Soft Red)
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
