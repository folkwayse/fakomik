<template>
  <section class="lg:w-2/3 sm:w-full mx-auto py-8">
    <header class="mb-4 mx-4">
      <h2 class="text-2xl font-bold">Komik dengan genre {{ $route.params.slug }}</h2>
    </header>
    <div class="flex flex-wrap justify-center mx-4">
      <article
        v-for="i in mangas"
        :key="i.slug"
        class="w-1/3 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/6 p-2 rounded overflow-hidden bg-gray-800 text-white"
      >
        <header class="w-full mx-auto mb-2">
          <nuxt-link :to="`/manga/${i.slug}`">
            <NuxtImg
              class="w-full h-48 object-cover"
              alt="Manga Cover"
              :src="i.poster"
              loading="lazy"
            />
          </nuxt-link>
        </header>

        <NuxtLink :to="`/manga/${i.slug}`">
          <h3 class="text-sm font-bold p-2 truncate">
            {{ i.title }}
          </h3>
        </NuxtLink>
        <span class="text-xs font-bold px-2 block">
          Chapter {{ i.last_chapters }}
        </span>
        <div class="flex items-center px-2 py-1">
          <div class="flex space-x-1">
            <span v-for="n in 5" :key="n" class="text-yellow-500">
              <svg
                v-if="n <= i.rating"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.174h4.382c.969 0 1.371 1.24.588 1.81l-3.547 2.573 1.357 4.174c.3.921-.755 1.688-1.538 1.21L10 13.347l-3.547 2.573c-.783.578-1.838-.289-1.538-1.21l1.357-4.174-3.547-2.573c-.783-.57-.381-1.81.588-1.81h4.382l1.357-4.174z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.174h4.382c.969 0 1.371 1.24.588 1.81l-3.547 2.573 1.357 4.174c.3.921-.755 1.688-1.538 1.21L10 13.347l-3.547 2.573c-.783.578-1.838-.289-1.538-1.21l1.357-4.174-3.547-2.573c-.783-.57-.381-1.81.588-1.81h4.382l1.357-4.174z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </span>
          </div>
          <span class="ml-2 text-xs">{{ i.rating }}</span>
        </div>
      </article>
    </div>

    <div class="flex justify-center">
  <NuxtLink
    v-if="nextCursor"
    :to="`/genres/${$route.params.slug}?cursor=${nextCursor}`"
    class="text-sm font-bold px-4 py-2 rounded-md bg-black text-white hover:bg-indigo-800 transition-colors duration-300 ease-in-out"
    @click="fetchMoreMangas"
  >
    Load More
  </NuxtLink>
</div>

  </section>
</template>

<script setup>

const mangas = ref([]);
const genre = ref(null);
const nextCursor = ref(null);
const prevCursor = ref(null);
const total = ref(0);




const config = useRuntimeConfig();
const { params } = useRoute();
// console.log(`${config.public.baseURL}genres/slug/${params.slug}/0`)
const { data:genres } = await useFetch(`${config.public.baseURL}genres/slug/${params.slug}/0`);


genre.value = genres.value.genre;
mangas.value = genres.value.genre.manga;
nextCursor.value = genres.value.nextCursor;
prevCursor.value = genres.value.prevCursor;
total.value = genres.value.total;

const fetchMoreMangas = async () => { 
  await fetchMangas(nextCursor.value);
}

const fetchMangas = async (cursor) => {
  const {data: genres } = await useFetch(`${config.public.baseURL}genres/slug/${params.slug}/${cursor}`);
  mangas.value = mangas.value.concat(genres.value.genre.manga);
  nextCursor.value = genres.value.nextCursor;
  prevCursor.value = genres.value.prevCursor;
  total.value = genres.value.total;
};

useJsonld(() => {
  if (mangas.value.length) {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: mangas.value.map((manga, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${config.public.homeUrl}manga/${manga.slug}`,
        name: manga.title,
      })),
    };
  }
});
</script>
