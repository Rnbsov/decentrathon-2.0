import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  safelist: [
    'bg-primary',
    'bg-primaryPink',
    'bg-primaryOrange',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#45B3CB',
        primaryPink: '#ED7390',
        primaryOrange: '#E59850'
      },
      backgroundColor: {
        primaryBg: '#f6f6f6',
        secondaryBg: '#ECF2F3'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif']
      }
    }
  },
  plugins: []
}
export default config
