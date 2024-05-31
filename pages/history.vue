<template>
    <div class="container mx-auto w-2/3 p-6">
      {{ groupedHistories }}
    </div>
  </template>
  

<script setup>
import { useHistoryStore } from "~/store/historyStore";
import { computed } from "vue";

const historyStore = useHistoryStore();

// Mengambil riwayat yang dikelompokkan berdasarkan tanggal dari toko riwayat
const groupedHistories = computed(() => historyStore.histories);

// Fungsi untuk memformat tanggal (YYYY-MM-DD menjadi format yang lebih mudah dibaca)
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};
</script>

<style>
/* Tambahkan gaya CSS khusus jika diperlukan */
</style>
