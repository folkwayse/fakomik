<script setup>
import HeaderComponent from "~/components/Header.vue";
import FooterComponent from "~/components/Footer.vue";

// useHead({
//   meta: [{ name: "monetag", content: "455f676e09ad0ed36c2857340e16c7f5" }],
// });
</script>

<template>
  <NuxtLoadingIndicator />
  <!-- <NuxtRouteAnnouncer /> -->

  <div class="bg-gray-800 text-white min-h-screen font-sans">
    <nav class="mb-4">
      <HeaderComponent />
    </nav>
    <NuxtPage />
    <FooterComponent />
   
  </div>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: transform 0.5s ease-in-out; /* Durasi 0.5 detik, fungsi easing ease-in-out */
}

.page-enter-from {
  transform: translateX(-100px); /* Awalnya berada di luar layar */
}

.page-leave-to {
  transform: translateX(100px); /* Akhirnya berada di luar layar */
}

</style>
