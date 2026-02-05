import type { Config } from 'tailwindcss'

export default <Config>{
  content: ['./locales/*.json'],
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