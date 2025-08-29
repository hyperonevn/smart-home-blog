const BLOG = require('./blog.config.js')
const { FONTS_SANS, FONTS_SERIF } = require('./consts')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './layouts/**/*.{js,jsx,ts,tsx}',
        './lib/**/*.{js,jsx,ts,tsx}',
        './app/**/*.{js,jsx,ts,tsx}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                day: {
                    DEFAULT: BLOG.lightBackground || '#ffffff'
                },
                night: {
                    DEFAULT: BLOG.darkBackground || '#111827'
                }
            },
            fontFamily: {
                sans: FONTS_SANS,
                serif: FONTS_SERIF,
                noEmoji: [
                    '"IBM Plex Sans"',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'sans-serif'
                ]
            }
        }
    },
    plugins: []
}


