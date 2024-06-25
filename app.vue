<script setup>
import HeaderComponent from "~/components/Header.vue";
import FooterComponent from "~/components/Footer.vue";

const closeBanner = () => {
  const banner = document.querySelector(".banner-img");
  banner.style.display = "none";
};

onMounted(() => {
  const banner = document.querySelector(".banner-img");
  banner.style.display = "block";
})
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
    <div class="fixed bottom-0 w-full flex justify-center ">
      <!-- Banner Image -->
      <div class="relative">
        <NuxtImg
        src="https://i.imgur.com/OFd09ha.jpeg"
        alt="Banner Image"
        class="banner-img text-center h-16 justify-center flex object-fill"
      />
        <!-- Tombol Close di Pojok Kiri Atas -->
        <button
          class="absolute top-0 left-0 mt-0 bg-white text-gray-600 rounded-full shadow-md focus:outline-none"
          @click="closeBanner"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
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
