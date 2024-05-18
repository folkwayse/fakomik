<template>
  <section class="container mx-auto p-4 lg:w-2/3 w-full">
    <Carousel :value="genres" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
      <template #item="slotProps">
        <div class="border border-gray-300 rounded m-2 p-3">
          <div class="mb-3">
            <div class="relative mx-auto">
              <img :src="slotProps.data.poster" :alt="slotProps.data.name" class="w-full rounded" />
              <span class="absolute left-5 top-5 bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">{{ slotProps.data.status }}</span>
            </div>
          </div>
          <div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
          <div class="text-sm text-gray-600">{{ slotProps.data.type }}</div>
        </div>
      </template>
    </Carousel>
  </section>
</template>
<script setup>
import { ref } from 'vue';
import { useGenreStore } from '~/store/genreStore';

const genreStore = useGenreStore();
await genreStore.fetchAllGenres();
const genres = genreStore.genres;

const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 2,
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1,
  },
]);

const getSeverity = (status) => {
  switch (status) {
    case 'Available':
      return 'success';
    case 'Low Stock':
      return 'warning';
    case 'Out of Stock':
      return 'danger';
    default:
      return null;
  }
};
</script>
