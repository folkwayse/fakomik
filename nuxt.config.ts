// https://nuxt.com/docs/api/configuration/nuxt-config
interface Chapter {
  url: string;
  changefreq?: string;
  priority?: number;
}

export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  devServer: {
    port: 4000,
  },

  ssr: true,

  devtools: { enabled: true },
  modules: [
    "@nuxtjs/sitemap",
    "nuxt-simple-robots",
    "nuxt-disqus",
    "@pinia/nuxt",
    "@nuxtjs/seo",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt", // needed
    "@pinia-plugin-persistedstate/nuxt",
    'nuxt-jsonld'
  ],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
    storage: "localStorage",
  },
  site: {
    url: "https://fakomik.cloud",
    name: "Fakomik Cloud",
    description: "Tempat Baca Komik Manga Manhua Manhwa Bahasa Indonesia",
    defaultLocale: "id", // not needed if you have @nuxtjs/i18n installed
  },
  sitemap: {
    // Asynchronously fetch URLs for the sitemap
    // async urls() {
    //   const apiUrl = process.env.API_URL + "sitemaps/chapters"
    //   try {
    //     // Fetch data from the API endpoint
    //     const response = await fetch(apiUrl);

    //     // Check if the response is ok
    //     if (!response.ok) {
    //       throw new Error(`Failed to fetch sitemap data: ${response.statusText}`);
    //     }

    //     // Parse the response as JSON
    //     const data = await response.json();

    //     // Ensure the data is in the correct format for the sitemap
    //     return data.map((chapter: Chapter) => ({
    //       url: chapter.url, // Adjust according to the structure of your data
    //       changefreq: chapter.changefreq || 'weekly', // Default value if not provided
    //       priority: chapter.priority || 0.8 // Default value if not provided
    //     }));
    //   } catch (error) {
    //     // Log the error and return an empty array if fetching fails
    //     console.error(`Error fetching sitemap data from ${apiUrl}:`, error);
    //     return [];
    //   }
    // },

    sources: [
      // fetch from an unauthenticated endpoint
      process.env.API_URL + "sitemaps/chapters",
      // fetch from an authenticated endpoint
      
    ],

    // Set sitemaps to true to generate the sitemap
    sitemaps: true,
  },
  disqus: {
    shortname: "fakomik",
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_URL || "https://api.example.com/",
      homeUrl: process.env.HOME_URL ,
    },
  },
});
