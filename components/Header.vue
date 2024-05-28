<template>
  <header class="bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Left part: Logo -->
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="text-xl font-bold">Fakomik</NuxtLink>
        </div>

        <!-- Middle part: Search bar -->
        <div class="flex-1 flex justify-center items-center px-2 lg:ml-6 lg:justify-center">
          <div class="max-w-lg w-full lg:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1117.65 17.65z"/>
                </svg>
              </div>
              <input id="search" v-model="searchQuery" v-on:keyup.enter="updateQuery" class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-600 focus:border-gray-500 focus:ring-gray-500 focus:text-white sm:text-sm" placeholder="Search" type="search">
            </div>
          </div>
        </div>

        <!-- Right part: Navigation links and menu button -->
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

    <!-- Display Search Results -->
    
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'


const items = ref([
  { label: 'Home', link: '/' },
  { label: 'Genres', link: '/genres' },
  { label: 'History', link: '/history' },
  { label: 'Account', link: '/account' },
])

const isOpen = ref(false)
const searchQuery = ref('')
const router = useRouter()
const route = useRoute()

watch(route, () => {
  searchQuery.value = route.params.query || ''
})

const closeMenu = () => {
  isOpen.value = false
}

const updateQuery = () => {
  if (searchQuery.value.trim() === '') {
    router.push({ path: '/' })
  } else {
    const querySlug = encodeURIComponent(searchQuery.value.trim())
    router.push({ path: `/search/${querySlug}` })
  }
}
</script>

<style scoped>
/* Optional: Add any additional styling if needed */
</style>
