<template>
    <!-- Middle part: Search bar -->
    <div class="flex-1 flex justify-center items-center px-2 lg:ml-6 lg:justify-center">
        <div class="max-w-lg w-full lg:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="mdi:magnify" class="h-5 w-5 text-gray-400" />
                </div>
                <Input id="search" v-model:model-value="searchQuery"
                    class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-600 focus:border-gray-500 focus:ring-gray-500 focus:text-white sm:text-sm"
                    placeholder="Cari Manga" type="search" @input="debounceSearch" />
            </div>


        </div>
    </div>
</template>
<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue'
interface SearchResult {
    slug: string;
    poster: string;
    title: string;
    type: string;
}
const config = useRuntimeConfig()
const searchQuery = ref('')
const searchResults = ref<SearchResult[]>([])
const dialogOpen = ref(false)


const debounceSearch = useDebounceFn(async () => {
    if (!searchQuery.value.trim()) {
        searchResults.value = []
        return
    }
    const results = await $fetch(`${config.public.baseURL}mangas/searchbyname`, {
        method: 'POST',
        body: {
            s: searchQuery.value,
        },
    })
    console.log('search result:', results)
    searchResults.value = results as SearchResult[] || []

    dialogOpen.value = searchResults.value.length > 0

    if (searchResults.value.length === 0) {
        searchResults.value = []
    }
}, 500)
</script>
