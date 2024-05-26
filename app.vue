<script setup>
import HeaderComponent from "~/components/Header.vue";
</script>

<template>
  <div class="bg-gray-800 text-white min-h-screen">
    <nav class="mb-4">
      <HeaderComponent/>
    </nav>
    <NuxtPage />
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