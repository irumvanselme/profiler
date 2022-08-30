/** @type {import('tailwindcss').Config} */
const {fontSize } = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',
    content: ['./components/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
    theme: {
        screens: {
            xxs: '320px',
            xs: '375px',
            xs1: '425px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1440px',
            '3xl': '1536px',
            '4xl': '1920px',
            '5xl': '2560px',
            '6xl': '3440px'
        },
        fontSize: {
            heading1: ['80px', { lineHeight: '96px', letterSpacing: '-0.5px' }],
            heading2: ['64px', { lineHeight: '77px', letterSpacing: '-0.5px' }],
            heading3: ['48px', { lineHeight: '58px', letterSpacing: '-0.5px' }],
            'large-title1': [
                '34px',
                { lineHeight: '44px', letterSpacing: '-0.25px' }
            ],
            'large-title2': [
                '32px',
                { lineHeight: '42px', letterSpacing: '-0.25px' }
            ],
            title1: ['28px', { lineHeight: '39px', letterSpacing: '-0.25px' }],
            title2: ['24px', '34px'],
            title3: ['20px', '28px'],
            subheadline: ['18px', '25px'],
            body: ['17px', '24px'],
            'body-reading': ['17px', '26px'],
            callout: ['16px', '22px'],
            'callout-reading': ['16px', '24px'],
            caption: ['14px', '21px'],
            'caption-reading': ['14px', '25px'],
            caption2: ['12px', '18px'],
            caption3: ['10px', '15px'],
            caption4: ['8px', '12px'],
            ...fontSize
        },
        keyframes: {
            flicker: {
                '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
                    opacity: 0.99,
                    filter: 'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))'
                },
                '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
                    opacity: 0.4,
                    filter: 'none'
                }
            }
        },
        animation: {
            flicker: 'flicker 3s linear infinite'
        }
    }
}