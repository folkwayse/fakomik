// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    '@pinia/nuxt',
  ],
  primevue: {
    cssLayerOrder: "reset,primevue",
  },
  css: ["primevue/resources/themes/aura-dark-indigo/theme.css"],
  disqus: {
    shortname: "fakomik",
  },
});
