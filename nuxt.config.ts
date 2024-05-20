// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app : {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: { name: "page", mode: "out-in" },},
  devServer: {
    port: 4000,
  },

  ssr: true,
  devtools: { enabled: false },
  modules: [
    
    "@nuxtjs/sitemap",
    "@nuxtjs/tailwindcss",
    "nuxt-simple-robots",
    "nuxt-disqus",
    "nuxt-primevue",
    "@pinia/nuxt",
    '@nuxtjs/seo'
    
  ],
  site: {
    url: 'https://fakomik.cloud',
    name: 'Fakomik Cloud',
    description: 'Tempat Baca Komik Manga Manhua Manhwa Bahasa Indonesia',
    defaultLocale: 'id', // not needed if you have @nuxtjs/i18n installed
  },

  primevue: {
    cssLayerOrder: "reset,primevue",
  },
  css: ["primevue/resources/themes/aura-dark-indigo/theme.css"],

  disqus: {
    shortname: "fakomik",
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_URL || "https://api.example.com/",
    },
  },
});
