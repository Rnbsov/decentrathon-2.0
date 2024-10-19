import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#45B3CB',
        primaryPink: '#ED7390',
        primaryOrange: '#E59850',
        
        ai_primary: '#C6F432',
        ai_primaryPurple: '#C09FF8',
        ai_primaryPink: '#FEC4DD',
        ai_text: "#171717",

        ai_bg_primary: "#010101",
        ai_bg_secondary: "#171717",

        ai_border: "#434343"
      },
      backgroundColor: {
        primary: '#f6f6f6',
        secondary: '#ECF2F3',

        ai_primary: '#C6F432',
        ai_primaryPurple: '#C09FF8',
        ai_primaryPink: '#FEC4DD',
        ai_text: "#171717",

        ai_bg_primary: "#010101",
        ai_bg_secondary: "#171717",

        ai_border: "#434343"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontFamily: {
        novaSquare: ['Nova Square', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      }
    }
  },
  plugins: []
}
export default config
