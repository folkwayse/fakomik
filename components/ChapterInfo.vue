<template>
  <section>
    <div class="container mx-auto p-4 lg:w-2/3">
      <div class="flex justify-center items-center">
        <nav
          class="text-sm sm:text-base p-4 md:p-6 lg:p-6 rounded-md shadow-lg"
        >
          <ol class="list-none p-0 inline-flex space-x-2">
            <li class="flex items-center">
              <svg
                onclick="window.location.href='/';"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 576 512"
                class="cursor-pointer hover:fill-blue-500 transition-colors duration-300"
                fill="#4b5563"
              >
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                />
              </svg>
              <span class="mx-2">/</span>
            </li>
            <li class="flex items-center">
              <NuxtLink
                class="text-gray-600 hover:text-blue-500 transition-colors duration-300"
                :href="`/manga/${data.Chapter.manga.slug}`"
              >
                {{ data.Chapter.manga.title }}
              </NuxtLink>
              <span class="mx-2">/</span>
            </li>

            <li class="flex items-center">
              <span class="text-gray-200">{{ data.Chapter.name }}</span>
            </li>
          </ol>
        </nav>
      </div>

      <div class="shadow-md rounded-lg p-6">
        <div v-if="data">
          <h1 class="text-2xl font-bold mb-4">{{ data.Chapter.name }}</h1>
          <div>
            <h3 class="text-sm">
              Baca manga / komik {{ data.Chapter.name }} terbaru di
              {{ config.public.siteName }} . Manga / komik
              {{ data.Chapter.manga.title }} bahasa Indonesia selalu update di
              {{ config.public.siteName }}. Jangan lupa membaca update manga / komik lainnya ya.
              Daftar koleksi manga / komik di  {{ config.public.siteName }} ada di menu Manga.
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig();

// Access baseURL universally
const homeUrl = config.public.homeUrl;
const siteConfig = ref(config.public);
const { params } = useRoute();
const slug = params.slug;
const { data, pending, error, refresh } = await useAsyncData(
  "chapter",
  async () => {
    const data = await $fetch(
      `${config.public.baseURL}chapters/gettitle/${slug}`
    );
    useJsonld(() => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Manga",
          item: homeUrl + "manga",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: data.value.Chapter.manga.title,
          item: homeUrl + "manga/" + data.value.Chapter.manga.slug,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: data.value.Chapter.name,
        },
      ],
    }));
    return data;
  }
);
</script>
