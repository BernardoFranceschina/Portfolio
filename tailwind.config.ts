import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './locales/*.json',
    './content/**/*.md'
  ],
  safelist: [
    "bg-[#0B1B0C]", // Verde escuro
    "bg-[#674E0B]", // Amarelo escuro
    "bg-[#0f172a]", // Azul escuro
    "bg-[#9F3623]", // Laranja escuro
  ],

  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        
        display: ['"Fraunces"', 'serif'],
        
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [],
}