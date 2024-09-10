/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      border : {
        '1.5': '1.5px',
      },
      borderColor: {
        'input': '#DDDDDD'
      },
      fontWeight:{
        'semi-bold': '500',
      },
      fontSize: {
        'medium': '16px',
      },
      colors: {
        'primary': '#0061A7',
        'secondary': '#1169B0',
        'primary-light': '#F1F5F9',
        'input': '#666666',
        'hyperlink': '#0061A7',
        'subtext':'#4B4B4B',
        'checkbox':'#292929'
      },
      maxWidth:{
        '1920': '1920px',
      },
      minHeight:{
        '17': '4.5rem',
      },
    },
  },
  plugins: [],
}