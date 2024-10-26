<template>
  <div>
    <Breadcumbs :title="manga.title" :slug="`manga/${manga.slug}`" />
    <section class="container mx-auto p-4 lg:w-2/3">
      <div class="bg-gray-800 text-white rounded-lg shadow-lg p-6">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/3 mb-4 md:mb-0">
            <figure>
              <img class="w-full h-auto m-auto object-cover rounded-lg" alt="The Demon Prince goes to the Academy"
                :src="manga.poster" />
            </figure>
            <div class="mt-4 text-center">
              <button class="bg-purple-600 text-white px-4 py-2 rounded mb-2 w-full" @click="toggleBookmark">
                {{ isBookmarked ? "Remove Bookmark" : "Bookmark" }}
              </button>

              <div class="flex justify-center items-center m-2">

                <Rating :rating="manga.rating" />
              </div>
              <NuxtLink v-if="lasread" :to="`/chapters/${lasread}`">
                <button class="bg-purple-600 text-white px-4 py-2 rounded mb-2 w-full">
                  Lanjut Baca
                </button>
              </NuxtLink>
            </div>
          </div>
          <div class="md:w-2/3 md:pl-6">
            <h1 class="text-2xl font-bold">
              {{ manga.title }}
            </h1>
            <h2 class="text-lg italic mb-4">{{ manga.serialization }}</h2>
            <p class="text-sm mb-4">
              {{ manga.description }}
            </p>
            <div class="justify-center items-center flex flex-wrap mb-4">
              <NuxtLink v-if="manga.chapter.length > 0"
                :to="`/chapters/${manga.chapter[manga.chapter.length - 1]?.slug || '#'}`">
                <span class="bg-gray-700 text-white px-4 py-2 rounded m-1">
                  Chapter
                  {{
                    manga.chapter[manga.chapter.length - 1].chapter_number
                  }}</span>
              </NuxtLink>
              <NuxtLink v-if="manga.chapter.length > 0" :to="`/chapters/${manga.chapter[0].slug}`">
                <span class="bg-gray-700 text-white px-4 py-2 rounded m-1">Chapter {{ manga.chapter[0]?.chapter_number
                  || "#" }}</span>
              </NuxtLink>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <div><strong>Status:</strong> {{ manga.status }}</div>
                <div><strong>Released:</strong> {{ manga.release_year }}</div>
                <div>
                  <strong>Posted On:</strong> {{ formatDate(manga.createdAt) }}
                </div>
              </div>
              <div>
                <div><strong>Type:</strong> {{ manga.type }}</div>
                <div><strong>Author:</strong> {{ manga.author }}</div>

                <div>
                  <strong>Updated On:</strong> {{ formatDate(manga.updatedAt) }}
                </div>
                <div><strong>Views:</strong>{{ manga.views }}</div>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex flex-wrap gap-2">
                <NuxtLink v-for="genre in manga.genre" :key="genre.slug" :to="`/genres/${genre.slug}`">
                  <span class="bg-gray-700 text-white px-4 py-1 rounded">{{
                    genre.name
                  }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="container mx-auto p-4 lg:w-2/3">
      Daftar Chapters :
      <ul class="list-disc max-h-96 overflow-auto">
        <NuxtLink v-if="manga.chapter.length > 0" v-for="i in manga.chapter" :key="i.slug" :to="`/chapters/${i.slug}`">
          <li class="text-gray-200 p-2">Chapter {{ i.chapter_number }}</li>
        </NuxtLink>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { useHistoryStore } from "~/store/historyStore";
import { useBookmarkStore } from "~/store/bookmarkStore";
import Rating from "~/components/Rating.vue";
const lasread = ref(null);

import Breadcumbs from "~/components/Breadcumbs.vue";
//get props slug
const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

import { formatDate } from "~/utils/date";

console.log(props.slug);
const { data: manga, error } = await useFetch(() => `/api/manga/${props.slug}`);
const historyStore = useHistoryStore();

lasread.value = historyStore.getLastReadHistory(manga.value.id)?.chapter_slug || null




const bookmarkStore = useBookmarkStore();
const isBookmarked = computed(() => bookmarkStore.isBookmarked(manga.value.id));

const toggleBookmark = () => {
  if (isBookmarked.value) {
    bookmarkStore.removeBookmark(manga.value.id);
  } else {
    bookmarkStore.addBookmark(manga.value.id);
  }
};
const config = useRuntimeConfig();

useJsonld(() => {
  if (manga.value) {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: manga.value.title,
      url: config.public.url + `manga/${manga.value.slug ?? ''}`,
    };
  }
});
</script>
