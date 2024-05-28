<template>
  <div class="py-8 px-4">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div v-for="genre in genres" :key="genre.id" class="bg-gray-800 p-4 rounded shadow-lg hover:bg-gray-700 transition-colors duration-200">
        <NuxtLink :to="`/genre/${genre.slug}`" class="text-gray-300 hover:text-white">
          <h3 class="text-lg font-semibold">{{ genre.name }}</h3>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>




const { data:genres } = await useFetch('/api/genres');

</script>
