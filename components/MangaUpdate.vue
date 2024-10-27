<template>
  <div>
    <section class="lg:w-2/3 sm:w-full mx-auto py-8">
      <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-4 p-4 ">
        <div v-for="(item, index) in mangas" :key="index" class="flex flex-col relative h-[170px] md:h-[300px]">
          <div class="absolute inset-0  rounded-xl bg-gray-700"
            :style="{ 'background-image': `url(${makeItjetPack(item.poster)})` }"
            style="background-size: cover; background-position: center"></div>
          <NuxtLink class="bg-gray-800 p-2 rounded-lg" :to="`/manga/${item.slug}`">
            <div class="absolute bottom-0 inset-x-0 bg-black bg-opacity-50 p-2 text-white">
              <div class="text-left text-xs overflow-hidden overflow-ellipsis line-clamp-1">
                {{ item.title }}
              </div>
              <div class="text-gray-400 text-left text-xs">
                <NuxtLink v-for="(item, index) in item.chapter" :key="index" :to="`/chapters/${item.slug}`">
                  Ch. {{ item.chapter_number }},
                </NuxtLink>
              </div>
            </div>

          </NuxtLink>
        </div>
      </div>
    </section>
    <div class="flex justify-center m-3 p-2">
      <NuxtLink v-if="mangaData.prevPage" :to="`/manga/new/page/${mangaData.prevPage}`">
        <button class="text-white bg-indigo-500 px-4 py-2 hover:underline">
          &lt; Prev
        </button>
      </NuxtLink>
      <NuxtLink v-if="mangaData.nextPage" :to="`/manga/new/page/${mangaData.nextPage}`">
        <button class="text-white bg-indigo-500 px-4 py-2 hover:underline">
          Next &gt;
        </button>
      </NuxtLink>
    </div>
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
import { makeItjetPack } from "~/utils/jetpack";


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
