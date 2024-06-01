<template>
  <footer class="bg-gray-900 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-xl font-bold">Fakomik</h1>
          <p>&copy; {{ new Date().getFullYear() }} Fakomik. All rights reserved.</p>
        </div>
        <div class="flex space-x-4">
          <a href="#" class="hover:text-indigo-400">Dmca</a>
          <a href="#" class="hover:text-indigo-400">Privacy Policy</a>
          <a href="#" class="hover:text-indigo-400">Ads</a>
          <a href="#" class="hover:text-indigo-400">Contact Us</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>
