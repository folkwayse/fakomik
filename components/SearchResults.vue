<template>
<div>
  <div v-if="results.length" class="mt-2 w-2/3 mx-auto bg-gray-800 shadow-lg rounded-md">
    <h2>Search Results for "{{ cleanSlug(route.params.slug) }}"</h2>
    <div class="py-2">
      <NuxtLink
        v-for="result in results"
        :key="result.slug"
        :to="`/manga/${result.slug}`"
        class="flex items-center p-2 text-gray-300 hover:bg-gray-700 transition-colors duration-200"
      >
        <img :src="result.poster" alt="Poster" class=" w-28 rounded mr-4 object-cover"/>
        <div>
          <h3 class="text-sm font-semibold">{{ result.title }}</h3>
          <p class="text-xs text-gray-400">{{ result.last_chapters }}</p>
          <p class="text-xs text-yellow-400">Rating: {{ result.rating }}</p>
          <p class="text-xs text-red-400">Type: {{ result.type }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
  
  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <p>No results found.</p>
  </div>
</div>
</template>

<script setup>
const results = ref([]);

const route = useRoute();

const performSearch = async (query) => {
  // console.log(query)
  if (!query) {
    results.value = [];
    return;
  }

  const config = useRuntimeConfig();

  const {
    data: searchResults,
    pending,
    error,
  } = await useFetch(config.public.baseURL + "mangas/searchbyname", {
    method: "POST",
    body: {
      s: query,
    },
  });
  // console.log(searchResults.value)
  results.value = searchResults.value;
  return searchResults;
  // Mock search results
};

// bersihkan slug dari non alfanumerik
const cleanSlug = (slug) => {
  return slug.replace(/[^a-zA-Z0-9]/g, " ");
}

performSearch(cleanSlug(route.params.slug));

</script>

<style scoped>
/* Optional: Add any additional styling if needed */
</style>
