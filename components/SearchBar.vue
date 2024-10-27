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

            <Sheet v-model:open="dialogOpen" class="dark">
                <SheetTrigger as-child></SheetTrigger>
                <SheetContent side="bottom" class="bg-gray-800">
                    <SheetHeader>
                        <SheetTitle class="text-white">Inikah yang anda cari ? </SheetTitle>
                        <SheetDescription class="text-white">

                            <div v-if="searchResults.length > 0" v-for="item in searchResults">
                                <NuxtLink :to="`/manga/${item.slug}`" @click="dialogOpen = false">
                                    <div class="flex justify-start items-center p-4 hover:bg-gray-700">
                                        <NuxtImg alt="Manga Cover" :src="makeItjetPack(item.poster, 50)"></NuxtImg>
                                        <div class="ml-4">
                                            <Label class="text-white text-left">
                                                {{ item.title }} ({{ item.type }})
                                            </Label>
                                        </div>
                                    </div>


                                </NuxtLink>
                            </div>


                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
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
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
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
