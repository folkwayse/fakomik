<script setup>
import HeaderComponent from "~/components/Header.vue";
</script>

<template>
  <div class="bg-gray-800 text-white min-h-screen">
    <nav class="mb-4">
      <HeaderComponent/>
    </nav>
    <NuxtPage />
    <a href="/" alt="" target="_blank" >
<img  src="//sstatic1.histats.com/0.gif?4870396&101" alt="" border="0">
    </a>
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