<template>
    <div class="container mx-auto w-2/3 p-6">
      <h1 class="text-2xl font-bold mb-4">History</h1>
      <p class="text-gray-400 mb-4 text-xs">Riwayat hanya tersedia di device ini saja.</p>
      <div v-for="(historiesByDate, date) in groupedHistories" :key="date">
        <h2 class="text-xl font-semibold my-4">{{ formatDate(date) }}</h2>
        <ul class="ml-4">
          <li
            v-for="history in historiesByDate"
            :key="history.url"
            class="text-blue-500 hover:underline cursor-pointer mb-2"
          >
            <NuxtLink :to="`/chapters/${history.url}`">{{ history.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </template>
  

<script setup>
import { useHistoryStore } from "~/store/historyStore";
import { computed } from "vue";

const historyStore = useHistoryStore();

// Mengambil riwayat yang dikelompokkan berdasarkan tanggal dari toko riwayat
const groupedHistories = computed(() => historyStore.getHistoriesByDate);

// Fungsi untuk memformat tanggal (YYYY-MM-DD menjadi format yang lebih mudah dibaca)
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};
</script>

<style>
/* Tambahkan gaya CSS khusus jika diperlukan */
</style>
