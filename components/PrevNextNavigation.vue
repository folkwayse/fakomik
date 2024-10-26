<template>
  <div class="container mx-auto p-4 lg:w-2/3">

    <div class="flex items-center justify-between gap-3">
      <NuxtLink v-if="chapterData && chapterData.prev" :to="`/chapters/${chapterData.prev.slug}`"
        class="bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2">
        <Icon name="mdi:chevron-left" class="h-6 w-6" />
        <span>Sebelumnya</span>
      </NuxtLink>
      <span v-else class="text-gray-500">Chapter Awal</span>

      <NuxtLink v-if="chapterData && chapterData.next" :to="`/chapters/${chapterData.next.slug}`"
        class="bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2">
        <span>Selanjutnya</span>
        <Icon name="mdi:chevron-right" class="h-6 w-6" />
      </NuxtLink>
      <span v-else class="text-gray-500">Chapter Akhir</span>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const config = useRuntimeConfig();
const { params } = useRoute();
const slug = ref(params.slug);
const { data: chapterData } = useAsyncData('prevnext', async () => {
  const response = await fetch(`${config.public.baseURL}chapters/getprevnext/${slug.value}`);
  return await response.json();
});
</script>