<template>
  <div
    v-if="visible"
    class="fixed top-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg max-w-xs"
  >
    <p class="text-sm">
      Dukung operasional fakomik.cloud dengan donasi untuk membantu menutupi
      biaya server Rp 800.000/bulan. Daripada kami memasang PopUp iklan 😢,
      karena mengganggu
      <a
        href="https://trakteer.id/fakomik_fakomik"
        target="_blank"
        class="mt-2 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full inline-block text-center shadow-md transition transform hover:scale-105"
      >
        Donasi di sini
      </a>
    </p>
    <button @click="hideNotification" class="mt-1 text-xs underline">
      Close
    </button>
  </div>
</template>
<script>
const visible = ref(true);

const hideNotification = () => {
  visible.value = false;
};
</script>
