import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-16',
  devtools: { enabled: false },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Slim launcher',
      htmlAttrs: { lang: 'en' },
      meta: [
        {
          name: 'description',
          content:
            'Less distraction, more life - a minimalist launcher for your android phone',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/', '/privacy'],
      failOnError: true,
    },
  },
})
