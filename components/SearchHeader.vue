<template>
   
      <div >
        <input
          v-model="searchTerm"
          @input="handleSearch"
          type="text"
          placeholder="Search..."
          class="px-4 py-2 mr-4 border text-black border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
        />
        <slot name="search" />
      </div>
  
      <!-- Dropdown List -->
      <div v-if="showDropdown" class="relative">
        <div class="absolute z-10 w-56 mt-2 origin-top-right text-black  bg-white border border-gray-200 rounded-md shadow-lg">
          <ul class="py-1">
            <li v-for="(item, index) in searchResults" :key="index" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">{{ item }}</li>
          </ul>
        </div>
      </div>
   
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const searchTerm = ref('');
  const searchResults = ref([]);
  const showDropdown = ref(false);
  
  const handleSearch = () => {
    // Simulate API call for search results
    // For example purposes, let's say the API returns a list of items matching the search term
    const mockApiResponse = ['Result 1', 'Result 2', 'Result 3']; // Example API response
  
    // Filter the mockApiResponse based on the searchTerm
    searchResults.value = mockApiResponse.filter(item => item.toLowerCase().includes(searchTerm.value.toLowerCase()));
  
    // Show dropdown only if there are search results
    showDropdown.value = searchResults.value.length > 0;
  };
  </script>
  
  <style>
  /* Custom styles can be added here */
  </style>
  