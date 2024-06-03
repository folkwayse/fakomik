<template>
  <div class="container mx-auto p-4 lg:w-2/3 w-full">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- Genre selection -->
      <div>
        <label>Genre:</label>
        <VueMultiselect
          v-model="searchStore.selectedGenres"
          tag-placeholder="Add this as new tag"
          placeholder="Type to search or add tag"
          label="name"
          track-by="name"
          :multiple="true"
          :options="genres"
        />
      </div>

      <!-- Type selection -->
      <div>
        <label>Type:</label>
        <VueMultiselect v-model="searchStore.selectedType" :options="optionsType" />
      </div>

      <!-- Status selection -->
      <div>
        <label>Order:</label>
        <VueMultiselect v-model="searchStore.selectedSortyBY" :options="optionsSortyBY" />
      </div>
    </div>

    <div class="justify-center m-2">
      <button
        @click="searchStore.advSearch"
        class="bg-purple-600 text-white px-4 py-2 rounded mb-2 w-full"
      >
        Filter
      </button>
    </div>

    <div class="py-2">
      <div v-if="searchStore.mangas.length === 0" class="text-center text-gray-500">
        No results found.
      </div>
      <div v-else>
        <NuxtLink
          v-for="result in searchStore.mangas"
          :key="result.slug"
          :to="`/manga/${result.slug}`"
          class="flex items-center p-2 text-gray-300 hover:bg-gray-700 transition-colors duration-200"
        >
          <img :src="result.poster" alt="Poster" class="w-28 rounded mr-4 object-cover"/>
          <div>
            <h3 class="text-sm font-semibold">{{ result.title }}</h3>
            <p class="text-xs text-gray-400">{{ result.last_chapters }}</p>
            <p class="text-xs text-yellow-400">Rating: {{ result.rating }}</p>
            <p class="text-xs text-red-400">Type: {{ result.type }}</p>
            <p class="text-xs text-green-400">Status: {{ result.status }}</p>
            <p class="text-xs text-blue-400">
              genres: <ul class="flex flex-wrap space-x-2 m-2">
                <li v-for="genre in result.genre" :key="genre" class="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs">{{ genre.name }}</li>
              </ul>
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSearchStore } from '~/store/searchStore';
import VueMultiselect from 'vue-multiselect';

const searchStore = useSearchStore();

const optionsType = ["Manga", "Manhwa", "Manhua"];
const optionsSortyBY = ["update", "release", "rating", "popularity"];

const genres = await searchStore.fetchGenres();
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
