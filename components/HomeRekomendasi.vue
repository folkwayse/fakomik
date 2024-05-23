<template>
    <section class=" lg:w-2/3 sm:w-full mx-auto py-8">
      <header class=" px-20 mb-4 mx-4">
        <h2 class="text-2xl font-bold">Rekomendasi</h2>
        <div class="flex flex-wrap space-x-2 mt-2">
          <button class="bg-purple-600 text-white px-4 py-2 rounded mb-2">
            Adaptation
          </button>
          <button class="bg-gray-800 text-white px-4 py-2 rounded mb-2">
            Romantis
          </button>
          <button class="bg-gray-800 text-white px-4 py-2 rounded mb-2">
            Sexual Violence
          </button>
          <button class="bg-gray-800 text-white px-4 py-2 rounded mb-2">
            Supernatural
          </button>
          <button class="bg-gray-800 text-white px-4 py-2 rounded mb-2">
            Yuri
          </button>
        </div>
      </header>
      <div class="flex flex-wrap justify-center mx-4">
        <article
          v-for="i in 18"
          :key="i"
          class="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6 m-2 p-2 rounded overflow-hidden bg-gray-800 text-white"
        >
          <header class="w-full mx-auto mb-2">
            <img
              class="w-full h-48 object-cover"
              alt="Manga Cover"
              src="https://cdn.myanimelist.net/images/anime/1758/141268.jpg"
            />
          </header>
          <h3 class="text-sm font-bold p-2 truncate overflow-ellipsis">
            Kono Subarashii Sekai ni Shukufuku wo! 3
          </h3>
          <span class="text-xs font-bold px-2 block"> Chapter 20 </span>
          <div class="flex items-center px-2 py-1">
           
            <span class="ml-2 text-xs">8.55</span>
          </div>
        </article>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from "vue";

  const value = ref(3);
  </script>
  