<script setup>
import HeaderComponent from "~/components/Header.vue";
import FooterComponent from "~/components/Footer.vue";


useHead({
  meta: [
    { name: 'monetag', content: '455f676e09ad0ed36c2857340e16c7f5' }
  ]
})
</script>

<template>
  <div class="bg-gray-800 text-white min-h-screen">
    <nav class="mb-4">
      <HeaderComponent />
    </nav>
    <NuxtPage />
    <FooterComponent/>
   
  </div>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
