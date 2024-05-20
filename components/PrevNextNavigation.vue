<template>
  <div class="container mx-auto p-4 lg:w-2/3">
    <Panel>
     
      <template #footer>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            
            <NuxtLink
              v-if="chapterData && chapterData.prev"
              :to="`/chapters/${chapterData.prev.slug}`"
              class=" bg-indigo-700 text-white px-4 py-2 rounded"
            >
              <span class="">< Prev</span>
            </NuxtLink>
            <span v-else class="ml-3">Chapter Awal</span>
          </div>
          <div class="flex items-center gap-2">
            <NuxtLink
              v-if="chapterData && chapterData.next"
              :to="`/chapters/${chapterData.next.slug}`"
              class=" bg-indigo-700 text-white px-4 py-2 rounded"
            >
              <span class="">Next ></span>
            </NuxtLink>
            <span v-else class="ml-3">Chapter Akhir</span>
          </div>
        </div>
      </template>
    </Panel>
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