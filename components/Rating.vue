<template>
    <div class="flex justify-center items-center m-2">
      <div class="flex items-center">
        <span 
          v-for="star in 5" 
          :key="star" 
          class="mx-1"
        >
          <svg
            v-if="star <= filledStars"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-yellow-500 fill-current"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927C9.211 2.372 9.789 2 10.401 2s1.19.372 1.352.927l1.548 4.772a1 1 0 00.95.69h5.037c.557 0 .791.715.362 1.05l-4.087 3.087a1 1 0 00-.36 1.11l1.548 4.772c.163.555-.14 1.15-.666 1.15a.993.993 0 01-.815-.442l-3.899-2.946a1 1 0 00-1.174 0L5.777 19.41a.993.993 0 01-.815.442c-.526 0-.829-.595-.666-1.15l1.548-4.772a1 1 0 00-.36-1.11L1.396 9.44c-.429-.335-.195-1.05.362-1.05h5.037a1 1 0 00.95-.69l1.548-4.772z"/>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-300 fill-current"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927C9.211 2.372 9.789 2 10.401 2s1.19.372 1.352.927l1.548 4.772a1 1 0 00.95.69h5.037c.557 0 .791.715.362 1.05l-4.087 3.087a1 1 0 00-.36 1.11l1.548 4.772c.163.555-.14 1.15-.666 1.15a.993.993 0 01-.815-.442l-3.899-2.946a1 1 0 00-1.174 0L5.777 19.41a.993.993 0 01-.815.442c-.526 0-.829-.595-.666-1.15l1.548-4.772a1 1 0 00-.36-1.11L1.396 9.44c-.429-.335-.195-1.05.362-1.05h5.037a1 1 0 00.95-.69l1.548-4.772z"/>
          </svg>
        </span>
      </div>
      <span class="m-2 text-xs">{{ rating }} / 100</span>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  // Props untuk menerima rating dari parent component
  const props = defineProps({
    rating: {
      type: Number,
      required: true
    }
  });
  
  // Menghitung jumlah bintang penuh berdasarkan rating
  const filledStars = computed(() => Math.floor((props.rating / 100) * 5));
  </script>
  
  <style scoped>
  /* Jika ingin menambahkan style custom, tambahkan di sini */
  </style>
  