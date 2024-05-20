<script lang="ts" setup>
const links = useBreadcrumbItems() // uses the current route
</script>

<template>
  <nav aria-label="Breadcrumbs" class="max-w-full p-4 rounded-md">
    <ul class=" bg-gray-800 flex flex-wrap items-center space-x-2 overflow-hidden">
      <li v-for="(item, key) in links" :key="key" class="flex items-center">
        <NuxtLink 
          v-bind="item" 
          class="text-blue-600 hover:text-blue-800 transition-colors truncate"
          style="max-width: 45px;" 
        >
          {{ item.label }}
        </NuxtLink>
        <span v-if="key < links.length - 1" class="mx-2 text-gray-500">></span>
      </li>
    </ul>
  </nav>
</template>
