<template>
  <div>
    <section class="lg:w-2/3 sm:w-full mx-auto py-8">
      <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-4 p-4">
        <div v-for="(item, index) in mangas" :key="index">
          <NuxtLink
            class="bg-gray-800 p-2 rounded-lg text-center"
            :to="`/manga/${item.slug}`"
          >
            <NuxtImg
              v-if="item.poster"
              :src="makeItjetPack(item.poster)"
              :alt="item.title"
              class="w-full h-48 object-cover rounded-lg mb-2"
            />
            <div
              v-else
              class="w-full bg-gray-700 rounded-lg mb-2 flex items-center justify-center"
            >
              <i class="fas fa-image text-gray-500"></i>
            </div>
            <div
              class="text-white text-left text-s overflow-hidden overflow-ellipsis line-clamp-2"
            >
              {{ item.title }}
            </div>
          </NuxtLink>
           <div
          class="text-gray-400 text-left"
          v-for="(item, index) in item.chapter"
        >
          <NuxtLink :to="`/chapters/${item.slug}`">
            Ch. {{ item.chapter_number }} 
          </NuxtLink>
        </div>
        </div>

       
      </div>
    </section>
    <div class="flex justify-center m-3 p-2">
      <NuxtLink
        v-if="mangaData.prevPage"
        :to="`/manga/new/page/${mangaData.prevPage}`"
      >
        <button class="text-white bg-indigo-500 px-4 py-2 hover:underline">
          &lt; Prev
        </button>
      </NuxtLink>
      <NuxtLink
        v-if="mangaData.nextPage"
        :to="`/manga/new/page/${mangaData.nextPage}`"
      >
        <button class="text-white bg-indigo-500 px-4 py-2 hover:underline">
          Next &gt;
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { formatDistanceToNow } from "date-fns";
const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
});

const mangas = ref([]);
const formattedTime = (time) => {
  return formatDistanceToNow(time, { addSuffix: true });
};
// const { data: mangaData, error } = await useFetch("/api/manga/newmanga");
const config = useRuntimeConfig();
console.log(config.public.baseURL);
const { data: mangaData } = await useFetch(
  `${config.public.baseURL}mangas/newmanga?page=${parseInt(props.page)}`
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
