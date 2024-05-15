<template>
  <section class="container mx-auto p-4 lg:w-2/3">
    <h2>
      Mungkin kamu juga suka.
    </h2>
    <div class="flex overflow-x-scroll p-2 space-x-4">
      <article
        v-for="i in 18"
        :key="i"
        class="flex-shrink-0 w-48 sm:w-1/3 md:w-1/4 lg:w-1/6 m-2 p-2 rounded overflow-hidden bg-gray-800 text-white"
      >
        <header class="w-full mx-auto mb-2">
          <img
            class="w-full h-48 object-contain"
            alt="Manga Cover"
            src="https://cdn.myanimelist.net/images/anime/1758/141268.jpg"
          />
        </header>
        <h3 class="text-sm font-bold p-2 truncate overflow-ellipsis">
          Kono Subarashii Sekai ni Shukufuku wo! 3
        </h3>
        <span class="text-xs font-bold px-2 block"> Chapter 20 </span>
        <div class="flex items-center px-2 py-1">
          <Rating
            v-model="value"
            readonly
            :cancel="false"
            class="text-yellow-500"
          />
          <span class="ml-2 text-xs">8.55</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Rating from "primevue/rating"; // Pastikan Anda telah menginstal primevue

const value = ref(3);
</script>
