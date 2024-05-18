<template>
  <section class="container mx-auto p-4 lg:w-2/3 w-full">
    <div class="flex overflow-x-auto space-x-4">
      <Chip
        class="flex-shrink-0"
        v-for="genre in genres"
        :key="genre.id"
        :label="genre.name"
      />
    </div>
  </section>
</template>

<script setup>
import { useGenreStore } from "~/store/genreStore";

const genreStore = useGenreStore();
await genreStore.fetchAllGenres();
const genres = genreStore.genres;
</script>
