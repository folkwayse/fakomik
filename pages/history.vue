<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-indigo-200">Reading History</h1>
    <ul v-if="histories.length === 0" class="text-center text-gray-500">
      No history found.
    </ul>
    <ul v-else>
      <li
        v-for="history in sortedHistories"
        :key="history.timestamp"
        class="bg-indigo-700 text-indigo-200 shadow-md rounded-lg p-4 mb-4"
      >
       <NuxtLink :to="`/chapters/${history.chapter_slug}`">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-xl font-semibold">{{ history.manga_title }} Chapter {{  history.manga_chapter }}</h2>
          <span class="text-gray-300">{{ formatDistanceToNow(history.timestamp, { addSuffix: true }) }}</span>
        </div>
       </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useHistoryStore } from "~/store/historyStore";
import { formatDistanceToNow } from "date-fns";
const formattedTime = (time) => {
  return formatDistanceToNow(time, { addSuffix: true });
};

const historyStore = useHistoryStore()
const histories = historyStore.histories
const sortedHistories = computed(() => {
  return histories.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
})
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
