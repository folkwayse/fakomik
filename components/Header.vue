<template>
  <header class="bg-gray-800 text-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Left part: Logo -->
        <div class="hidden md:flex flex-shrink-0  items-center">
          <NuxtLink to="/" class="text-xl font-bold">{{ config.public.siteName }}</NuxtLink>
        </div>

        <!-- Middle part: Search bar -->
        <!-- <div class="flex-1 flex justify-center items-center px-2 lg:ml-6 lg:justify-center">
          <div class="max-w-lg w-full lg:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="mdi:magnify" class="h-5 w-5 text-gray-400" />
              </div>
              <input id="search" v-model="searchQuery" v-on:keyup.enter="updateQuery"
                class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-600 focus:border-gray-500 focus:ring-gray-500 focus:text-white sm:text-sm"
                placeholder="Cari Manga" type="search">
            </div>
          </div>
        </div> -->

        <SearchBar></SearchBar>
        <!-- Right part: Navigation links and menu button -->
        <div class="hidden md:flex md:items-center md:space-x-4">
          <NuxtLink v-for="item in items" :key="item.link" :to="item.link" @click="closeMenu"
            class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
            {{ item.label }}
          </NuxtLink>
        </div>

        <Sheet>
          <SheetTrigger as-child>
            <Icon name="mdi:menu" class="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div class="grid gap-4 py-4">
              <NuxtLink v-for="item in items" :key="item.link" :to="item.link" @click="closeMenu"
                class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                {{ item.label }}
              </NuxtLink>
            </div>

          </SheetContent>
        </Sheet>

      </div>
    </div>

    <div :class="{ 'block': isOpen, 'hidden': !isOpen }" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">

      </div>
    </div>

    <!-- Display Search Results -->

  </header>
</template>

<script setup>
const config = useRuntimeConfig();
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'


const items = ref([

  { label: 'Manga', link: '/manga' },
  { label: 'Genres', link: '/genres' },
  { label: 'History', link: '/history' },
  { label: 'Bookmark', link: '/bookmark' },
  { label: 'Donasi', link: '/donasi' },

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
