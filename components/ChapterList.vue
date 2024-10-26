<template>
  <AlertDialog>
    <AlertDialogTrigger as as-child>
      <Button :class="{ 'opacity-50': !open }" @click="fetchChapters">
        <Icon name="mdi:menu" class="h-6 w-6" /> Chapters
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent class="bg-black p-4 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <div class="flex items-center justify-between">
        <AlertDialogTitle class="text-lg font-semibold text-white">Chapters list:</AlertDialogTitle>
        <AlertDialogTrigger><Icon name="mdi:close" class="h-6 w-6 cursor-pointer text-white" @click="open = false" /></AlertDialogTrigger>
      </div>
      <input v-model="searchQuery" type="text" placeholder="Search chapters..."
        class="mb-4 p-2 bg-gray-800 border-gray-700 rounded w-full text-gray-300" />
      <ul class="list-disc max-h-96 overflow-auto">
        <NuxtLink v-for="chapter in filteredChapters" :key="chapter.slug" :to="`/chapters/${chapter.slug}`">
          <li class="text-gray-200 p-2">Chapter {{ chapter.chapter_number }}</li>
        </NuxtLink>
      </ul>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup>
import { ref, computed } from 'vue';

// Props
const props = defineProps({
  chapterslug: {
    type: String,
    required: true
  }
});

// Reactive references
const chapters = ref([]);
const searchQuery = ref('');

// Computed property for filtered chapters
const filteredChapters = computed(() => {
  return chapters.value.filter(chapter =>
    chapter.chapter_number.toString().includes(searchQuery.value)
  );
});

// Load chapters data when button is clicked
const config = useRuntimeConfig();
const fetchChapters = async () => {
  if (chapters.value.length === 0) { // fetch only if not already fetched
    try {
      const res = await fetch(`${config.public.baseURL}chapters/chapterlist/${props.chapterslug}`);
      const data = await res.json();
      chapters.value = data;
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>

