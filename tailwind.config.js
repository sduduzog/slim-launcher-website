/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./pages/**/*.vue', './layouts/**/*.vue', './components/**/*.vue']
  },
  theme: {
    extend: {
      gridTemplateRows: {
        layout: 'auto 1fr auto'
      },
      fontFamily: {
        sans: ['Ubuntu']
      }
    }
  },
  variants: {},
  plugins: []
}
