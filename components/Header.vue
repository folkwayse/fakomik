<template>
  <header class="bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="text-xl font-bold">Fakomik</NuxtLink>
        </div>
        <div class="hidden md:flex md:items-center md:space-x-4">
          <NuxtLink
            v-for="item in items"
            :key="item.link"
            :to="item.link"
            @click="closeMenu"
            class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
        <div class="-mr-2 flex md:hidden">
          <button @click="isOpen = !isOpen" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
            <span class="sr-only">Open main menu</span>
            <svg :class="{ 'hidden': isOpen, 'block': !isOpen }" class="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg :class="{ 'hidden': !isOpen, 'block': isOpen }" class="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div :class="{ 'block': isOpen, 'hidden': !isOpen }" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NuxtLink
          v-for="item in items"
          :key="item.link"
          :to="item.link"
          @click="closeMenu"
          class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { label: 'Home', link: '/' },
  { label: 'Genres', link: '/genres' },
  { label: 'History', link: '/history' },
  { label: 'Account', link: '/account' },
])

const isOpen = ref(false)

const closeMenu = () => {
  isOpen.value = false;
}
</script>

<style scoped>
/* Optional: Add any additional styling if needed */
</style>
