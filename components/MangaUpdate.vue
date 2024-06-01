<template>
  <div>
    <section class="lg:w-2/3 sm:w-full mx-auto py-8">
      <div class="mx-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Chapter Baru</h2>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <NuxtLink v-for="i in mangas" :key="i"
          :to="`/manga/${i.slug}`"
          >
            <div class="flex items-start gap-4 bg-gray-900 rounded-lg m-1 p-2">
              <NuxtImg
                :src="i.poster"
                alt="Attack on Titan"
                class="aspect-[9/16] rounded-lg object-cover h-36"
              />
              <div class="grid flex-1 gap-2">
                <h3 class="text-lg font-medium">{{ i.title }}</h3>
                <div class="grid gap-2">
                  <div
                    class="items-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    <span> {{ i.last_chapters }} </span>
                    <br />
                    <span>[{{ formattedTime(i.updatedAt) }}]</span>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="flex justify-center m-3 p-2">
        <NuxtLink v-if="mangaData.prevPage" :to="`/manga/update/page/${mangaData.prevPage}`">
          <button class="text-white bg-indigo-500 px-4 py-2 hover:underline">
            < Prev
          </button>
        </NuxtLink>
        <NuxtLink  v-if="mangaData.nextPage"  :to="`/manga/update/page/${mangaData.nextPage}`">
          <button class="text-white bg-indigo-500 px-4 py-2 hover:underline">
            Next >
          </button>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>

const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
});


import { formatDistanceToNow } from "date-fns";
const formattedTime = (time) => {
  return formatDistanceToNow(time, { addSuffix: true });
};

const mangas = ref([]);

// const { data: mangaData, error } = await useFetch("/api/manga/newmanga");
const config = useRuntimeConfig();
const { data: mangaData } = await useFetch(
  `${config.public.baseURL}mangas/newchapter?page=${props.page}`
);
if (mangaData.value) {
  mangas.value = mangaData.value.mangas;
}
useJsonld(() => {
  if (mangas.value.length) {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: mangas.value.map((manga, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `/manga/${manga.slug}`,
        name: manga.title,
      })),
    };
  }
});
</script>
