<template>
  <div>
    <Breadcumbs 
   
    :title="manga.title"
    />
    <section class="container mx-auto p-4 lg:w-2/3">
      <div class="bg-gray-800 text-white rounded-lg shadow-lg p-6">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/3 mb-4 md:mb-0">
            <figure>
              <img
                class="w-1/2 h-auto m-auto object-cover rounded-lg"
                alt="The Demon Prince goes to the Academy"
                :src="makeItjetPack(manga.poster)"
              />
            </figure>
            <div class="mt-4 text-center">
              <button
                class="bg-purple-600 text-white px-4 py-2 rounded mb-2 w-full"
              >
                Bookmark
              </button>
              <div class="text-sm">Followed by 4636 people</div>
              <div class="flex justify-center items-center mt-2">
                <Rating
                  v-model="value"
                  readonly
                  :cancel="false"
                  class="text-yellow-500"
                />
                <span class="ml-2 text-xs">7.00</span>
              </div>
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
            <div
              class="flex flex-col sm:flex-row items-center sm:justify-start mb-4"
            >
              <NuxtLink :to="`/chapters/${manga.chapter[manga.chapter.length - 1].slug}`">
                <span class="bg-gray-700 text-white px-4 py-2 rounded m-1"
                  >Mulai : Chapter
                  {{
                    manga.chapter[manga.chapter.length - 1].chapter_number
                  }}</span
                >
              </NuxtLink>
              <NuxtLink :to="`/chapters/${manga.chapter[0].slug}`">
              <span class="bg-gray-700 text-white px-4 py-2 rounded m-1"
                >Terbaru: Chapter {{ manga.chapter[0].chapter_number }}</span
              >
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
                <span
                  v-for="genre in manga.genre"
                  class="bg-gray-700 text-white px-4 py-1 rounded"
                  >{{ genre.name }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="container mx-auto p-4 lg:w-2/3">
      <Listbox
        :options="manga.chapter"
        filter
        listStyle="max-height:250px"
        optionLabel="name"
        class="w-full bg-gray-800"
      >
        <template #option="slotProps">
          <NuxtLink :to="`/chapters/${slotProps.option.slug}`">
            <div class="flex items-center">
              <span class="mr-2"
                >Chapter {{ slotProps.option.chapter_number }}</span
              >
            </div>
          </NuxtLink>
        </template>
      </Listbox>
    </section>
  </div>
</template>

<script setup>
import Breadcumbs from "~/components/Breadcumbs.vue"; 
//get props slug
const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

import Rating from "primevue/rating"; // Pastikan Anda telah menginstal primevue
import { makeItjetPack } from "~/utils/jetpack";
import { formatDate } from "~/utils/date";
const { data: manga, error } = await useFetch(() => `/api/manga/${props.slug}`);
</script>
