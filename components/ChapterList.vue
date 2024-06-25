<template>
  <section class="container mx-auto p-4 lg:w-2/3">
    Daftar Chapters list:
    <ul class="list-disc max-h-96 overflow-auto">
      <NuxtLink
        v-for="chapter in chapters"
        :key="chapter.slug"
        :to="`/chapters/${chapter.slug}`"
      >
        <li class="text-gray-200 p-2">Chapter {{ chapter.chapter_number }}</li>
      </NuxtLink>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRuntimeConfig } from '#imports';

// Props
const props = defineProps({
  chapterslug: {
    type: String,
    required: true
  }
});

// Reactive reference to hold chapters data
const chapters = ref([]);

// Fetch chapters data lazily
const config = useRuntimeConfig();
const fetchChapters = async () => {
  try {
    // wati for 10 seconds
    // await new Promise(resolve => setTimeout(resolve, 5000));
    const res = await fetch(`${config.public.baseURL}chapters/chapterlist/${props.chapterslug}`);
    const data = await res.json();
    // alert('dd')
    chapters.value = data;
  } catch (error) {
    console.error('Error fetching chapters:', error);
  }
};

// Fetch data when component is mounted
onMounted(() => {
  fetchChapters();
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
