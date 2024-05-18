<template>
  <section class="lg:w-2/3 sm:w-full mx-auto py-8">
    <header class="mb-4 mx-4">
      <h2 class="text-2xl font-bold">Rekomendasi</h2>
    </header>
    <div class="flex flex-wrap justify-center mx-4">
      <article
        v-for="i in manga.mangas"
        :key="i"
        class="w-1/3 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/6 bord p-2 rounded overflow-hidden bg-gray-800 text-white"
      >
        <header class="w-full mx-auto mb-2">
          <nuxt-link :to="`/manga/${i.slug}`">
            <img
              class="w-full h-48 object-cover"
              alt="Manga Cover"
              :src="`${makeItjetPack(i.poster)}`"
            />
          </nuxt-link>
        </header>

        <h3 class="text-sm font-bold p-2 truncate overflow-ellipsis">
          {{ i.title }}
        </h3>
        <span class="text-xs font-bold px-2 block">
          Chapter {{ i.last_chapter }}
        </span>
        <div class="flex items-center px-2 py-1">
          <Rating
            v-model="i.rating"
            readonly
            :cancel="false"
            class="text-yellow-500"
          />
          <span class="ml-2 text-xs">{{ i.rating }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Rating from "primevue/rating"; // Pastikan Anda telah menginstal primevue
import { makeItjetPack } from "~/utils/jetpack";
const mangas = ref([]);
const { data: manga, error } = await useFetch(() => `/api/manga/newmanga`);
</script>
