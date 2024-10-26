// https://nuxt.com/docs/api/configuration/nuxt-config
interface Chapter {
  url: string;
  changefreq?: string;
  priority?: number;
}

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        // {
        //   src: 'https://yonhelioliskor.com/act/files/tag.min.js?z=7632582',
        //   'data-cfasync': 'false',
        //   async: true
        // },
        {
          innerHTML: `var _Hasync= _Hasync|| [];
          _Hasync.push(['Histats.start', '1,4870396,4,0,0,0,00010000']);
          _Hasync.push(['Histats.fasi', '1']);
          _Hasync.push(['Histats.track_hits', '']);
          (function() {
          var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
          hs.src = ('//s10.histats.com/js15_as.js');
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
          })();`,
          type: "text/javascript",
        },
      ],
      __dangerouslyDisableSanitizers: ["script"],
      noscript: [
        {
          innerHTML: `<a href="/" target="_blank"><img src="//sstatic1.histats.com/0.gif?4870396&101" alt="" border="0"></a>`,
          body: true,
        },
      ],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap",
        },
        { rel: "canonical", href: "https://www." + process.env.SITE_NAME }, // Atur URL yang benar di sini
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  devServer: {
    port: Number(process?.env?.PORT) || 5000,
  },
  // plugins: [
  //   { src: './utils/adsterra.js', mode: 'client' },
  //   { src: './utils/peler.js', mode: 'client' },
  // ],
  ssr: true,

  devtools: { enabled: true },
  modules: [
    "@nuxtjs/sitemap",
    "nuxt-simple-robots",
    "nuxt-disqus",
    "@pinia/nuxt",
    "@nuxtjs/seo",
    // needed
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-jsonld",
    "@nuxt/image",
    "nuxt-cloudflare-analytics",
    "shadcn-nuxt",
    "@nuxt/icon"
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_URL,
      homeUrl: process.env.HOME_URL,
      siteName: process.env.SITE_NAME,
    },
  },
  cloudflareAnalytics: {
    // See below for more options
    token: "e269b38640754256852aa52657164770", // Example 1a2b3v4a5er6ac7r8afd
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
    storage: "localStorage",
  },
  image: {},
  robots: {
    disallow: ["/api/*", "/upload", "_nuxt/", "sender", "session"],
  },
  site: {
    url: process.env.HOME_URL || "https://www.fakomik.cloud",
    name: process.env.SITE_NAME || "Fakomik",
    description: process.env.SITE_DESCRIPTION || "Fakomik",
    keywords: process.env.SITE_KEYWORDS || "Fakomik",

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
      // process.env.API_URL + "sitemaps/chapters",

      process.env.API_URL + "sitemaps/chapters?Host=" + process.env.HOME_URL,

      // fetch from an authenticated endpoint
    ],

    // Set sitemaps to true to generate the sitemap
    sitemaps: true,
  },
  disqus: {
    shortname: "fakomik",
  },
});